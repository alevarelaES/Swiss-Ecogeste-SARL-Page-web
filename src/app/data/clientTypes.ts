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
        description: 'Valorisez votre parc et anticipez les obligations légales.',
        link: '/services/gerance',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'villas',
        title: 'Propriétaires de Villas',
        subtitle: 'Particuliers',
        description: 'Rénovez votre bien et profitez des subventions cantonales pour améliorer l\'efficacité énergétique de votre maison.',
        link: '/services/villa',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'entreprises',
        title: 'Entreprises & PME',
        subtitle: 'Professionnels',
        description: 'Optimisez votre consommation et réduisez vos coûts d\'exploitation avec nos audits (PEIK).',
        link: '/services/entreprise',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'communes',
        title: 'Communes & GRD',
        subtitle: 'Collectivités',
        description: 'Accompagnez vos citoyens et atteignez vos objectifs climatiques avec nos programmes de transition énergétique.',
        link: '/services/communes',
        image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800'
    }
];

const clientTypesEn: ClientType[] = [
    {
        id: 'regies',
        title: 'Real Estate & Buildings',
        subtitle: 'Managers',
        description: 'Enhance your property portfolio and anticipate legal obligations.',
        link: '/services/gerance',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'villas',
        title: 'Villa Owners',
        subtitle: 'Individuals',
        description: 'Renovate your property and benefit from cantonal subsidies to improve your home\'s energy efficiency.',
        link: '/services/villa',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'entreprises',
        title: 'Businesses & SMEs',
        subtitle: 'Professionals',
        description: 'Optimize your consumption and reduce operating costs with our audits (PEIK).',
        link: '/services/entreprise',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'communes',
        title: 'Municipalities & DSOs',
        subtitle: 'Collectivities',
        description: 'Support your citizens and achieve your climate goals with our energy transition programmes.',
        link: '/services/communes',
        image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800'
    }
];

const clientTypesDe: ClientType[] = [
    {
        id: 'regies',
        title: "Immobilien & Liegenschaften",
        subtitle: "Verwalter",
        description: "Werten Sie Ihr Immobilienportfolio auf und antizipieren Sie gesetzliche Anforderungen.",
        link: '/services/gerance',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'villas',
        title: "Villenbesitzer",
        subtitle: "Privatpersonen",
        description: "Renovieren Sie Ihre Immobilie und profitieren Sie von kantonalen Fördermitteln zur Verbesserung der Energieeffizienz.",
        link: '/services/villa',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'entreprises',
        title: "Unternehmen & KMU",
        subtitle: "Profis",
        description: "Optimieren Sie Ihren Verbrauch und senken Sie Betriebskosten mit unseren Audits (PEIK).",
        link: '/services/entreprise',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'communes',
        title: "Gemeinden & VNB",
        subtitle: "Öffentlicher Sektor",
        description: "Unterstützen Sie Ihre Bürger und erreichen Sie Ihre Klimaziele mit unseren Energiewendeprogrammen.",
        link: '/services/communes',
        image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800'
    }
];

export const getClientTypes = (lang: string): ClientType[] => {
    if (lang.startsWith('de')) return clientTypesDe;
    return lang.startsWith('en') ? clientTypesEn : clientTypesFr;
};
