export interface PageService {
    title: string;
    description: string;
    image: string;
    features?: string[];
    note?: string;
}

export interface EntreprisePageContent {
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

const entreprisePageContentFr: EntreprisePageContent = {
    seo: {
        title: 'Services pour Entreprises | Visite SIG, PEIK & Audit',
        description: 'Optimisation énergétique pour PME et entreprises. Visite Conseil SIG, Audit PEIK, audit chauffage et calcul IDC.',
        canonical: '/services/entreprise'
    },
    backLink: 'Retour',
    sectionLabel: 'Entreprises',
    title: 'Performance Énergétique Entreprise',
    description: 'Nos audits permettent d\'identifier rapidement des leviers d\'économie, de réduire les coûts d\'exploitation et d\'assurer la conformité aux exigences légales, avec des recommandations concrètes et des subventions intéressantes.',
    buttonText: 'Audit pour Entreprise',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000',
    services: [
        {
            title: 'Visite Conseil (gratuite)*',
            description: 'Une première analyse gratuite pour repérer les actions simples et rentables permettant de réduire vos consommations et vos coûts.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
            features: [
                'Analyse rapide',
                'Conseils ciblés',
                'Économies immédiates',
                'Matériel efficient',
                'Gratuite*'
            ],
            note: '* Sous conditions'
        },
        {
            title: 'Visite Expertise',
            description: 'Une analyse plus approfondie de vos installations et de vos usages pour identifier les optimisations et prioriser les actions à fort impact.',
            image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800',
            features: [
                'Diagnostic approfondi',
                'Recommandations ciblées',
                'Priorisation des actions',
                'Aides disponibles',
                'Subventionnée'
            ]
        },
        {
            title: 'Audit PEIK',
            description: 'Pour les entreprises consommant plus de 100\'000 kWh/an. Un audit énergétique structuré qui permet d\'évaluer précisément vos consommations, de chiffrer les économies potentielles et de définir un plan d\'action clair et rentable.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800',
            features: [
                'Diagnostic complet',
                'Mesures prioritaires',
                'Économies chiffrées',
                'Plan d\'action clair',
                '50 % à 70 % subventionné'
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
            description: 'Pilotez la performance énergétique de votre bâtiment en toute conformité. Nous réalisons le calcul IDC afin de vous donner une vision claire de vos consommations.',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800',
            features: [
                'Calcul précis et certifié',
                'Respect des obligations légales',
                'Vision claire de la performance énergétique'
            ]
        },
        {
            title: 'Audit sur Mesure',
            description: 'Une analyse ciblée selon vos enjeux réels pour concentrer vos efforts sur les leviers les plus pertinents.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
            features: [
                'Besoins spécifiques',
                'Analyse ciblée',
                'Actions concrètes',
                'Suivi personnalisé'
            ]
        }
    ]
};

const entreprisePageContentEn: EntreprisePageContent = {
    seo: {
        title: 'Services for Businesses | SIG Visit, PEIK & Audit',
        description: 'Energy optimization for SMEs and businesses. Free SIG advisory visit, PEIK audit, heating audit, and IDC calculation.',
        canonical: '/services/entreprise'
    },
    backLink: 'Back',
    sectionLabel: 'Companies',
    title: 'Business Energy Performance',
    description: 'Our audits quickly identify savings levers, reduce operating costs and ensure compliance with legal requirements, with concrete recommendations and attractive subsidies.',
    buttonText: 'Audit for Business',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000',
    services: [
        {
            title: 'Advisory Visit (free)*',
            description: 'A free initial analysis to identify simple and cost-effective actions to reduce your consumption and costs.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
            features: [
                'Quick analysis',
                'Targeted advice',
                'Immediate savings',
                'Efficient equipment',
                'Free of charge*'
            ],
            note: '* Subject to conditions'
        },
        {
            title: 'Expertise Visit',
            description: 'A more in-depth analysis of your installations and usage to identify optimizations and prioritize high-impact actions.',
            image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800',
            features: [
                'In-depth diagnosis',
                'Targeted recommendations',
                'Action prioritization',
                'Available aids',
                'Subsidized'
            ]
        },
        {
            title: 'PEIK Audit',
            description: 'For companies consuming more than 100,000 kWh/year. A structured energy audit to precisely assess your consumption, quantify potential savings, and define a clear and profitable action plan.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800',
            features: [
                'Complete diagnosis',
                'Priority measures',
                'Quantified savings',
                'Clear action plan',
                '50% to 70% subsidized'
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
            description: 'Manage your building\'s energy performance in full compliance. We perform the IDC calculation to give you a clear view of your consumption.',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800',
            features: [
                'Precise and certified calculation',
                'Compliance with legal obligations',
                'Clear view of energy performance'
            ]
        },
        {
            title: 'Custom Audit',
            description: 'A targeted analysis based on your real challenges to focus your efforts on the most relevant levers.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
            features: [
                'Specific needs',
                'Targeted analysis',
                'Concrete actions',
                'Personalized follow-up'
            ]
        }
    ]
};

const entreprisePageContentDe: EntreprisePageContent = {
    seo: {
        title: 'Dienstleistungen für Unternehmen | SIG-Besuch, PEIK & Audit',
        description: 'Energieoptimierung für KMU und Unternehmen. Kostenloser SIG-Beratungsbesuch, PEIK-Audit, Heizungsaudit und IDC-Berechnung.',
        canonical: '/services/entreprise'
    },
    backLink: 'Zurück',
    sectionLabel: 'Unternehmen',
    title: 'Energieeffizienz für Unternehmen',
    description: 'Unsere Audits identifizieren schnell Einsparmöglichkeiten, senken Betriebskosten und gewährleisten die Einhaltung gesetzlicher Anforderungen — mit konkreten Empfehlungen und attraktiven Fördermitteln.',
    buttonText: 'Audit für Unternehmen',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000',
    services: [
        {
            title: 'Beratungsbesuch (kostenlos)*',
            description: 'Eine kostenlose Erstanalyse, um einfache und kostengünstige Maßnahmen zur Reduzierung Ihres Verbrauchs und Ihrer Kosten zu identifizieren.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
            features: [
                'Schnelle Analyse',
                'Gezielte Beratung',
                'Sofortige Einsparungen',
                'Effiziente Geräte',
                'Kostenlos*'
            ],
            note: '* Unter Bedingungen'
        },
        {
            title: 'Expertenbesuch',
            description: 'Eine eingehendere Analyse Ihrer Anlagen und Ihrer Nutzung, um Optimierungen zu identifizieren und Maßnahmen mit hoher Wirkung zu priorisieren.',
            image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800',
            features: [
                'Eingehende Diagnose',
                'Gezielte Empfehlungen',
                'Maßnahmenpriorisierung',
                'Verfügbare Fördermittel',
                'Subventioniert'
            ]
        },
        {
            title: 'PEIK-Audit',
            description: 'Für Unternehmen mit einem Verbrauch von mehr als 100\'000 kWh/Jahr. Ein strukturiertes Energieaudit zur genauen Bewertung Ihres Verbrauchs, Quantifizierung von Einsparmöglichkeiten und Definition eines klaren Aktionsplans.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800',
            features: [
                'Vollständige Diagnose',
                'Prioritäre Maßnahmen',
                'Quantifizierte Einsparungen',
                'Klarer Aktionsplan',
                '50 % bis 70 % subventioniert'
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
            description: 'Steuern Sie die Energieeffizienz Ihres Gebäudes vollständig konform. Wir führen die IDC-Berechnung durch, um Ihnen einen klaren Überblick über Ihren Verbrauch zu geben.',
            image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800',
            features: [
                'Präzise und zertifizierte Berechnung',
                'Einhaltung gesetzlicher Verpflichtungen',
                'Klarer Überblick über die Energieeffizienz'
            ]
        },
        {
            title: 'Maßgeschneidertes Audit',
            description: 'Eine gezielte Analyse auf Basis Ihrer tatsächlichen Herausforderungen, um Ihre Bemühungen auf die relevantesten Hebel zu konzentrieren.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
            features: [
                'Spezifische Bedürfnisse',
                'Gezielte Analyse',
                'Konkrete Maßnahmen',
                'Personalisierte Nachverfolgung'
            ]
        }
    ]
};

export const getEntreprisePageContent = (lang: string): EntreprisePageContent => {
    if (lang === 'de') return entreprisePageContentDe;
    return lang === 'en' ? entreprisePageContentEn : entreprisePageContentFr;
};
