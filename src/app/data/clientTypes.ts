export interface ClientType {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    link: string;
    image: string;
}

const clientTypesFr: ClientType[] = [
    {
        id: 'regies',
        title: 'Régies & Immeubles',
        subtitle: 'Gestionnaires',
        description: 'Valorisez votre parc immobilier et réduisez les charges locatives.',
        link: '/services/gerance',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'villas',
        title: 'Propriétaires de Villas',
        subtitle: 'Particuliers',
        description: 'Rénovez votre bien et profitez des subventions cantonales.',
        link: '/services/villa',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'entreprises',
        title: 'Entreprises & PME',
        subtitle: 'Professionnels',
        description: 'Optimisez votre consommation et respectez les cadres légaux (PAKE).',
        link: '/services/entreprise',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'communes',
        title: 'Communes & GRD',
        subtitle: 'Collectivités',
        description: 'Accompagnez vos citoyens et atteignez vos objectifs climatiques.',
        link: '/services/communes',
        image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800'
    }
];

const clientTypesEn: ClientType[] = [
    {
        id: 'regies',
        title: 'Real Estate & Buildings',
        subtitle: 'Managers',
        description: 'Enhance your property portfolio and reduce rental charges.',
        link: '/services/gerance',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'villas',
        title: 'Villa Owners',
        subtitle: 'Individuals',
        description: 'Renovate your property and benefit from cantonal subsidies.',
        link: '/services/villa',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'entreprises',
        title: 'Businesses & SMEs',
        subtitle: 'Professionals',
        description: 'Optimize your consumption and comply with legal frameworks (PAKE).',
        link: '/services/entreprise',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'communes',
        title: 'Municipalities & DSOs',
        subtitle: 'Collectivities',
        description: 'Support your citizens and achieve your climate goals.',
        link: '/services/communes',
        image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800'
    }
];

const clientTypesDe: ClientType[] = [
    {
        id: 'regies',
        title: "Immobilien & Liegenschaften",
        subtitle: "Verwalter",
        description: "Werten Sie Ihr Immobilienportfolio auf und senken Sie die Mietnebenkosten.",
        link: '/services/gerance',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'villas',
        title: "Villenbesitzer",
        subtitle: "Privatpersonen",
        description: "Renovieren Sie Ihre Immobilie und profitieren Sie von kantonalen Fördermitteln.",
        link: '/services/villa',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'entreprises',
        title: "Unternehmen & KMU",
        subtitle: "Profis",
        description: "Optimieren Sie Ihren Verbrauch und halten Sie die gesetzlichen Rahmenbedingungen ein (GVA).",
        link: '/services/entreprise',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'communes',
        title: "Gemeinden & VNB",
        subtitle: "Öffentlicher Sektor",
        description: "Unterstützen Sie Ihre Bürger und erreichen Sie Ihre Klimaziele.",
        link: '/services/communes',
        image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800'
    }
];

export const getClientTypes = (lang: string): ClientType[] => {
    if (lang.startsWith('de')) return clientTypesDe;
    return lang.startsWith('en') ? clientTypesEn : clientTypesFr;
};
