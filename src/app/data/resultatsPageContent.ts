export interface ImpactStat {
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
}

export interface CaseKpi {
    value: string;
    unit: string;
    label: string;
}

export interface CaseItem {
    sector: string;
    title: string;
    metric: number;
    suffix: string;
    metricLabel: string;
    kpis: CaseKpi[];
    before: string[];
    after: string[];
}

export interface Testimonial {
    quote: string;
    name: string;
    role: string;
    result: string;
}

export interface ResultatsPageContent {
    seo: {
        title: string;
        description: string;
    };
    heroTitle: string;
    heroSubtitle: string;
    impactStats: ImpactStat[];
    cases: CaseItem[];
    proofByExample: {
        title: string;
        description: string;
    };
    casesBefore: string;
    casesAfter: string;
    testimonials: {
        tagline: string;
        title: string;
        testimonial: Testimonial[];
    };
    actors: string;
}

const impactStatsFr: ImpactStat[] = [
    { value: 150, suffix: '+', label: 'Audits réalisés' },
    { value: 300, suffix: '+', label: 'Bâtiments accompagnés' },
    { value: 25, suffix: '%', prefix: '~ ', label: 'Économies identifiées' },
    { value: 15, suffix: '+', label: 'Partenaires reconnus' },
];

const impactStatsEn: ImpactStat[] = [
    { value: 150, suffix: '+', label: 'Audits completed' },
    { value: 300, suffix: '+', label: 'Buildings supported' },
    { value: 25, suffix: '%', prefix: '~ ', label: 'Savings identified' },
    { value: 15, suffix: '+', label: 'Recognized partners' },
];

const impactStatsDe: ImpactStat[] = [
    { value: 150, suffix: '+', label: 'Durchgeführte Audits' },
    { value: 300, suffix: '+', label: 'Begleitete Gebäude' },
    { value: 25, suffix: '%', prefix: '~ ', label: 'Identifizierte Einsparungen' },
    { value: 15, suffix: '+', label: 'Anerkannte Partner' },
];

const casesFr: CaseItem[] = [
    {
        sector: 'Régie & Immeuble',
        title: 'Immeuble locatif, 24 logements — Genève',
        metric: 18,
        suffix: '%',
        metricLabel: "Économie générée",
        kpis: [
            { value: '650', unit: 'MJ/m²a', label: 'Conso. Initiale (IDC)' },
            { value: '12', unit: 'mois', label: 'Retour sur investissement' }
        ],
        before: [
            "Chaufferie vétuste",
            "Pompes mal réglées",
            "Plaintes récurrentes de locataires pour inconfort estival et surchauffe"
        ],
        after: [
            "Audit IDC",
            "Mise en place de la GED",
            "Équilibrage hydraulique et optimisation ciblée"
        ]
    },
    {
        sector: 'Villa individuelle',
        title: 'Maison familiale — La Côte (VD)',
        metric: 65,
        suffix: '%',
        metricLabel: "Frais d'étude couverts",
        kpis: [
            { value: '100', unit: '%', label: 'Plafond de Subvention' },
            { value: '30', unit: 'jours', label: "Délai d'approbation" }
        ],
        before: [
            "Chauffage au mazout très coûteux",
            "Fortes déperditions en toiture",
            "Sensation d'inconfort face aux courants d'air"
        ],
        after: [
            "Édition intégrale CECB+",
            "Conception de scénarios chiffrés",
            "Montage complet du dossier d'aides"
        ]
    },
    {
        sector: 'Entreprise & PME',
        title: 'Site de production industriel — Lausanne',
        metric: 22,
        suffix: '%',
        metricLabel: "Économies annuelles",
        kpis: [
            { value: '200', unit: 'k kWh/an', label: 'Consommation de base' },
            { value: '70', unit: '%', label: 'Taux subventionnable' }
        ],
        before: [
            "Pertes massives sur les réseaux d'air comprimé",
            "Groupes de froid mal régulés",
            "Risques de non-conformité cantonale"
        ],
        after: [
            "Audit PEIK complet",
            "Intégration d'une récupération de chaleur",
            "Plan d'action subventionné"
        ]
    }
];

