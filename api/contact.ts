// Fonction serverless Vercel : reçoit le formulaire de contact et l'envoie
// par email via le SMTP Infomaniak de la boîte du client.
//
// Variables d'environnement (à définir dans Vercel → Settings → Environment Variables) :
//   SMTP_USER   adresse complète de la boîte d'envoi (ex. info@swissecogestes.ch)  [obligatoire]
//   SMTP_PASS   mot de passe de cette boîte (ou mot de passe d'application)        [obligatoire]
//   SMTP_HOST   défaut : mail.infomaniak.com
//   SMTP_PORT   défaut : 465 (SSL). 587 = STARTTLS
//   CONTACT_TO  destinataire des demandes, défaut : SMTP_USER

import nodemailer from 'nodemailer';
import type { IncomingMessage, ServerResponse } from 'node:http';

type Req = IncomingMessage & { body?: unknown };
type Res = ServerResponse;

const REQUEST_TYPES = ['Villa', 'Entreprise', 'Gérance/Régie', 'Propriétaire', 'Collectivité', 'Autre'];
const MIN_FILL_TIME_MS = 3000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

// Limite simple par IP. Elle vit dans l'instance de la fonction, donc elle
// freine les rafales sans être une garantie absolue.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
    const now = Date.now();
    const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    recent.push(now);
    hits.set(ip, recent);
    return recent.length > RATE_LIMIT_MAX;
}

function send(res: Res, status: number, body: Record<string, unknown>) {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(body));
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function str(value: unknown, max: number): string {
    return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

async function readBody(req: Req): Promise<Record<string, unknown>> {
    if (req.body && typeof req.body === 'object') return req.body as Record<string, unknown>;
    if (typeof req.body === 'string') return JSON.parse(req.body);
    const chunks: Buffer[] = [];
    for await (const chunk of req) chunks.push(chunk as Buffer);
    const raw = Buffer.concat(chunks).toString('utf8');
    return raw ? JSON.parse(raw) : {};
}

export default async function handler(req: Req, res: Res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return send(res, 405, { ok: false, error: 'method_not_allowed' });
    }

    let body: Record<string, unknown>;
    try {
        body = await readBody(req);
    } catch {
        return send(res, 400, { ok: false, error: 'invalid_body' });
    }

    // Pièges à robots : champ caché rempli, ou formulaire envoyé trop vite.
    // On répond « ok » pour ne pas leur indiquer qu'ils sont détectés.
    const startedAt = Number(body.startedAt);
    if (str(body.website, 200) || !startedAt || Date.now() - startedAt < MIN_FILL_TIME_MS) {
        return send(res, 200, { ok: true });
    }

    const forwarded = String(req.headers['x-forwarded-for'] || '');
    const ip = forwarded.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
    if (rateLimited(ip)) {
        return send(res, 429, { ok: false, error: 'too_many_requests' });
    }

    const fullName = str(body.fullName, 100);
    const email = str(body.email, 200);
    const phone = str(body.phone, 30);
    const message = str(body.message, 2000);
    const requestType = REQUEST_TYPES.includes(str(body.requestType, 50)) ? str(body.requestType, 50) : 'Autre';
    const language = str(body.language, 5) || 'fr';

    if (fullName.length < 2 || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return send(res, 400, { ok: false, error: 'invalid_fields' });
    }

    const { SMTP_USER, SMTP_PASS } = process.env;
    if (!SMTP_USER || !SMTP_PASS) {
        console.error('[contact] SMTP_USER / SMTP_PASS manquants');
        return send(res, 500, { ok: false, error: 'not_configured' });
    }

    const port = Number(process.env.SMTP_PORT || 465);
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'mail.infomaniak.com',
        port,
        secure: port === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const rows: [string, string][] = [
        ['Type de demande', requestType],
        ['Nom', fullName],
        ['Email', email],
        ['Téléphone', phone || '—'],
        ['Langue du site', language.toUpperCase()],
    ];

    const text = [
        ...rows.map(([k, v]) => `${k} : ${v}`),
        '',
        'Message :',
        message,
    ].join('\n');

    const html = `
        <h2 style="font-family:sans-serif;color:#1b5e39">Nouvelle demande depuis le site</h2>
        <table style="font-family:sans-serif;border-collapse:collapse">
            ${rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;font-weight:bold">${k}</td><td>${escapeHtml(v)}</td></tr>`).join('')}
        </table>
        <p style="font-family:sans-serif;font-weight:bold;margin-top:16px">Message :</p>
        <p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(message)}</p>
    `;

    try {
        await transporter.sendMail({
            from: { name: 'Site Swiss Ecogestes', address: SMTP_USER },
            to: process.env.CONTACT_TO || SMTP_USER,
            replyTo: { name: fullName, address: email },
            subject: `[Site] ${requestType} – ${fullName}`,
            text,
            html,
        });
        return send(res, 200, { ok: true });
    } catch (error) {
        console.error('[contact] échec envoi SMTP', error);
        return send(res, 502, { ok: false, error: 'send_failed' });
    }
}
