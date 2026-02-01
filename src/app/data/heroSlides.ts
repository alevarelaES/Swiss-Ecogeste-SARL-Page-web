export interface HeroSlide {
    img: string;
    title: string;
    sub: string;
    features: string[];
    buttonText: string;
    buttonLink: string;
}

const heroSlidesFr: HeroSlide[] = [
    {
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
        title: 'La transition énergétique simple et rentable',
        sub: "Swiss Ecogestes accompagne les propriétaires de villas vers une autonomie durable avec des solutions d'audit et de rénovation haute performance.",
        features: ['Audits CECB', 'Pompes à chaleur', 'Solaire Photovoltaïque'],
        buttonText: 'Solutions pour Villas',
        buttonLink: '/services/villa'
    },
    {
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
        title: 'Partenaire des régies immobilières',
        sub: 'Valorisez votre parc immobilier et anticipez les obligations légales avec nos audits IDC et stratégies de rénovation.',
        features: ['Calcul IDC', 'Audit de Parc', 'Subventions'],
        buttonText: 'Solutions pour Régies',
        buttonLink: '/services/gerance'
    },
    {
        img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070',
        title: 'Performance énergétique industrielle',
        sub: "Réduisez vos coûts d'exploitation et conformez-vous aux nouvelles exigences légales avec nos audits grands consommateurs.",
        features: ['Audit Grands Consommateurs', 'Optimisation Process', 'Exemption taxe CO2'],
        buttonText: 'Solutions pour Entreprises',
        buttonLink: '/services/entreprise'
    },
    {
        img: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=2070',
        title: 'Accompagnement des collectivités',
        sub: 'Swiss Ecogestes soutient les communes et services industriels dans leur stratégie de transition énergétique territoriale.',
        features: ['Audits Territoriaux', 'Sensibilisation Citoyenne', 'Programmes Subventionnés'],
        buttonText: 'Solutions pour Communes',
        buttonLink: '/services/communes'
    }
];

const heroSlidesEn: HeroSlide[] = [
    {
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
        title: 'Energy transition made simple and profitable',
        sub: "Swiss Ecogestes accompanies villa owners towards sustainable autonomy with high-performance audit and renovation solutions.",
        features: ['CECB Audits', 'Heat Pumps', 'Solar Photovoltaic'],
        buttonText: 'Solutions for Villas',
        buttonLink: '/services/villa'
    },
    {
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
        title: 'Partner for Real Estate Agencies',
        sub: 'Enhance your property portfolio and anticipate legal obligations with our IDC audits and renovation strategies.',
        features: ['IDC Calculation', 'Portfolio Audit', 'Subsidies'],
        buttonText: 'Solutions for Agencies',
        buttonLink: '/services/gerance'
    },
    {
        img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070',
        title: 'Industrial Energy Performance',
        sub: "Reduce operating costs and comply with new legal requirements with our large consumer audits.",
        features: ['Large Consumer Audit', 'Process Optimization', 'CO2 Tax Exemption'],
        buttonText: 'Solutions for Businesses',
        buttonLink: '/services/entreprise'
    },
    {
        img: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=2070',
        title: 'Support for Collectivities',
        sub: 'Swiss Ecogestes supports municipalities and industrial services in their territorial energy transition strategy.',
        features: ['Territorial Audits', 'Citizen Awareness', 'Subsidized Programs'],
        buttonText: 'Solutions for Municipalities',
        buttonLink: '/services/communes'
    }
];

const heroSlidesDe: HeroSlide[] = [
    {
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
        title: 'Energiewende einfach und rentabel',
        sub: "Swiss Ecogestes begleitet Villenbesitzer mit leistungsstarken Audit- und Renovierungslösungen in eine nachhaltige Unabhängigkeit.",
        features: ['GEAK Audits', 'Wärmepumpen', 'Photovoltaik'],
        buttonText: 'Lösungen für Villen',
        buttonLink: '/services/villa'
    },
    {
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
        title: 'Partner für Immobilienverwaltungen',
        sub: 'Werten Sie Ihr Immobilienportfolio auf und antizipieren Sie gesetzliche Verpflichtungen mit unseren IDC-Audits und Renovierungsstrategien.',
        features: ['IDC-Berechnung', 'Portfolio-Audit', 'Fördergelder'],
        buttonText: 'Lösungen für Verwaltungen',
        buttonLink: '/services/gerance'
    },
    {
        img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070',
        title: 'Industrielle Energieeffizienz',
        sub: "Senken Sie Betriebskosten und erfüllen Sie neue gesetzliche Anforderungen mit unseren Großverbraucher-Audits.",
        features: ['Großverbraucher-Audit', 'Prozessoptimierung', 'CO2-Abgabenbefreiung'],
        buttonText: 'Lösungen für Unternehmen',
        buttonLink: '/services/entreprise'
    },
    {
        img: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=2070',
        title: 'Unterstützung für Gemeinden',
        sub: 'Swiss Ecogestes unterstützt Gemeinden und Industriedienste bei ihrer kommunalen Energiewende-Strategie.',
        features: ['Kommunale Audits', 'Bürgersensibilisierung', 'Geförderte Programme'],
        buttonText: 'Lösungen für Gemeinden',
        buttonLink: '/services/communes'
    }
];

export const getHeroSlides = (lang: string): HeroSlide[] => {
    if (lang.startsWith('de')) return heroSlidesDe;
    return lang.startsWith('en') ? heroSlidesEn : heroSlidesFr;
};