const casesEn: CaseItem[] = [
    {
        sector: 'Property Management & Building',
        title: 'Rental building, 24 units — Geneva',
        metric: 18,
        suffix: '%',
        metricLabel: "Savings generated",
        kpis: [
            { value: '650', unit: 'MJ/m²a', label: 'Initial consumption (IDC)' },
            { value: '12', unit: 'months', label: 'Return on investment' }
        ],
        before: [
            "Outdated boiler room",
            "Poorly calibrated pumps",
            "Recurring tenant complaints about summer discomfort and overheating"
        ],
        after: [
            "IDC audit",
            "Implementation of energy management system",
            "Hydraulic balancing and targeted optimization"
        ]
    },
    {
        sector: 'Individual Villa',
        title: 'Family home — La Côte (VD)',
        metric: 65,
        suffix: '%',
        metricLabel: "Study costs covered",
        kpis: [
            { value: '100', unit: '%', label: 'Subsidy ceiling' },
            { value: '30', unit: 'days', label: "Approval period" }
        ],
        before: [
            "Very expensive oil heating",
            "High roof heat losses",
            "Discomfort from drafts"
        ],
        after: [
            "Complete CECB+ assessment",
            "Development of costed scenarios",
            "Full subsidy application package"
        ]
    },
    {
        sector: 'Business & SME',
        title: 'Industrial production facility — Lausanne',
        metric: 22,
        suffix: '%',
        metricLabel: "Annual savings",
        kpis: [
            { value: '200', unit: 'k kWh/year', label: 'Base consumption' },
            { value: '70', unit: '%', label: 'Eligible subsidy rate' }
        ],
        before: [
            "Massive losses on compressed air networks",
            "Poorly regulated cooling units",
            "Risk of non-compliance with cantonal standards"
        ],
        after: [
            "Complete PEIK audit",
            "Integration of heat recovery",
            "Subsidized action plan"
        ]
    }
];

const casesDe: CaseItem[] = [
    {
        sector: 'Hausverwaltung & Gebäude',
        title: 'Mietgebäude mit 24 Einheiten — Genf',
        metric: 18,
        suffix: '%',
        metricLabel: "Erzielte Einsparungen",
        kpis: [
            { value: '650', unit: 'MJ/m²a', label: 'Anfänglicher Verbrauch (IDC)' },
            { value: '12', unit: 'Monate', label: 'Amortisationsdauer' }
        ],
        before: [
            "Veraltete Heizzentrale",
            "Schlecht eingestellte Pumpen",
            "Wiederkehrende Mieterbeschwerden über Sommerwärme und Überhitzung"
        ],
        after: [
            "IDC-Audit",
            "Implementierung eines Energiemanagementsystems",
            "Hydraulischer Abgleich und gezielte Optimierung"
        ]
    },
    {
        sector: 'Einfamilienhaus',
        title: 'Einfamilienhaus — La Côte (VD)',
        metric: 65,
        suffix: '%',
        metricLabel: "Studienkosten gedeckt",
        kpis: [
            { value: '100', unit: '%', label: 'Subventionsobergrenze' },
            { value: '30', unit: 'Tage', label: "Genehmigungsdauer" }
        ],
        before: [
            "Sehr teure Ölheizung",
            "Hohe Wärmeverluste über das Dach",
            "Unbehagen durch Zugluft"
        ],
        after: [
            "Vollständige CECB+-Bewertung",
            "Erstellung kostenloser Szenarien",
            "Komplettes Subventionsantragspaket"
        ]
    },
    {
        sector: 'Gewerbebetrieb & KMU',
        title: 'Industrielle Produktionsstätte — Lausanne',
        metric: 22,
        suffix: '%',
        metricLabel: "Jährliche Einsparungen",
        kpis: [
            { value: '200', unit: 'k kWh/Jahr', label: 'Basisverbrauch' },
            { value: '70', unit: '%', label: 'Förderfähiger Subventionssatz' }
        ],
        before: [
            "Massive Verluste in Druckluftnetzen",
            "Schlecht geregelte Kühleinheiten",
            "Risiko der Nichtkonformität mit kantonalen Standards"
        ],
        after: [
            "Vollständiges PEIK-Audit",
            "Integration der Wärmeregelung",
            "Geförderter Aktionsplan"
        ]
    }
];

const testimonialsFr: Testimonial[] = [
    { quote: "Notre seul intérêt : que vous économisiez. Pas de matériel à vendre, pas de marges cachées. Juste votre intérêt, en priorité.", name: 'Swiss Ecogestes', role: 'Notre Engagement', result: 'Indépendance' },
    { quote: "Grâce à Swiss Ecogeste, le processus d'audit a valorisé notre patrimoine en un temps record.", name: 'Marc D.', role: 'Propriétaire de bâtiment', result: 'Amélioration thermique' },
    { quote: "Une approche 100% neutre, sans forcer la vente de matériel de chauffagistes. Leur seul intérêt était le nôtre.", name: 'Sophie L.', role: 'Gérante de Régie', result: 'Transparence totale' },
];

const testimonialsEn: Testimonial[] = [
    { quote: "Our only interest is your savings. No equipment to sell, no hidden margins. Just your interests first.", name: 'Swiss Ecogestes', role: 'Our Commitment', result: 'Independence' },
    { quote: "Thanks to Swiss Ecogestes, the audit process enhanced our building\'s value in record time.", name: 'Marc D.', role: 'Building Owner', result: 'Thermal improvement' },
    { quote: "A 100% neutral approach, without pushing heating equipment sales. Their only interest was ours.", name: 'Sophie L.', role: 'Property Manager', result: 'Complete transparency' },
];

