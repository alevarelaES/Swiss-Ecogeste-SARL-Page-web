export interface PageService {
    title: string;
    description: string;
    image: string;
    features?: string[];
    note?: string;
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
        title: 'Services Régies & Immeubles | GED, IDC & Audit',
        description: 'Partenaire des régies immobilières. GED, écologement, audit chauffage, calcul IDC et accompagnement AMU pour votre parc immobilier.',
        canonical: '/services/gerance'
    },
    backLink: 'Retour',
    sectionLabel: 'Régies & Immeubles',
    title: 'Gestion Énergétique de Parc',
    description: 'Nous aidons les régies et propriétaires à structurer leur stratégie énergétique : audits, calcul IDC, priorisation des travaux, conformité réglementaire et valorisation du parc immobilier sur le long terme.',
    buttonText: 'Contacter notre pôle Régie',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070',
    services: [
        {
            title: 'GED - Gestionnaire Énergie Délégué',
            description: 'Analyse globale du portefeuille immobilier. Identification des objets prioritaires pour la rénovation et mise en place d\'actions concrètes.',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800',
            features: [
                'COE (contrat d\'optimisation énergétique)',
                'Audit circulateurs',
                'Audit ventilation',
                'Évaluation de l\'équilibrage hydraulique',
                'Audit du local déchets',
                'Audit éclairage'
            ]
        },
        {
            title: 'Écologement (gratuit)*',
            description: 'Réduisez les consommations de votre immeuble, sans travaux lourds. Nos visites permettent d\'identifier des économies concrètes et immédiates.',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800',
            features: [
                'Réduction des consommations d\'électricité, de chauffage et d\'eau',
                'Sensibilisation des habitants',
                'Programme subventionné',
                'Actions simples et rapides',
                'Valorisation auprès des locataires',
                'Installation de matériel efficient'
            ],
            note: '* Sous conditions'
        },
        {
            title: 'Audit Chauffage (gratuit)*',
            description: 'Votre installation a plus de 10 ans ? On analyse, conseille, et identifie les aides disponibles, sans frais.',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800',
            features: [
                'Diagnostic complet',
                'Recommandations renouvelables',
                'Subventions cantonales',
                '100 % gratuit, subventionné SuisseEnergie'
            ],
            note: '* Sous conditions'
        },
        {
            title: 'Calcul IDC',
            description: 'Pilotez la performance énergétique de votre bâtiment en toute conformité. Nous réalisons le calcul IDC afin de vous donner une vision claire de vos consommations.',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800',
            features: [
                'Calcul précis et certifié',
                'Respect des obligations légales',
                'Vision claire de la performance énergétique'
            ]
        },
        {
            title: 'Accompagnement AMU',
            description: 'Facilitez vos projets de rénovation et maximisez leur impact. Nous intégrons les usagers au cœur du projet pour garantir le bon usage et la performance des bâtiments.',
            image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800',
            features: [
                'Accompagnement avant, pendant et après travaux',
                'Implication des occupants pour éviter les blocages',
                'Optimisation de l\'usage réel du bâtiment',
                'Meilleure atteinte des objectifs énergétiques'
            ]
        },
        {
            title: 'Audit sur Mesure',
            description: 'Chaque bâtiment est unique. Votre audit aussi.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
            features: [
                'Adapté à vos contraintes & objectifs',
                'Recommandations actionnables',
                'Premier échange sans engagement'
            ]
        }
    ]
};

const gerancePageContentEn: GerancePageContent = {
    seo: {
        title: 'Real Estate & Buildings Services | GED, IDC & Audit',
        description: 'Partner for real estate agencies. DEM, ecohousing, heating audit, IDC calculation and AMU support for your property portfolio.',
        canonical: '/services/gerance'
    },
    backLink: 'Back',
    sectionLabel: 'Real Estate & Buildings',
    title: 'Portfolio Energy Management',
    description: 'We help agencies and owners to structure their energy strategy: audits, IDC calculation, work prioritization, regulatory compliance and long-term property portfolio enhancement.',
    buttonText: 'Contact our Agency Division',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070',
    services: [
        {
            title: 'DEM - Delegated Energy Manager',
            description: 'Global analysis of the real estate portfolio. Identification of priority objects for renovation and implementation of concrete actions.',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800',
            features: [
                'EOC (energy optimization contract)',
                'Circulator audit',
                'Ventilation audit',
                'Hydraulic balancing assessment',
                'Waste room audit',
                'Lighting audit'
            ]
        },
        {
            title: 'Ecohousing (free)*',
            description: 'Reduce your building\'s consumption without major works. Our visits identify concrete and immediate savings.',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800',
            features: [
                'Reduction of electricity, heating and water consumption',
                'Resident awareness',
                'Subsidized program',
                'Simple and fast actions',
                'Enhanced value for tenants',
                'Installation of efficient equipment'
            ],
            note: '* Subject to conditions'
        },
        {
            title: 'Heating Audit (free)*',
            description: 'Is your installation more than 10 years old? We analyze, advise, and identify available aids, at no cost.',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800',
            features: [
                'Complete diagnosis',
                'Renewable energy recommendations',
                'Cantonal subsidies',
                '100% free, subsidized by SwissEnergy'
            ],
            note: '* Subject to conditions'
        },
        {
            title: 'IDC Calculation',
            description: 'Manage your building\'s energy performance in full compliance. We perform the IDC calculation to give you a clear view of your consumption.',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800',
            features: [
                'Precise and certified calculation',
                'Compliance with legal obligations',
                'Clear view of energy performance'
            ]
        },
        {
            title: 'AMU Support',
            description: 'Facilitate your renovation projects and maximize their impact. We integrate users at the heart of the project to ensure proper use and building performance.',
            image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800',
            features: [
                'Support before, during and after works',
                'Occupant involvement to avoid blockages',
                'Optimization of actual building use',
                'Better achievement of energy goals'
            ]
        },
        {
            title: 'Custom Audit',
            description: 'Every building is unique. So is your audit.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
            features: [
                'Adapted to your constraints & goals',
                'Actionable recommendations',
                'First exchange with no commitment'
            ]
        }
    ]
};

