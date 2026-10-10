import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
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
}

const OG_LOCALES: Record<Language, string> = { fr: 'fr_CH', en: 'en_GB', de: 'de_CH' };

const absolute = (url: string) => (url.startsWith('/') ? `${SITE_URL}${url}` : url);

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    ogType = 'website',
    ogImage = '/Logo/Logo_EcoGeste_Avec_Fond.png',
    alternatePaths,
    jsonLd,
}) => {
    const { pathname } = useLocation();
    const { lang, path } = splitLanguage(pathname);
    const fullTitle = /swiss ecogestes/i.test(title) ? title : `${title} | Swiss Ecogestes`;

    const urlFor = (l: Language) => {
        const p = alternatePaths?.[l] ?? path;
        return `${SITE_URL}/${l}${p === '/' ? '' : p}`;
    };
    const canonical = urlFor(lang);

    return (
        <Helmet>
            <html lang={lang} />
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />
            {SUPPORTED_LANGUAGES.map((l) => (
                <link key={l} rel="alternate" hrefLang={l} href={urlFor(l)} />
            ))}
            <link rel="alternate" hrefLang="x-default" href={urlFor('fr')} />

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

            {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
        </Helmet>
    );
};

export default SEO;
