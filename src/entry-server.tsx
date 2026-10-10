// Point d'entrée du pré-rendu : génère le HTML d'une URL au moment du build (voir scripts/prerender.ts).
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import { createInstance, type Resource } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { AppShell } from './app/App';
import { SanityCacheProvider, type SanityCache } from './sanity/useSanityContent';
import { client } from './sanity/client';

export { SITE_URL } from './app/seo/site';

const MAX_PASSES = 4;

/**
 * Rend une URL. Chaque passe collecte les requêtes Sanity demandées par les composants ;
 * on les exécute puis on rend à nouveau, jusqu'à ce que tout le contenu soit disponible.
 * `data` est partagé entre les pages pour ne pas refaire les mêmes requêtes.
 */
export async function render(url: string, lang: string, resources: Resource, data: Record<string, unknown>) {
    const i18n = createInstance();
    await i18n.use(initReactI18next).init({
        lng: lang,
        fallbackLng: 'fr',
        supportedLngs: ['fr', 'en', 'de'],
        defaultNS: 'common',
        resources,
        interpolation: { escapeValue: false },
    });

    let html = '';
    let helmet: HelmetServerState | undefined;
    let used = new Set<string>();

    for (let pass = 0; pass < MAX_PASSES; pass++) {
        const cache: SanityCache = { data, pending: new Map(), used: new Set() };
        const helmetContext: { helmet?: HelmetServerState } = {};
        html = renderToString(
            <I18nextProvider i18n={i18n}>
                <SanityCacheProvider cache={cache}>
                    <HelmetProvider context={helmetContext}>
                        <StaticRouter location={url}>
                            <AppShell />
                        </StaticRouter>
                    </HelmetProvider>
                </SanityCacheProvider>
            </I18nextProvider>
        );
        helmet = helmetContext.helmet;
        used = cache.used!;
        if (cache.pending!.size === 0) break;

        await Promise.all(
            [...cache.pending!].map(async ([key, fetcher]) => {
                try {
                    data[key] = await fetcher();
                } catch (error) {
                    // Sanity injoignable : la page garde le contenu local pour cette section
                    console.warn(`[prerender] Sanity "${key}" indisponible :`, (error as Error).message);
                    data[key] = null;
                }
            })
        );
    }

    // Uniquement les réponses utilisées par cette page, pour l'hydratation dans le navigateur
    const pageData = Object.fromEntries([...used].filter((k) => data[k] != null).map((k) => [k, data[k]]));
    return { html, helmet, sanityData: pageData };
}

/** Slugs des articles publiés dans Sanity (un même slug pour toutes les langues). */
export async function getSanityArticleSlugs(): Promise<string[]> {
    return client.fetch(`*[_type == "article" && defined(slug.current)].slug.current`);
}