const gerancePageContentDe: GerancePageContent = {
    seo: {
        title: 'Dienstleistungen für Verwaltung & Gebäude | GED, IDC & Audit',
        description: 'Partner für Immobilienverwaltungen. GED, Ökologement, Heizungsaudit, IDC-Berechnung und AMU-Begleitung für Ihren Immobilienbestand.',
        canonical: '/services/gerance'
    },
    backLink: 'Zurück',
    sectionLabel: 'Verwaltung & Gebäude',
    title: 'Energiemanagement für Immobilienparks',
    description: 'Wir helfen Verwaltungen und Eigentümern, ihre Energiestrategie zu strukturieren: Audits, IDC-Berechnung, Arbeitspriorisierung, Rechtskonformität und langfristige Aufwertung des Immobilienbestands.',
    buttonText: 'Unsere Verwaltungsabteilung kontaktieren',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070',
    services: [
        {
            title: 'GED - Delegierter Energiemanager',
            description: 'Globale Analyse des Immobilienportfolios. Identifizierung prioritärer Objekte für die Renovierung und Umsetzung konkreter Maßnahmen.',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800',
            features: [
                'EOV (Energieoptimierungsvertrag)',
                'Umwälzpumpen-Audit',
                'Lüftungsaudit',
                'Bewertung des hydraulischen Abgleichs',
                'Abfallraum-Audit',
                'Beleuchtungsaudit'
            ]
        },
        {
            title: 'Ökologement (kostenlos)*',
            description: 'Reduzieren Sie den Verbrauch Ihres Gebäudes ohne große Arbeiten. Unsere Besuche identifizieren konkrete und sofortige Einsparungen.',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800',
            features: [
                'Reduzierung von Strom-, Heizungs- und Wasserverbrauch',
                'Sensibilisierung der Bewohner',
                'Gefördertes Programm',
                'Einfache und schnelle Maßnahmen',
                'Aufwertung gegenüber Mietern',
                'Installation effizienter Geräte'
            ],
            note: '* Unter Bedingungen'
        },
        {
            title: 'Heizungsaudit (kostenlos)*',
            description: 'Ist Ihre Anlage über 10 Jahre alt? Wir analysieren, beraten und identifizieren verfügbare Fördermittel, kostenlos.',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800',
            features: [
                'Vollständige Diagnose',
                'Empfehlungen für erneuerbare Energien',
                'Kantonale Subventionen',
                '100 % kostenlos, gefördert durch EnergieSchweiz'
            ],
            note: '* Unter Bedingungen'
        },
        {
            title: 'IDC-Berechnung',
            description: 'Steuern Sie die Energieeffizienz Ihres Gebäudes vollständig konform. Wir führen die IDC-Berechnung durch, um Ihnen einen klaren Überblick über Ihren Verbrauch zu geben.',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800',
            features: [
                'Präzise und zertifizierte Berechnung',
                'Einhaltung gesetzlicher Verpflichtungen',
                'Klarer Überblick über die Energieeffizienz'
            ]
        },
        {
            title: 'AMU-Begleitung',
            description: 'Erleichtern Sie Ihre Renovierungsprojekte und maximieren Sie deren Wirkung. Wir integrieren die Nutzer in das Projekt, um die ordnungsgemäße Nutzung und Leistung der Gebäude sicherzustellen.',
            image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800',
            features: [
                'Begleitung vor, während und nach den Arbeiten',
                'Einbeziehung der Bewohner zur Vermeidung von Blockaden',
                'Optimierung der tatsächlichen Gebäudenutzung',
                'Bessere Erreichung der Energieziele'
            ]
        },
        {
            title: 'Maßgeschneidertes Audit',
            description: 'Jedes Gebäude ist einzigartig. Ihr Audit auch.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
            features: [
                'Angepasst an Ihre Einschränkungen & Ziele',
                'Umsetzbare Empfehlungen',
                'Erstes Gespräch unverbindlich'
            ]
        }
    ]
};

export const getGerancePageContent = (lang: string): GerancePageContent => {
    if (lang === 'de') return gerancePageContentDe;
    return lang === 'en' ? gerancePageContentEn : gerancePageContentFr;
};
