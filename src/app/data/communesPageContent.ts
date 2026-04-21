export interface PageService {
    title: string;
    description: string;
    image: string;
    features?: string[];
    note?: string;
}

export interface CommunesPageContent {
    seo: {
        title: string;
        description: string;
        canonical: string;
    };
    backLink: string;
    sectionLabel: string;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    heroImage: string;
    services: PageService[];
}

const communesPageContentFr: CommunesPageContent = {
    seo: {
        title: 'Services pour Communes & GRD | Stratégie Énergétique Territoriale',
        description: 'Accompagnement des communes et services industriels pour définir et mettre en œuvre leur stratégie énergétique territoriale.',
        canonical: '/services/communes'
    },
    backLink: 'Retour',
    sectionLabel: 'Communes & GRD',
    title: 'Un partenaire pour atteindre vos objectifs climatiques',
    description: 'Nous accompagnons les communes et services industriels dans la définition et la mise en œuvre de stratégies énergétiques territoriales, en combinant analyse technique, planification et mobilisation des acteurs locaux.',
    buttonText: 'Discuter d\'un partenariat',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&q=80&w=2000',
    services: [
        {
            title: 'Audit Général & Plan d\'Action',
            description: 'Une approche structurée pour définir vos priorités et transformer vos objectifs en actions concrètes.',
            image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000',
            features: [
                'Analyse de vos objectifs énergétiques, climatiques et réglementaires',
                'Évaluation des potentiels d\'amélioration',
                'Élaboration d\'un plan d\'action clair et réaliste',
                'Déploiement progressif des mesures',
                'Suivi complet'
            ]
        },
        {
            title: 'Mesures Concrètes',
            description: 'Des solutions adaptées aux différents publics de votre territoire, pour passer de la stratégie à l\'action.',
            image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000',
            features: [
                'Bâtiments communaux — audits et rénovation énergétique',
                'Immeubles et régies — GED, IDC, écologement',
                'Villas et maisons — visite SIG, audit chauffage, CECB',
                'Entreprises locales — visite conseil, audit PEIK'
            ]
        }
    ]
};

const communesPageContentEn: CommunesPageContent = {
    seo: {
        title: 'Services for Municipalities & DSOs | Territorial Energy Strategy',
        description: 'Support for municipalities and industrial services to define and implement their territorial energy strategy.',
        canonical: '/services/communes'
    },
    backLink: 'Back',
    sectionLabel: 'Municipalities & DSOs',
    title: 'A partner to achieve your climate goals',
    description: 'We support municipalities and industrial services in defining and implementing territorial energy strategies, combining technical analysis, planning, and local stakeholder mobilization.',
    buttonText: 'Discuss a partnership',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&q=80&w=2000',
    services: [
        {
            title: 'General Audit & Action Plan',
            description: 'A structured approach to define your priorities and transform your goals into concrete actions.',
            image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000',
            features: [
                'Analysis of your energy, climate and regulatory goals',
                'Assessment of improvement potentials',
                'Development of a clear and realistic action plan',
                'Progressive deployment of measures',
                'Complete monitoring'
            ]
        },
        {
            title: 'Concrete Measures',
            description: 'Solutions tailored to the different audiences in your territory, to move from strategy to action.',
            image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000',
            features: [
                'Municipal buildings — energy audits and renovation',
                'Buildings & agencies — DEM, IDC, ecohousing',
                'Villas & houses — SIG visit, heating audit, CECB',
                'Local businesses — advisory visit, PEIK audit'
            ]
        }
    ]
};

const communesPageContentDe: CommunesPageContent = {
    seo: {
        title: 'Dienstleistungen für Gemeinden & VNB | Territoriale Energiestrategie',
        description: 'Unterstützung für Gemeinden und industrielle Dienste bei der Definition und Umsetzung ihrer territorialen Energiestrategie.',
        canonical: '/services/communes'
    },
    backLink: 'Zurück',
    sectionLabel: 'Gemeinden & VNB',
    title: 'Ein Partner zur Erreichung Ihrer Klimaziele',
    description: 'Wir begleiten Gemeinden und industrielle Dienste bei der Definition und Umsetzung territorialer Energiestrategien, durch Kombination von technischer Analyse, Planung und Mobilisierung lokaler Akteure.',
    buttonText: 'Partnerschaft besprechen',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&q=80&w=2000',
    services: [
        {
            title: 'Allgemeines Audit & Aktionsplan',
            description: 'Ein strukturierter Ansatz zur Definition Ihrer Prioritäten und zur Umsetzung Ihrer Ziele in konkrete Maßnahmen.',
            image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000',
            features: [
                'Analyse Ihrer Energie-, Klima- und Regulierungsziele',
                'Bewertung der Verbesserungspotenziale',
                'Entwicklung eines klaren und realistischen Aktionsplans',
                'Schrittweise Umsetzung der Maßnahmen',
                'Vollständiges Monitoring'
            ]
        },
        {
            title: 'Konkrete Maßnahmen',
            description: 'Auf die verschiedenen Zielgruppen Ihres Gebiets zugeschnittene Lösungen, um von der Strategie zur Aktion zu gelangen.',
            image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000',
            features: [
                'Kommunale Gebäude — Energieaudits und Renovierung',
                'Gebäude & Verwaltungen — GED, IDC, Ökologement',
                'Villen & Häuser — SIG-Besuch, Heizungsaudit, CECB',
                'Lokale Unternehmen — Beratungsbesuch, PEIK-Audit'
            ]
        }
    ]
};

export const getCommunesPageContent = (lang: string): CommunesPageContent => {
    if (lang === 'de') return communesPageContentDe;
    return lang === 'en' ? communesPageContentEn : communesPageContentFr;
};
