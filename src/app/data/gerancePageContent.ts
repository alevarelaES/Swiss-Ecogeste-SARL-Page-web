export interface PageService {
    title: string;
    description: string;
    image: string;
    features?: string[];
}

export interface GerancePageContent {
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

const gerancePageContentFr: GerancePageContent = {
    seo: {
        title: 'Services Régies & Gérances | IDC & Rénovation',
        description: 'Partenaire des régies immobilières. Calcul IDC, audit de parc immobilier et planification de rénovation énergétique.',
        canonical: '/services/gerance'
    },
    backLink: 'Retour',
    sectionLabel: 'Immobilier & Régies',
    title: 'Gestion Énergétique de Parc',
    description: 'Nous aidons les gérances et propriétaires institutionnels à valoriser leur parc immobilier et à répondre aux obligations légales (IDC, CECB).',
    buttonText: 'Contacter notre pôle Régie',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070',
    services: [
        {
            title: 'Calcul IDC',
            description: 'Calcul de l\'Indice de Dépense de Chaleur obligatoire. Suivi annuel et optimisation pour éviter les sanctions.',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800',
            features: [
                "Relevé et analyse des données de consommation",
                "Calcul précis selon la norme en vigueur",
                "Comparaison avec les années précédentes",
                "Recommandations d'optimisation immédiates",
                "Rapport certifié pour les autorités"
            ]
        },
        {
            title: 'Audit de Parc',
            description: 'Analyse globale de portefeuilles immobiliers. Identification des objets prioritaires pour la rénovation.',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800',
            features: [
                "Analyse technique de l'état du bâtiment",
                "Identification des gisements d'économies",
                "Planification pluriannuelle des travaux",
                "Priorisation selon le retour sur investissement",
                "Valorisation à long terme du capital immobilier"
            ]
        },
        {
            title: 'Subventions',
            description: 'Gestion complète des demandes de subventions (Programme Bâtiments, etc.) pour vos travaux de rénovation.',
            image: 'https://images.unsplash.com/photo-1759398430338-8057876edf61?q=80&w=800',
            features: [
                "Identification des programmes éligibles",
                "Montage administratif des dossiers",
                "Suivi jusqu'au versement des fonds",
                "Veille sur les nouvelles opportunités",
                "Optimisation du financement des travaux"
            ]
        }
    ]
};

const gerancePageContentEn: GerancePageContent = {
    seo: {
        title: 'Real Estate Agency Services | IDC & Renovation',
        description: 'Partner for real estate agencies. IDC calculation, property portfolio audit, and energy renovation planning.',
        canonical: '/services/gerance'
    },
    backLink: 'Back to choices',
    sectionLabel: 'Real Estate & Agencies',
    title: 'Portfolio Energy Management',
    description: 'We help agencies and institutional owners enhance their property portfolio and meet legal obligations (IDC, CECB).',
    buttonText: 'Contact our Agency Division',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070',
    services: [
        {
            title: 'IDC Calculation',
            description: 'Calculation of the mandatory Heat Expense Index. Annual monitoring and optimization to avoid sanctions.',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800',
            features: [
                "Collection and analysis of consumption data",
                "Precise calculation according to current standards",
                "Comparison with previous years",
                "Immediate optimization recommendations",
                "Certified report for authorities"
            ]
        },
        {
            title: 'Portfolio Audit',
            description: 'Global analysis of real estate portfolios. Identification of priority objects for renovation.',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800',
            features: [
                "Technical analysis of building condition",
                "Identification of savings opportunities",
                "Multi-year work planning",
                "Prioritization based on ROI",
                "Long-term real estate capital enhancement"
            ]
        },
        {
            title: 'Subsidies',
            description: 'Complete management of subsidy applications (Building Program, etc.) for your renovation works.',
            image: 'https://images.unsplash.com/photo-1759398430338-8057876edf61?q=80&w=800',
            features: [
                "Identification of eligible programs",
                "Administrative file preparation",
                "Follow-up until funds disbursement",
                "Monitoring of new opportunities",
                "Work financing optimization"
            ]
        }
    ]
};


const gerancePageContentDe: GerancePageContent = {
    seo: {
        title: 'Dienstleistungen für Hausverwaltungen | IDC & Renovierung',
        description: 'Partner für Immobilienverwaltungen. IDC-Berechnung, Immobilienpark-Audit und energetische Renovierungsplanung.',
        canonical: '/services/gerance'
    },
    backLink: 'Zurück zur Auswahl',
    sectionLabel: 'Immobilien & Verwaltungen',
    title: 'Energiemanagement für Immobilienparks',
    description: 'Wir helfen Verwaltungen und institutionellen Eigentümern, ihren Immobilienbestand aufzuwerten und gesetzliche Verpflichtungen (IDC, CECB) zu erfüllen.',
    buttonText: 'Kontaktieren Sie unsere Verwaltungsabteilung',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070',
    services: [
        {
            title: 'IDC-Berechnung',
            description: 'Berechnung des obligatorischen Wärmeverbrauchsindex. Jährliche Überwachung und Optimierung zur Vermeidung von Sanktionen.',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800',
            features: [
                "Erfassung und Analyse von Verbrauchsdaten",
                "Präzise Berechnung nach geltenden Normen",
                "Vergleich mit Vorjahren",
                "Sofortige Optimierungsempfehlungen",
                "Zertifizierter Bericht für Behörden"
            ]
        },
        {
            title: 'Park-Audit',
            description: 'Globale Analyse von Immobilienportfolios. Identifizierung von Prioritätsobjekten für die Renovierung.',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800',
            features: [
                "Technische Analyse des Gebäudezustands",
                "Identifizierung von Einsparpotenzialen",
                "Mehrjährige Arbeitsplanung",
                "Priorisierung nach ROI",
                "Langfristige Wertsteigerung des Immobilienkapitals"
            ]
        },
        {
            title: 'Subventionen',
            description: 'Vollständiges Management von Subventionsanträgen (Gebäudeprogramm, etc.) für Ihre Renovierungsarbeiten.',
            image: 'https://images.unsplash.com/photo-1759398430338-8057876edf61?q=80&w=800',
            features: [
                "Identifizierung förderfähiger Programme",
                "Administrative Dossiererstellung",
                "Begleitung bis zur Auszahlung",
                "Überwachung neuer Möglichkeiten",
                "Optimierung der Baufinanzierung"
            ]
        }
    ]
};

export const getGerancePageContent = (lang: string): GerancePageContent => {
    if (lang === 'de') return gerancePageContentDe;
    return lang === 'en' ? gerancePageContentEn : gerancePageContentFr;
};
