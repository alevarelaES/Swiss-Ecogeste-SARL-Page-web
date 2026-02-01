export interface LegalSection {
    title: string;
    content: string[]; // Array of paragraphs
}

export interface LegalPageContent {
    seo: {
        title: string;
        description: string;
    };
    title: string;
    lastUpdated: string;
    sections: LegalSection[];
}

export interface LegalContent {
    mentionsLegales: LegalPageContent;
    confidentialite: LegalPageContent;
    cookies: LegalPageContent;
}

export const legalContent: LegalContent = {
    mentionsLegales: {
        seo: {
            title: 'Mentions Légales | Swiss Ecogestes',
            description: 'Mentions légales, informations sur l\'entreprise et conditions d\'utilisation du site Swiss Ecogestes.'
        },
        title: 'Mentions Légales',
        lastUpdated: '01 Février 2026',
        sections: [
            {
                title: 'Éditeur du site',
                content: [
                    'Swiss Ecogestes SARL',
                    'Adresse : [Adresse complète]',
                    'Téléphone : [Numéro]',
                    'Email : info@swissecogestes.ch',
                    'IDE : [Numéro IDE]'
                ]
            },
            {
                title: 'Directeur de la publication',
                content: ['[Nom du responsable]']
            },
            {
                title: 'Hébergement',
                content: [
                    'Ce site est hébergé par [Nom de l\'hébergeur]',
                    'Adresse : [Adresse de l\'hébergeur]'
                ]
            }
        ]
    },
    confidentialite: {
        seo: {
            title: 'Politique de Confidentialité | Swiss Ecogestes',
            description: 'Notre politique de protection des données personnelles et de confidentialité.'
        },
        title: 'Politique de Confidentialité',
        lastUpdated: '01 Février 2026',
        sections: [
            {
                title: 'Collecte des données',
                content: [
                    'Nous collectons les informations que vous nous fournissez via nos formulaires de contact...',
                    '[Texte complet à fournir par le client]'
                ]
            },
            {
                title: 'Utilisation des données',
                content: [
                    'Vos données sont utilisées pour répondre à vos demandes...',
                    '[Texte complet à fournir par le client]'
                ]
            }
        ]
    },
    cookies: {
        seo: {
            title: 'Politique des Cookies | Swiss Ecogestes',
            description: 'Informations sur l\'utilisation des cookies sur notre site.'
        },
        title: 'Politique des Cookies',
        lastUpdated: '01 Février 2026',
        sections: [
            {
                title: 'Qu\'est-ce qu\'un cookie ?',
                content: [
                    'Un cookie est un petit fichier texte déposé sur votre ordinateur...',
                    '[Texte complet à fournir par le client]'
                ]
            },
            {
                title: 'Gestion des préférences',
                content: [
                    'Vous pouvez à tout moment modifier vos préférences via notre panneau de gestion...',
                    '[Texte complet à fournir par le client]'
                ]
            }
        ]
    }
};
