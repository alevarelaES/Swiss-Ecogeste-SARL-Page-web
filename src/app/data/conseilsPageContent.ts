export interface ConseilsPageContent {
    seo: {
        title: string;
        description: string;
        canonical: string;
    };
    sectionLabel: string;
    title: string;
    titleHighlight: string;
    description: string;
    readMoreText: string;
}

const conseilsPageContentFr: ConseilsPageContent = {
    seo: {
        title: 'Actualités & Ressources | Swiss Ecogestes',
        description: 'Retrouvez nos derniers articles, guides et actualités sur la transition énergétique, le solaire et les économies d\'énergie en Suisse.',
        canonical: '/conseils'
    },
    sectionLabel: 'Le Journal de l\'Énergie',
    title: 'Actualités &',
    titleHighlight: 'Ressources',
    description: 'Décrypter la transition énergétique. Des guides pratiques, des analyses de marché et les dernières actualités sur les subventions.',
    readMoreText: 'Lire l\'article'
};

const conseilsPageContentEn: ConseilsPageContent = {
    seo: {
        title: 'News & Resources | Swiss Ecogestes',
        description: 'Find our latest articles, guides, and news on energy transition, solar, and energy savings in Switzerland.',
        canonical: '/conseils'
    },
    sectionLabel: 'The Energy Journal',
    title: 'News &',
    titleHighlight: 'Resources',
    description: 'Decoding the energy transition. Practical guides, market analyses, and the latest news on subsidies.',
    readMoreText: 'Read article'
};

const conseilsPageContentDe: ConseilsPageContent = {
    seo: {
        title: 'Aktuelles & Ressourcen | Swiss Ecogestes',
        description: 'Finden Sie unsere neuesten Artikel, Ratgeber und Nachrichten zur Energiewende, Solar und Energieeinsparung in der Schweiz.',
        canonical: '/conseils'
    },
    sectionLabel: 'Energie-Journal',
    title: 'Aktuelles &',
    titleHighlight: 'Ressourcen',
    description: 'Entschlüsselung der Energiewende. Praktische Ratgeber, Marktanalysen und die neuesten Nachrichten zu Subventionen.',
    readMoreText: 'Artikel lesen'
};

export const getConseilsPageContent = (lang: string): ConseilsPageContent => {
    if (lang === 'de') return conseilsPageContentDe;
    return lang === 'en' ? conseilsPageContentEn : conseilsPageContentFr;
};