const testimonialsDe: Testimonial[] = [
    { quote: "Unser einziges Interesse sind Ihre Einsparungen. Keine Geräte zu verkaufen, keine versteckten Margen. Nur Ihre Interessen an erster Stelle.", name: 'Swiss Ecogestes', role: 'Unser Engagement', result: 'Unabhängigkeit' },
    { quote: "Dank Swiss Ecogestes verbesserte der Audit-Prozess den Wert unseres Gebäudes in Rekordzeit.", name: 'Marc D.', role: 'Gebäudeeigentümer', result: 'Thermische Verbesserung' },
    { quote: "Ein 100% neutraler Ansatz ohne Druck zum Verkauf von Heizgeräten. Ihr einziges Interesse war unseres.", name: 'Sophie L.', role: 'Hausverwalterin', result: 'Vollständige Transparenz' },
];

const resultatsPageContentFr: ResultatsPageContent = {
    seo: {
        title: 'Résultats & Preuves – Swiss Ecogestes',
        description: 'Performance, résultats et impact concrets. Découvrez nos preuves par l\'exemple.'
    },
    heroTitle: 'Performance, résultats et impact concrets.',
    heroSubtitle: 'Audits, stratégie énergétique et accompagnement pour régies, entreprises, propriétaires et collectivités. Identifiez rapidement vos économies potentielles, les aides disponibles et les actions prioritaires pour améliorer durablement la performance de vos installations.',
    impactStats: impactStatsFr,
    cases: casesFr,
    proofByExample: {
        title: 'Preuves par l\'exemple',
        description: 'Découvrez l\'impact de nos audits sur des bâtiments réels : la situation avant notre intervention, et les résultats après l\'application de nos recommandations concrètes.'
    },
    casesBefore: 'Avant',
    casesAfter: 'Après',
    testimonials: {
        tagline: 'Vous méritez un avis honnête, pas une vente déguisée.',
        title: 'Transparence totale.',
        testimonial: testimonialsFr
    },
    actors: 'Acteurs institutionnels & Normes'
};

const resultatsPageContentEn: ResultatsPageContent = {
    seo: {
        title: 'Results & Proof – Swiss Ecogestes',
        description: 'Performance, results and concrete impact. Discover our proof through examples.'
    },
    heroTitle: 'Performance, results and concrete impact.',
    heroSubtitle: 'Audits, energy strategy and support for property managers, businesses, owners and municipalities. Quickly identify your potential savings, available subsidies and priority actions to sustainably improve the performance of your facilities.',
    impactStats: impactStatsEn,
    cases: casesEn,
    proofByExample: {
        title: 'Proof by example',
        description: 'Discover the impact of our audits on real buildings: the situation before our intervention, and the results after applying our concrete recommendations.'
    },
    casesBefore: 'Before',
    casesAfter: 'After',
    testimonials: {
        tagline: 'You deserve honest advice, not a disguised sales pitch.',
        title: 'Complete transparency.',
        testimonial: testimonialsEn
    },
    actors: 'Institutional Actors & Standards'
};

const resultatsPageContentDe: ResultatsPageContent = {
    seo: {
        title: 'Ergebnisse & Nachweis – Swiss Ecogestes',
        description: 'Leistung, Ergebnisse und konkrete Auswirkungen. Entdecken Sie unsere Nachweise anhand von Beispielen.'
    },
    heroTitle: 'Leistung, Ergebnisse und konkrete Auswirkungen.',
    heroSubtitle: 'Audits, Energiestrategie und Unterstützung für Hausverwaltungen, Unternehmen, Eigentümer und Gemeinden. Identifizieren Sie schnell Ihre potenziellen Einsparungen, verfügbaren Subventionen und vorrangigen Maßnahmen zur nachhaltigen Verbesserung der Leistung Ihrer Anlagen.',
    impactStats: impactStatsDe,
    cases: casesDe,
    proofByExample: {
        title: 'Nachweis anhand von Beispielen',
        description: 'Entdecken Sie die Auswirkungen unserer Audits auf echte Gebäude: die Situation vor unserer Intervention und die Ergebnisse nach der Anwendung unserer konkreten Empfehlungen.'
    },
    casesBefore: 'Vorher',
    casesAfter: 'Nachher',
    testimonials: {
        tagline: 'Sie verdienen ehrliche Beratung, keine verdeckte Verkaufsförderung.',
        title: 'Vollständige Transparenz.',
        testimonial: testimonialsDe
    },
    actors: 'Institutionelle Akteure & Standards'
};

export const getResultatsPageContent = (lang: string): ResultatsPageContent => {
    if (lang.startsWith('de')) return resultatsPageContentDe;
    if (lang.startsWith('en')) return resultatsPageContentEn;
    return resultatsPageContentFr;
};

export const getCases = (lang: string): CaseItem[] => {
    if (lang.startsWith('de')) return casesDe;
    if (lang.startsWith('en')) return casesEn;
    return casesFr;
};

export const getImpactStats = (lang: string): ImpactStat[] => {
    if (lang.startsWith('de')) return impactStatsDe;
    if (lang.startsWith('en')) return impactStatsEn;
    return impactStatsFr;
};
