// Données SEO partagées entre le site et le script de pré-rendu (scripts/prerender.ts).

export const SITE_URL = (import.meta.env?.VITE_SITE_URL as string | undefined) || 'https://swissecogestes.ch';

export const SUPPORTED_LANGUAGES = ['fr', 'en', 'de'] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const isLanguage = (value: string | undefined): value is Language =>
    !!value && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);

/** Sépare "/en/services/villa" en { lang: 'en', path: '/services/villa' }. */
export function splitLanguage(pathname: string): { lang: Language; path: string } {
    const [, first, ...rest] = pathname.replace(/\/+$/, '').split('/');
    if (isLanguage(first)) {
        return { lang: first, path: rest.length ? `/${rest.join('/')}` : '/' };
    }
    return { lang: 'fr', path: pathname || '/' };
}

/** Pages statiques à pré-rendre et à lister dans le sitemap (chemins sans préfixe de langue). */
export const STATIC_PAGES: { path: string; priority: number; changefreq: string }[] = [
    { path: '/', priority: 1.0, changefreq: 'weekly' },
    { path: '/services/gerance', priority: 0.9, changefreq: 'monthly' },
    { path: '/services/entreprise', priority: 0.9, changefreq: 'monthly' },
    { path: '/services/villa', priority: 0.9, changefreq: 'monthly' },
    { path: '/services/communes', priority: 0.9, changefreq: 'monthly' },
    { path: '/a-propos', priority: 0.7, changefreq: 'monthly' },
    { path: '/contact', priority: 0.8, changefreq: 'yearly' },
    { path: '/actualites', priority: 0.6, changefreq: 'weekly' },
    { path: '/mentions-legales', priority: 0.2, changefreq: 'yearly' },
    { path: '/confidentialite', priority: 0.2, changefreq: 'yearly' },
    { path: '/cookies', priority: 0.2, changefreq: 'yearly' },
];

export const ORGANIZATION_JSON_LD = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: 'Swiss Ecogestes',
    legalName: 'Swiss Ecogestes Sàrl',
    url: SITE_URL,
    logo: `${SITE_URL}/Logo/Logo_EcoGeste_Avec_Fond.png`,
    image: `${SITE_URL}/Logo/Logo_EcoGeste_Avec_Fond.png`,
    description:
        "Audits énergétiques, calcul IDC, stratégie énergétique et accompagnement aux subventions pour régies, entreprises, propriétaires et collectivités en Suisse romande.",
    email: 'info@swissecogestes.ch',
    telephone: '+41786287738',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Route de Chavannes 207',
        postalCode: '1007',
        addressLocality: 'Lausanne',
        addressRegion: 'VD',
        addressCountry: 'CH',
    },
    areaServed: [
        { '@type': 'AdministrativeArea', name: 'Genève' },
        { '@type': 'AdministrativeArea', name: 'Vaud' },
        { '@type': 'AdministrativeArea', name: 'Suisse romande' },
    ],
};

export const WEBSITE_JSON_LD = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Swiss Ecogestes',
    url: SITE_URL,
    inLanguage: ['fr', 'en', 'de'],
    publisher: { '@id': `${SITE_URL}/#organization` },
};
