export interface PageService {
    title: string;
    description: string;
    image: string;
    features?: string[];
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
        title: 'Services pour Entreprises | Audit & Stratégie',
        description: 'Optimisation énergétique pour PME et grandes entreprises. Audits grands consommateurs, optimisation process et bilan carbone.',
        canonical: '/services/entreprise'
    },
    backLink: 'Retour',
    sectionLabel: 'PME & Industries',
    title: 'Performance Énergétique Industrielle',
    description: 'Réduisez vos coûts d\'exploitation et conformez-vous aux nouvelles exigences légales. Swiss Ecogestes accompagne les entreprises dans leur transition vers une production décarbonée et rentable.',
    buttonText: 'Audit pour Entreprise',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000',
    services: [
        {
            title: 'Audit Grands Consommateurs',
            description: 'Pour les entreprises consommant plus de 100\'000 kWh/an. Analyse détaillée et convention d\'objectifs pour l\'exemption de la taxe CO2.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
            features: [
                "Analyse approfondie des flux énergétiques",
                "Convention d'objectifs sur mesure",
                "Exemption de la taxe CO2",
                "Benchmarks sectoriels",
                "Suivi annuel des performances"
            ]
        },
        {
            title: 'Optimisation des Process',
            description: 'Récupération de chaleur, modernisation des systèmes de ventilation et éclairage LED intelligent pour réduire les charges.',
            image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800',
            features: [
                "Récupération de chaleur fatale",
                "Optimisation CVC et air comprimé",
                "Relamping LED intelligent",
                "Pilotage et régulation avancée",
                "Retour sur investissement rapide"
            ]
        }
    ]
};

const entreprisePageContentEn: EntreprisePageContent = {
    seo: {
        title: 'Services for Businesses | Audit & Strategy',
        description: 'Energy optimization for SMEs and large companies. Large consumer audits, process optimization, and carbon footprint.',
        canonical: '/services/entreprise'
    },
    backLink: 'Back',
    sectionLabel: 'SMEs & Industries',
    title: 'Industrial Energy Performance',
    description: 'Reduce operating costs and comply with new legal requirements. Swiss Ecogestes accompanies companies in their transition towards decarbonized and profitable production.',
    buttonText: 'Audit for Business',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000',
    services: [
        {
            title: 'Large Consumer Audit',
            description: 'For companies consuming more than 100,000 kWh/year. Detailed analysis and target agreement for CO2 tax exemption.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
            features: [
                "In-depth analysis of energy flows",
                "Tailor-made target agreement",
                "CO2 tax exemption",
                "Sectoral benchmarks",
                "Annual performance monitoring"
            ]
        },
        {
            title: 'Process Optimization',
            description: 'Heat recovery, modernization of ventilation systems, and intelligent LED lighting to reduce charges.',
            image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800',
            features: [
                "Waste heat recovery",
                "HVAC and compressed air optimization",
                "Intelligent LED relamping",
                "Advanced control and regulation",
                "Fast return on investment"
            ]
        }
    ]
};


const entreprisePageContentDe: EntreprisePageContent = {
    seo: {
        title: 'Dienstleistungen für Unternehmen | Audit & Strategie',
        description: 'Energieoptimierung für KMU und Großunternehmen. Audits für Großverbraucher, Prozessoptimierung und CO2-Bilanz.',
        canonical: '/services/entreprise'
    },
    backLink: 'Zurück',
    sectionLabel: 'KMU & Industrie',
    title: 'Industrielle Energieeffizienz',
    description: 'Senken Sie Ihre Betriebskosten und erfüllen Sie neue gesetzliche Anforderungen. Swiss Ecogestes begleitet Unternehmen bei ihrem Übergang zu einer dekarbonisierten und profitablen Produktion.',
    buttonText: 'Audit für Unternehmen',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000',
    services: [
        {
            title: 'Audit für Großverbraucher',
            description: 'Für Unternehmen mit einem Verbrauch von mehr als 100\'000 kWh/Jahr. Detaillierte Analyse und Zielvereinbarung zur Befreiung von der CO2-Abgabe.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
            features: [
                "Eingehende Analyse der Energieströme",
                "Maßgeschneiderte Zielvereinbarung",
                "Befreiung von der CO2-Abgabe",
                "Branchen-Benchmarks",
                "Jährliche Leistungsüberwachung"
            ]
        },
        {
            title: 'Prozessoptimierung',
            description: 'Wärmerückgewinnung, Modernisierung von Lüftungsanlagen und intelligente LED-Beleuchtung zur Senkung der Nebenkosten.',
            image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800',
            features: [
                "Abwärmenutzung",
                "HLK- und Druckluftoptimierung",
                "Intelligentes LED-Relamping",
                "Fortschrittliche Steuerung und Regelung",
                "Schneller Return on Investment"
            ]
        }
    ]
};

export const getEntreprisePageContent = (lang: string): EntreprisePageContent => {
    if (lang === 'de') return entreprisePageContentDe;
    return lang === 'en' ? entreprisePageContentEn : entreprisePageContentFr;
};
