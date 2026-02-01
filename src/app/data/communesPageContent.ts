export interface PageService {
    title: string;
    description: string;
    image: string;
    features?: string[];
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
        title: 'Services pour Communes & GRD | Transition Énergétique',
        description: 'Accompagnement des communes et services industriels pour atteindre les objectifs climatiques : audits, sensibilisation et gestion de programmes.',
        canonical: '/services/communes'
    },
    backLink: 'Retour',
    sectionLabel: 'Villes & Services Industriels',
    title: 'Un partenaire pour atteindre vos objectifs climatiques',
    description: 'Swiss Ecogestes soutient les collectivités publiques dans la mise en œuvre de leur stratégie énergétique. De l\'audit de bâtiments communaux à l\'animation de la transition auprès des citoyens.',
    buttonText: 'Discuter d\'un partenariat',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&q=80&w=2000',
    services: [
        {
            title: 'Audits Territoriaux',
            description: 'Analyse complète du parc immobilier communal et planification de la transition énergétique à l\'échelle du quartier.',
            image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000',
            features: [
                "Bilan énergétique du patrimoine communal",
                "Planification énergétique territoriale",
                "Stratégie de rénovation des bâtiments publics",
                "Développement de réseaux thermiques",
                "Cartographie des potentiels solaires"
            ]
        },
        {
            title: 'Sensibilisation Citoyenne',
            description: 'Campagnes d\'information et ateliers participatifs pour engager vos habitants dans la démarche écologique.',
            image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000',
            features: [
                "Organisation de séances d'information",
                "Création de supports de communication",
                "Ateliers pratiques pour les habitants",
                "Campagnes de sensibilisation écogestes",
                "Animation de la communauté locale"
            ]
        },
        {
            title: 'Programmes Subventionnés',
            description: 'Mise en place et gestion de programmes d\'aide communaux, alignés avec les subventions cantonales et fédérales.',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000',
            features: [
                "Conception de règlements de subventions",
                "Gestion administrative des demandes",
                "Contrôle de conformité des dossiers",
                "Reporting financier régulier",
                "Coordination avec les aides cantonales"
            ]
        },
        {
            title: 'Impact & Reporting',
            description: 'Mesure précise des économies d\'énergie et de la réduction de CO2 pour votre bilan de législature.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000',
            features: [
                "Tableaux de bord de suivi énergétique",
                "Calcul des économies de CO2 réalisées",
                "Rapports pour le conseil communal",
                "Indicateurs de performance clés (KPI)",
                "Communication des résultats aux citoyens"
            ]
        }
    ]
};

const communesPageContentEn: CommunesPageContent = {
    seo: {
        title: 'Services for Municipalities & DSOs | Energy Transition',
        description: 'Support for municipalities and industrial services to achieve climate goals: audits, awareness, and program management.',
        canonical: '/services/communes'
    },
    backLink: 'Back',
    sectionLabel: 'Cities & Industrial Services',
    title: 'A partner to achieve your climate goals',
    description: 'Swiss Ecogestes supports public authorities in implementing their energy strategy. From communal building audits to transition animation for citizens.',
    buttonText: 'Discuss a partnership',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&q=80&w=2000',
    services: [
        {
            title: 'Territorial Audits',
            description: 'Complete analysis of the communal real estate portfolio and energy transition planning at the district scale.',
            image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000',
            features: [
                "Energy balance of municipal assets",
                "Territorial energy planning",
                "Public building renovation strategy",
                "Development of thermal networks",
                "Mapping of solar potentials"
            ]
        },
        {
            title: 'Citizen Awareness',
            description: 'Information campaigns and participatory workshops to engage your inhabitants in the ecological process.',
            image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000',
            features: [
                "Organization of information sessions",
                "Creation of communication materials",
                "Practical workshops for residents",
                "Ecogestures awareness campaigns",
                "Animation of the local community"
            ]
        },
        {
            title: 'Subsidized Programs',
            description: 'Implementation and management of communal aid programs, aligned with cantonal and federal subsidies.',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000',
            features: [
                "Design of subsidy regulations",
                "Administrative management of requests",
                "Compliance check of files",
                "Regular financial reporting",
                "Coordination with cantonal aids"
            ]
        },
        {
            title: 'Impact & Reporting',
            description: 'Precise measurement of energy savings and CO2 reduction for your legislature balance sheet.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000',
            features: [
                "Energy monitoring dashboards",
                "Calculation of achieved CO2 savings",
                "Reports for the municipal council",
                "Key Performance Indicators (KPIs)",
                "Communication of results to citizens"
            ]
        }
    ]
};


const communesPageContentDe: CommunesPageContent = {
    seo: {
        title: 'Dienstleistungen für Gemeinden & VNB | Energiewende',
        description: 'Unterstützung für Gemeinden und industrielle Dienste zur Erreichung der Klimaziele: Audits, Sensibilisierung und Programmmanagement.',
        canonical: '/services/communes'
    },
    backLink: 'Zurück',
    sectionLabel: 'Städte & Industrielle Dienste',
    title: 'Ein Partner zur Erreichung Ihrer Klimaziele',
    description: 'Swiss Ecogestes unterstützt öffentliche Körperschaften bei der Umsetzung ihrer Energiestrategie. Von der Prüfung kommunaler Gebäude bis zur Begleitung des Übergangs für die Bürger.',
    buttonText: 'Partnerschaft besprechen',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&q=80&w=2000',
    services: [
        {
            title: 'Territoriale Audits',
            description: 'Vollständige Analyse des kommunalen Immobilienbestands und Planung der Energiewende auf Quartiersebene.',
            image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000',
            features: [
                "Energiebilanz des Gemeindevermögens",
                "Territoriale Energieplanung",
                "Renovierungsstrategie für öffentliche Gebäude",
                "Entwicklung von Wärmenetzen",
                "Kartierung von Solarpotenzialen"
            ]
        },
        {
            title: 'Bürgersensibilisierung',
            description: 'Informationskampagnen und partizipative Workshops, um Ihre Einwohner in den ökologischen Prozess einzubeziehen.',
            image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000',
            features: [
                "Organisation von Informationsveranstaltungen",
                "Erstellung von Kommunikationsmaterialien",
                "Praktische Workshops für Einwohner",
                "Sensibilisierungskampagnen für Ökogesten",
                "Animation der lokalen Gemeinschaft"
            ]
        },
        {
            title: 'Subventionierte Programme',
            description: 'Implementierung und Verwaltung kommunaler Hilfsprogramme, abgestimmt auf kantonale und bundesstaatliche Subventionen.',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000',
            features: [
                "Konzeption von Subventionsreglementen",
                "Administrative Verwaltung von Anträgen",
                "Konformitätsprüfung der Dossiers",
                "Regelmäßiges Finanzreporting",
                "Koordination mit kantonalen Beihilfen"
            ]
        },
        {
            title: 'Wirkung & Berichterstattung',
            description: 'Präzise Messung von Energieeinsparungen und CO2-Reduktion für Ihre Legislaturbilanz.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000',
            features: [
                "Dashboards zur Energieüberwachung",
                "Berechnung der erzielten CO2-Einsparungen",
                "Berichte für den Gemeinderat",
                "Leistungskennzahlen (KPIs)",
                "Kommunikation der Ergebnisse an die Bürger"
            ]
        }
    ]
};

export const getCommunesPageContent = (lang: string): CommunesPageContent => {
    if (lang === 'de') return communesPageContentDe;
    return lang === 'en' ? communesPageContentEn : communesPageContentFr;
};
