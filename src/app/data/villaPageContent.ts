export interface PageService {
    title: string;
    description: string;
    image: string;
    features?: string[];
    note?: string;
}

export interface VillaPageContent {
    seo: {
        title: string;
        description: string;
        canonical: string;
    };
    backLink: string;
    sectionLabel: string;
    title: string;
    description: string;
    heroImage: string;
    buttonText: string;
    buttonLink: string;
    services: PageService[];
}

const villaPageContentFr: VillaPageContent = {
    seo: {
        title: 'Services pour Villas & Maisons | Visite SIG, CECB & IDC',
        description: 'Solutions énergétiques pour propriétaires de villas. Visite Villa SIG, audit chauffage gratuit, calcul IDC, CECB et audit sur mesure.',
        canonical: '/services/villa'
    },
    backLink: 'Retour',
    sectionLabel: 'Villas & Maisons',
    title: 'Expertise Villa & Maison',
    description: 'Nous accompagnons les propriétaires dans l\'optimisation énergétique de leur habitat, en identifiant des économies concrètes, en maximisant les subventions disponibles et en proposant des solutions de rénovation pertinentes pour augmenter durablement la valeur du bien.',
    buttonText: 'Lancer mon projet',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
    services: [
        {
            title: 'Visite Villa SIG',
            description: 'Un audit complet pour identifier rapidement les économies possibles et les améliorations les plus pertinentes pour votre maison.',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
            features: [
                'Analyse et optimisation des consommations',
                'Installation de matériel efficient',
                'Identification des mesures d\'assainissement',
                'Diagnostic de la chaudière',
                'Étude de faisabilité solaire photovoltaïque',
                'Conseils pratiques sur l\'isolation et les écogestes',
                'Jusqu\'à 80 % subventionné'
            ]
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
            description: 'Pilotez la performance énergétique de votre bâtiment en toute conformité. Nous réalisons le calcul IDC afin de vous donner une vision claire de vos consommations et d\'identifier rapidement les éventuels besoins d\'action.',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800',
            features: [
                'Calcul précis et certifié',
                'Respect des obligations légales',
                'Vision claire de la performance énergétique'
            ]
        },
        {
            title: 'CECB & CECB+',
            description: 'Analyse officielle de l\'étiquette énergétique de votre bâtiment. Le CECB+ inclut un rapport de conseil complet avec scénarios de rénovation chiffrés.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
            features: [
                'Analyse complète de l\'enveloppe thermique',
                'Étiquette énergétique officielle (A à G)',
                'Rapport de conseil avec scénarios de travaux',
                'Estimation des coûts et des subventions',
                'Accompagnement administratif complet'
            ]
        },
        {
            title: 'Audit sur Mesure',
            description: 'Une approche flexible pour répondre précisément à vos besoins.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
            features: [
                'Prestation adaptée à votre projet',
                'Analyse ciblée selon vos priorités',
                'Recommandations personnalisées',
                'Actions proposées selon votre budget et objectifs',
                'Accompagnement sur mesure'
            ]
        }
    ]
};

const villaPageContentEn: VillaPageContent = {
    seo: {
        title: 'Villa & House Services | SIG Visit, CECB & IDC',
        description: 'Energy solutions for villa owners. SIG villa visit, free heating audit, IDC calculation, CECB, and custom audit.',
        canonical: '/services/villa'
    },
    backLink: 'Back',
    sectionLabel: 'Villas & Houses',
    title: 'Villa & House Expertise',
    description: 'We support homeowners in optimizing their home\'s energy performance, identifying concrete savings, maximizing available subsidies, and proposing relevant renovation solutions to sustainably increase property value.',
    buttonText: 'Start my project',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
    services: [
        {
            title: 'SIG Villa Visit',
            description: 'A comprehensive audit to quickly identify possible savings and the most relevant improvements for your home.',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
            features: [
                'Consumption analysis and optimization',
                'Installation of efficient equipment',
                'Identification of remediation measures',
                'Boiler diagnosis',
                'Solar photovoltaic feasibility study',
                'Practical advice on insulation and ecogestures',
                'Up to 80% subsidized'
            ]
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
            description: 'Manage your building\'s energy performance in full compliance. We perform the IDC calculation to give you a clear view of your consumption and quickly identify any need for action.',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800',
            features: [
                'Precise and certified calculation',
                'Compliance with legal obligations',
                'Clear view of energy performance'
            ]
        },
        {
            title: 'CECB & CECB+',
            description: 'Official analysis of your building\'s energy label. CECB+ includes a complete advisory report with quantified renovation scenarios.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
            features: [
                'Complete thermal envelope analysis',
                'Official energy label (A to G)',
                'Advisory report with work scenarios',
                'Cost and subsidy estimation',
                'Complete administrative support'
            ]
        },
        {
            title: 'Custom Audit',
            description: 'A flexible approach to precisely meet your needs.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
            features: [
                'Service adapted to your project',
                'Targeted analysis according to your priorities',
                'Personalized recommendations',
                'Actions proposed according to your budget and goals',
                'Tailored support'
            ]
        }
    ]
};

