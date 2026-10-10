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

/**
 * Articles : ceux de Sanity s'il en contient (un même slug pour toutes les langues),
 * sinon les articles locaux (slugs traduits).
 */
function articlePagesFor(lang: Language, sanitySlugs: string[]): Page[] {
    if (sanitySlugs.length > 0) {
        return sanitySlugs.map((slug) => ({ path: `/actualites/${slug}`, priority: 0.5, changefreq: 'monthly' }));
    }
    const articles = { fr: articlesFr, en: articlesEn, de: articlesDe };
    return articles[lang].map((article) => ({
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

// JSON sûr à placer dans une balise <script>
const scriptJson = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

function injectIntoTemplate(template: string, appHtml: string, helmet: any, sanityData: Record<string, unknown>): string {
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
        .replace(
            '<div id="root"></div>',
            `<div id="root">${appHtml}</div>\n    <script>window.__SANITY_DATA__=${scriptJson(sanityData)}</script>`
        );
}

function buildSitemap(pagesFor: (lang: Language) => Page[]): string {
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
    const { render, getSanityArticleSlugs } = await import(pathToFileURL(ssrEntry).href);
    const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
    const resources = loadResources();

    let sanitySlugs: string[] = [];
    try {
        sanitySlugs = await getSanityArticleSlugs();
    } catch (error) {
        console.warn('[prerender] Articles Sanity indisponibles, articles locaux utilisés :', (error as Error).message);
    }
    const pagesFor = (lang: Language): Page[] => [...STATIC_PAGES, ...articlePagesFor(lang, sanitySlugs)];

    // Réponses Sanity partagées entre toutes les pages
    const sanityData: Record<string, unknown> = {};
    let count = 0;
    for (const lang of SUPPORTED_LANGUAGES) {
        for (const page of pagesFor(lang)) {
            const url = urlOf(lang, page.path);
            const { html, helmet, sanityData: pageData } = await render(url, lang, resources, sanityData);
            if (!helmet || !html) throw new Error(`Rendu vide pour ${url}`);

            const out = path.join(dist, `${url}.html`);
            fs.mkdirSync(path.dirname(out), { recursive: true });
            fs.writeFileSync(out, injectIntoTemplate(template, html, helmet, pageData));
            count++;
        }
    }

    // Page servie par Vercel (statut 404) pour toute URL inconnue : le navigateur affiche
    // la page « introuvable » dans la langue de l'URL ; Google ne l'indexe pas.
    fs.writeFileSync(
        path.join(dist, '404.html'),
        template
            .replace(/<title>[\s\S]*?<\/title>/, '<title>Page introuvable | Swiss Ecogestes</title>\n    <meta name="robots" content="noindex">')
    );

    fs.writeFileSync(path.join(dist, 'sitemap.xml'), buildSitemap(pagesFor));
    fs.writeFileSync(
        path.join(dist, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
    );
    fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });

    const fromSanity = Object.values(sanityData).filter((v) => v != null).length;
    console.log(`✓ Pré-rendu : ${count} pages (${fromSanity} contenus Sanity), sitemap.xml et robots.txt générés`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
