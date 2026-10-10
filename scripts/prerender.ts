// Le rendu doit utiliser la version production de React
process.env.NODE_ENV = 'production';

/**
 * Pré-rendu SEO, lancé après `vite build` (voir le script "build" de package.json).
 *
 * Pour chaque page et chaque langue, génère un fichier HTML complet (titre, description,
 * balises hreflang, contenu de la page) afin que Google lise le contenu sans exécuter le
 * JavaScript. Génère aussi sitemap.xml et robots.txt.
 *
 *   dist/fr.html, dist/fr/contact.html, dist/en/services/villa.html, ...
 *
 * Vercel sert ces fichiers sans l'extension grâce à "cleanUrls" (vercel.json).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { STATIC_PAGES, SUPPORTED_LANGUAGES, SITE_URL, type Language } from '../src/app/seo/site';
import { articlesFr, articlesEn, articlesDe } from '../src/app/data/articles';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

type Page = { path: string; priority: number; changefreq: string; alternates?: Record<Language, string> };

function pagesFor(lang: Language): Page[] {
    const articles = { fr: articlesFr, en: articlesEn, de: articlesDe };
    const articlePages: Page[] = articles[lang].map((article) => ({
        path: `/actualites/${article.slug}`,
        priority: 0.5,
        changefreq: 'monthly',
        alternates: Object.fromEntries(
            SUPPORTED_LANGUAGES.map((l) => [
                l,
                `/actualites/${articles[l].find((a) => a.id === article.id)?.slug ?? article.slug}`,
            ])
        ) as Record<Language, string>,
    }));
    return [...STATIC_PAGES, ...articlePages];
}

const urlOf = (lang: Language, p: string) => `/${lang}${p === '/' ? '' : p}`;

function loadResources() {
    return Object.fromEntries(
        SUPPORTED_LANGUAGES.map((lang) => {
            const file = path.join(root, 'public', 'locales', lang, 'common.json');
            const json = JSON.parse(fs.readFileSync(file, 'utf8').replace(/^﻿/, ''));
            return [lang, { common: json }];
        })
    );
}

function injectIntoTemplate(template: string, appHtml: string, helmet: any): string {
    const head = [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
    ].join('\n    ');

    return template
        .replace(/<html[^>]*>/, `<html ${helmet.htmlAttributes.toString()}>`)
        .replace(/<title>[\s\S]*?<\/title>/, '')
        .replace('</head>', `    ${head}\n</head>`)
        .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

function buildSitemap(): string {
    const today = new Date().toISOString().slice(0, 10);
    const entries: string[] = [];
    for (const lang of SUPPORTED_LANGUAGES) {
        for (const page of pagesFor(lang)) {
            const alt = (l: Language) => `${SITE_URL}${urlOf(l, page.alternates?.[l] ?? page.path)}`;
            entries.push(
                [
                    '  <url>',
                    `    <loc>${alt(lang)}</loc>`,
                    ...SUPPORTED_LANGUAGES.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${alt(l)}"/>`),
                    `    <xhtml:link rel="alternate" hreflang="x-default" href="${alt('fr')}"/>`,
                    `    <lastmod>${today}</lastmod>`,
                    `    <changefreq>${page.changefreq}</changefreq>`,
                    `    <priority>${page.priority.toFixed(1)}</priority>`,
                    '  </url>',
                ].join('\n')
            );
        }
    }
    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
        ...entries,
        '</urlset>',
        '',
    ].join('\n');
}

async function main() {
    const { render } = await import(pathToFileURL(ssrEntry).href);
    const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
    const resources = loadResources();

    let count = 0;
    for (const lang of SUPPORTED_LANGUAGES) {
        for (const page of pagesFor(lang)) {
            const url = urlOf(lang, page.path);
            const { html, helmet } = await render(url, lang, resources);
            if (!helmet || !html) throw new Error(`Rendu vide pour ${url}`);

            const out = path.join(dist, `${url}.html`);
            fs.mkdirSync(path.dirname(out), { recursive: true });
            fs.writeFileSync(out, injectIntoTemplate(template, html, helmet));
            count++;
        }
    }

    fs.writeFileSync(path.join(dist, 'sitemap.xml'), buildSitemap());
    fs.writeFileSync(
        path.join(dist, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
    );
    fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });

    console.log(`✓ Pré-rendu : ${count} pages, sitemap.xml et robots.txt générés`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