const villaPageContentDe: VillaPageContent = {
    seo: {
        title: 'Dienstleistungen für Villen & Häuser | SIG-Besuch, CECB & IDC',
        description: 'Energielösungen für Villenbesitzer. SIG-Villenbesuch, kostenloser Heizungsaudit, IDC-Berechnung, CECB und maßgeschneiderter Audit.',
        canonical: '/services/villa'
    },
    backLink: 'Zurück',
    sectionLabel: 'Villen & Häuser',
    title: 'Villa & Haus Expertise',
    description: 'Wir begleiten Eigentümer bei der energetischen Optimierung ihres Hauses, identifizieren konkrete Einsparungen, maximieren verfügbare Fördermittel und schlagen relevante Renovierungslösungen vor, um den Immobilienwert nachhaltig zu steigern.',
    buttonText: 'Projekt starten',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
    services: [
        {
            title: 'SIG-Villenbesuch',
            description: 'Ein umfassendes Audit zur schnellen Identifizierung möglicher Einsparungen und der relevantesten Verbesserungen für Ihr Haus.',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
            features: [
                'Verbrauchsanalyse und -optimierung',
                'Installation effizienter Geräte',
                'Identifizierung von Sanierungsmaßnahmen',
                'Kesseldiagnose',
                'Machbarkeitsstudie für Solarphotovoltaik',
                'Praktische Beratung zu Dämmung und Ökogesten',
                'Bis zu 80 % subventioniert'
            ]
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
            description: 'Steuern Sie die Energieeffizienz Ihres Gebäudes vollständig konform. Wir führen die IDC-Berechnung durch, um Ihnen einen klaren Überblick über Ihren Verbrauch zu geben und eventuelle Handlungsbedarfe schnell zu identifizieren.',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800',
            features: [
                'Präzise und zertifizierte Berechnung',
                'Einhaltung gesetzlicher Verpflichtungen',
                'Klarer Überblick über die Energieeffizienz'
            ]
        },
        {
            title: 'CECB & CECB+',
            description: 'Offizielle Analyse des Energieausweises Ihres Gebäudes. CECB+ beinhaltet einen vollständigen Beratungsbericht mit quantifizierten Renovierungsszenarien.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
            features: [
                'Vollständige Analyse der thermischen Hülle',
                'Offizielles Energielabel (A bis G)',
                'Beratungsbericht mit Arbeitsszenarien',
                'Schätzung von Kosten und Subventionen',
                'Umfassende administrative Unterstützung'
            ]
        },
        {
            title: 'Maßgeschneidertes Audit',
            description: 'Ein flexibler Ansatz, um Ihren Bedürfnissen präzise zu entsprechen.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
            features: [
                'An Ihr Projekt angepasste Leistung',
                'Gezielte Analyse nach Ihren Prioritäten',
                'Personalisierte Empfehlungen',
                'Maßnahmen entsprechend Ihrem Budget und Ihren Zielen',
                'Maßgeschneiderte Begleitung'
            ]
        }
    ]
};

export const getVillaPageContent = (lang: string): VillaPageContent => {
    if (lang === 'de') return villaPageContentDe;
    return lang === 'en' ? villaPageContentEn : villaPageContentFr;
};
