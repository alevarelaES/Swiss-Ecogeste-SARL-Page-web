import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SITE_URL, SUPPORTED_LANGUAGES, type Language, splitLanguage } from '../seo/site';

interface SEOProps {
    title: string;
    description: string;
    ogType?: string;
    ogImage?: string;
    /** Chemin (sans préfixe de langue) de cette page dans chaque langue, quand il diffère du chemin courant (ex. articles). */
    alternatePaths?: Partial<Record<Language, string>>;
    /** Données structurées schema.org à injecter en JSON-LD. */
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
    /** Nom de la page dans le fil d'Ariane (par défaut : le titre). */
    breadcrumbName?: string;
    /** Page à exclure de Google (ex. page 404). */
    noindex?: boolean;
}

// Au-delà, Google coupe le titre : on n'ajoute alors pas le nom du site
const MAX_TITLE_FOR_SUFFIX = 45;

const OG_LOCALES: Record<Language, string> = { fr: 'fr_CH', en: 'en_GB', de: 'de_CH' };

const absolute = (url: string) => (url.startsWith('/') ? `${SITE_URL}${url}` : url);

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    ogType = 'website',
    ogImage = '/Logo/Logo_EcoGeste_Avec_Fond.png',
    alternatePaths,
    jsonLd,
    breadcrumbName,
    noindex = false,
}) => {
    const { t } = useTranslation('common');
    const { pathname } = useLocation();
    const { lang, path } = splitLanguage(pathname);
    const fullTitle = /swiss ecogestes/i.test(title) || title.length > MAX_TITLE_FOR_SUFFIX
        ? title
        : `${title} | Swiss Ecogestes`;

    const urlFor = (l: Language) => {
        const p = alternatePaths?.[l] ?? path;
        return `${SITE_URL}/${l}${p === '/' ? '' : p}`;
    };
    const canonical = urlFor(lang);

    // Fil d'Ariane pour Google : Accueil > (Actualités >) Page
    const crumbs: { name: string; url: string }[] = [];
    if (path !== '/' && !noindex) {
        crumbs.push({ name: t('nav.home'), url: `${SITE_URL}/${lang}` });
        if (path.startsWith('/actualites/')) {
            crumbs.push({ name: t('nav.journal'), url: `${SITE_URL}/${lang}/actualites` });
        }
        crumbs.push({ name: breadcrumbName || title.split(' | ')[0], url: canonical });
    }
    const structuredData = [
        ...(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []),
        ...(crumbs.length
            ? [{
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
            }]
            : []),
    ];

    return (
        <Helmet>
            <html lang={lang} />
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {noindex && <meta name="robots" content="noindex" />}
            {!noindex && <link rel="canonical" href={canonical} />}
            {!noindex && SUPPORTED_LANGUAGES.map((l) => (
                <link key={l} rel="alternate" hrefLang={l} href={urlFor(l)} />
            ))}
            {!noindex && <link rel="alternate" hrefLang="x-default" href={urlFor('fr')} />}

            {/* Open Graph */}
            <meta property="og:site_name" content="Swiss Ecogestes" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={absolute(ogImage)} />
            <meta property="og:locale" content={OG_LOCALES[lang]} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={absolute(ogImage)} />

            {structuredData.map((data, i) => (
                <script key={i} type="application/ld+json">{JSON.stringify(data)}</script>
            ))}
        </Helmet>
    );
};

export default SEO;
