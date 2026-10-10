// Point d'entrée du pré-rendu : génère le HTML d'une URL au moment du build (voir scripts/prerender.ts).
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import { createInstance, type Resource } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { AppShell } from './app/App';

export async function render(url: string, lang: string, resources: Resource) {
    const i18n = createInstance();
    await i18n.use(initReactI18next).init({
        lng: lang,
        fallbackLng: 'fr',
        supportedLngs: ['fr', 'en', 'de'],
        defaultNS: 'common',
        resources,
        interpolation: { escapeValue: false },
    });

    const helmetContext: { helmet?: HelmetServerState } = {};
    const html = renderToString(
        <I18nextProvider i18n={i18n}>
            <HelmetProvider context={helmetContext}>
                <StaticRouter location={url}>
                    <AppShell />
                </StaticRouter>
            </HelmetProvider>
        </I18nextProvider>
    );

    return { html, helmet: helmetContext.helmet };
}
