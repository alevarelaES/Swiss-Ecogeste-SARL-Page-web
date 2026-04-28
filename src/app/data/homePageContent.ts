import { LucideIcon, Landmark, FileText, Scale, Handshake, Zap, Leaf, Users, Building2 } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// HERO SLIDES
// ─────────────────────────────────────────────────────────────────────────────

export interface HeroSlide {
    img: string;
    title: string;
    sub: string;
    features: string[];
    buttonText: string;
    buttonLink: string;
    isMain?: boolean;
    label?: string;
    description?: string;
    featuresLabel?: string;
    secondButtonText?: string;
    secondButtonLink?: string;
}

const heroSlidesFr: HeroSlide[] = [
    {
        isMain: true,
        label: 'Swiss Ecogeste',
        img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2074',
        title: 'Réduisez vos coûts énergétiques et passez aux bonnes actions.',
        sub: 'Audits, stratégie énergétique et accompagnement pour régies, entreprises, propriétaires et collectivités en Suisse romande.',
        description: 'Identifiez rapidement vos économies potentielles, les aides disponibles et les actions prioritaires pour améliorer durablement la performance de vos installations et bâtiments.',
        featuresLabel: 'Une approche concrète, neutre et orientée résultats.',
        features: ['Recommandations indépendantes', 'Solutions adaptées', 'Aides et subventions', 'Expertise terrain'],
        buttonText: 'Découvrir nos solutions',
        buttonLink: '#nos-solutions',
        secondButtonText: 'Estimer mes économies',
        secondButtonLink: '/contact',
    },
    {
        label: 'Régies & Immeubles',
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
        title: 'Partenaire des régies immobilières',
        sub: 'Valorisez votre parc immobilier et anticipez les obligations légales avec nos audits IDC et stratégies de rénovation.',
        features: ['Calcul IDC', 'Audit de Parc', 'Subventions'],
        buttonText: 'Solutions pour Régies',
        buttonLink: '/services/gerance',
    },
    {
        label: 'Entreprises',
        img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070',
        title: 'Performance énergétique industrielle',
        sub: "Réduisez vos coûts d'exploitation et conformez-vous aux nouvelles exigences légales avec nos audits grands consommateurs.",
        features: ['Audit Grands Consommateurs', 'Optimisation Process', 'Exemption taxe CO2'],
        buttonText: 'Solutions pour Entreprises',
        buttonLink: '/services/entreprise',
    },
    {
        label: 'Villas & Maisons',
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
        title: 'La transition énergétique simple et rentable',
        sub: "Swiss Ecogestes accompagne les propriétaires de villas et maisons vers une autonomie durable avec des solutions d'audit et de rénovation haute performance.",
        features: ['Audits CECB', 'Pompes à chaleur', 'Solaire Photovoltaïque'],
        buttonText: 'Solutions pour Villas & Maisons',
        buttonLink: '/services/villa',
    },
    {
        label: 'Communes & GRD',
        img: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=2070',
        title: 'Accompagnement des collectivités',
        sub: 'Swiss Ecogestes soutient les communes et services industriels dans leur stratégie de transition énergétique territoriale.',
        features: ['Audits Territoriaux', 'Sensibilisation Citoyenne', 'Programmes Subventionnés'],
        buttonText: 'Solutions pour Communes',
        buttonLink: '/services/communes',
    },
];

const heroSlidesEn: HeroSlide[] = [
    {
        isMain: true,
        label: 'Swiss Ecogeste',
        img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2074',
        title: 'Reduce your energy costs and take the right actions.',
        sub: 'Energy audits, strategy and support for property managers, businesses, owners and municipalities in French-speaking Switzerland.',
        description: 'Quickly identify your savings potential, available subsidies and priority actions to sustainably improve the performance of your installations and buildings.',
        featuresLabel: 'A concrete, neutral and results-oriented approach.',
        features: ['Independent recommendations', 'Tailored solutions', 'Grants & subsidies', 'Field expertise'],
        buttonText: 'Discover our solutions',
        buttonLink: '#nos-solutions',
        secondButtonText: 'Estimate my savings',
        secondButtonLink: '/contact',
    },
    {
        label: 'Real Estate',
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
        title: 'Partner for Real Estate Agencies',
        sub: 'Enhance your property portfolio and anticipate legal obligations with our IDC audits and renovation strategies.',
        features: ['IDC Calculation', 'Portfolio Audit', 'Subsidies'],
        buttonText: 'Solutions for Agencies',
        buttonLink: '/services/gerance',
    },
    {
        label: 'Companies',
        img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070',
        title: 'Industrial Energy Performance',
        sub: 'Reduce operating costs and comply with new legal requirements with our large consumer audits.',
        features: ['Large Consumer Audit', 'Process Optimization', 'CO2 Tax Exemption'],
        buttonText: 'Solutions for Businesses',
        buttonLink: '/services/entreprise',
    },
    {
        label: 'Villas & Houses',
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
        title: 'Energy transition made simple and profitable',
        sub: 'Swiss Ecogestes accompanies villa and house owners towards sustainable autonomy with high-performance audit and renovation solutions.',
        features: ['CECB Audits', 'Heat Pumps', 'Solar Photovoltaic'],
        buttonText: 'Solutions for Villas & Houses',
        buttonLink: '/services/villa',
    },
    {
        label: 'Municipalities',
        img: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=2070',
        title: 'Support for Collectivities',
        sub: 'Swiss Ecogestes supports municipalities and industrial services in their territorial energy transition strategy.',
        features: ['Territorial Audits', 'Citizen Awareness', 'Subsidized Programs'],
        buttonText: 'Solutions for Municipalities',
        buttonLink: '/services/communes',
    },
];

const heroSlidesDe: HeroSlide[] = [
    {
        isMain: true,
        label: 'Swiss Ecogeste',
        img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2074',
        title: 'Senken Sie Ihre Energiekosten und ergreifen Sie die richtigen Maßnahmen.',
        sub: 'Energieaudits, Strategie und Begleitung für Immobilienverwaltungen, Unternehmen, Eigentümer und Gemeinden in der Westschweiz.',
        description: 'Identifizieren Sie schnell Ihre Einsparpotenziale, verfügbaren Fördergelder und Prioritätsmaßnahmen zur dauerhaften Verbesserung Ihrer Anlagen und Gebäude.',
        featuresLabel: 'Ein konkreter, neutraler und ergebnisorientierter Ansatz.',
        features: ['Unabhängige Empfehlungen', 'Maßgeschneiderte Lösungen', 'Fördergelder & Subventionen', 'Felderfahrung'],
        buttonText: 'Unsere Lösungen entdecken',
        buttonLink: '#nos-solutions',
        secondButtonText: 'Meine Einsparungen schätzen',
        secondButtonLink: '/contact',
    },
    {
        label: 'Immobilien',
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
        title: 'Partner für Immobilienverwaltungen',
        sub: 'Werten Sie Ihr Immobilienportfolio auf und antizipieren Sie gesetzliche Verpflichtungen mit unseren IDC-Audits und Renovierungsstrategien.',
        features: ['IDC-Berechnung', 'Portfolio-Audit', 'Fördergelder'],
        buttonText: 'Lösungen für Verwaltungen',
        buttonLink: '/services/gerance',
    },
    {
        label: 'Unternehmen',
        img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070',
        title: 'Industrielle Energieeffizienz',
        sub: 'Senken Sie Betriebskosten und erfüllen Sie neue gesetzliche Anforderungen mit unseren Großverbraucher-Audits.',
        features: ['Großverbraucher-Audit', 'Prozessoptimierung', 'CO2-Abgabenbefreiung'],
        buttonText: 'Lösungen für Unternehmen',
        buttonLink: '/services/entreprise',
    },
    {
        label: 'Villen & Häuser',
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
        title: 'Energiewende einfach und rentabel',
        sub: 'Swiss Ecogestes begleitet Villen- und Hausbesitzer mit leistungsstarken Audit- und Renovierungslösungen in eine nachhaltige Unabhängigkeit.',
        features: ['GEAK Audits', 'Wärmepumpen', 'Photovoltaik'],
        buttonText: 'Lösungen für Villen & Häuser',
        buttonLink: '/services/villa',
    },
    {
        label: 'Gemeinden',
        img: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=2070',
        title: 'Unterstützung für Gemeinden',
        sub: 'Swiss Ecogestes unterstützt Gemeinden und Industriedienste bei ihrer kommunalen Energiewende-Strategie.',
        features: ['Kommunale Audits', 'Bürgersensibilisierung', 'Geförderte Programme'],
        buttonText: 'Lösungen für Gemeinden',
        buttonLink: '/services/communes',
    },
];

export const getHeroSlides = (lang: string): HeroSlide[] => {
    if (lang.startsWith('de')) return heroSlidesDe;
    return lang.startsWith('en') ? heroSlidesEn : heroSlidesFr;
};

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT (section homepage)
// ─────────────────────────────────────────────────────────────────────────────

export interface AboutContent {
    sectionLabel: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    values: { title: string; subtitle: string }[];
    ctaText: string;
    ctaLink: string;
    quote: string;
    quoteAuthor: string;
    image: string;
}

const aboutContentFr: AboutContent = {
    sectionLabel: 'Pourquoi Swiss Ecogestes',
    title: 'Vous méritez un avis honnête, pas une vente déguisée.',
    paragraph1: "Notre seul intérêt : que vous économisiez. Pas de matériel à vendre, pas de marges cachées. Juste votre intérêt, en priorité.",
    paragraph2: "",
    values: [
        { title: 'Neutre',    subtitle: 'Recommandations indépendantes, sans intérêt commercial' },
        { title: 'Proximité', subtitle: 'Expertise terrain, ancrage local en Suisse romande' },
        { title: 'Efficacité', subtitle: 'Actions concrètes, résultats mesurables' },
    ],
    ctaText: 'Découvrir notre ADN',
    ctaLink: '/a-propos',
    quote: "Grâce à Swiss Ecogestes, j'ai pu réduire mes charges et identifier des aides que je ne connaissais pas.",
    quoteAuthor: 'Marc D. — Propriétaire, Genève',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000',
};

const aboutContentEn: AboutContent = {
    sectionLabel: 'Why Swiss Ecogestes',
    title: 'You deserve honest advice, not a disguised sales pitch.',
    paragraph1: "Our only interest: your savings. No equipment to sell, no hidden margins. Just your interest, as a priority.",
    paragraph2: "",
    values: [
        { title: 'Neutral',    subtitle: 'Independent recommendations, no commercial interest' },
        { title: 'Proximity',  subtitle: 'Field expertise, local presence in French-speaking Switzerland' },
        { title: 'Efficiency', subtitle: 'Concrete actions, measurable results' },
    ],
    ctaText: 'Discover our DNA',
    ctaLink: '/a-propos',
    quote: "Thanks to Swiss Ecogestes, I was able to reduce my costs and find subsidies I didn't even know existed.",
    quoteAuthor: 'Marc D. — Property owner, Geneva',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000',
};

const aboutContentDe: AboutContent = {
    sectionLabel: 'Warum Swiss Ecogestes',
    title: 'Sie verdienen einen ehrlichen Rat, keinen verdeckten Verkauf.',
    paragraph1: "Unser einziges Interesse: Ihre Einsparungen. Kein Material zu verkaufen, keine versteckten Margen. Nur Ihr Interesse, als Priorität.",
    paragraph2: "",
    values: [
        { title: 'Neutral',   subtitle: 'Unabhängige Empfehlungen, kein kommerzielles Interesse' },
        { title: 'Nähe',      subtitle: 'Vor-Ort-Expertise, lokale Präsenz in der Westschweiz' },
        { title: 'Effizienz', subtitle: 'Konkrete Maßnahmen, messbare Ergebnisse' },
    ],
    ctaText: 'Entdecken Sie unsere DNA',
    ctaLink: '/a-propos',
    quote: "Dank Swiss Ecogestes konnte ich meine Kosten senken und Fördermittel finden, von denen ich nichts wusste.",
    quoteAuthor: 'Marc D. — Eigentümer, Genf',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000',
};

export const getAboutContent = (lang: string): AboutContent => {
    if (lang.startsWith('de')) return aboutContentDe;
    return lang.startsWith('en') ? aboutContentEn : aboutContentFr;
};

// ─────────────────────────────────────────────────────────────────────────────
// STATS
// ─────────────────────────────────────────────────────────────────────────────

export interface Stat {
    id: number;
    value?: number;
    text?: string;
    prefix?: string;
    suffix?: string;
    label: string;
    icon: LucideIcon;
}

const statsFr: Stat[] = [
    { id: 1, value: 50, prefix: "Jusqu'à ", suffix: "%",    label: "De Subventions",             icon: Zap },
    { id: 2, value: 20, prefix: "10 à ",    suffix: "%",    label: "D'économies d'énergie",       icon: Leaf },
    { id: 3, value: 2,  prefix: "≈ ",       suffix: " ans", label: "Retour sur investissement",   icon: Users },
    { id: 4, text: "Reconnus",                               label: "Partenaires Institutionnels", icon: Building2 },
];

const statsEn: Stat[] = [
    { id: 1, value: 50, prefix: "Up to ",  suffix: "%",      label: "Subsidies",               icon: Zap },
    { id: 2, value: 20, prefix: "10 to ",  suffix: "%",      label: "Energy Savings",          icon: Leaf },
    { id: 3, value: 2,  prefix: "≈ ",      suffix: " years", label: "Return on Investment",    icon: Users },
    { id: 4, text: "Recognized",                              label: "Institutional Partners",  icon: Building2 },
];

const statsDe: Stat[] = [
    { id: 1, value: 50, prefix: "Bis zu ",  suffix: "%",      label: "Subventionen",            icon: Zap },
    { id: 2, value: 20, prefix: "10 bis ",  suffix: "%",      label: "Energieeinsparung",       icon: Leaf },
    { id: 3, value: 2,  prefix: "≈ ",       suffix: " Jahre", label: "Kapitalrendite",          icon: Users },
    { id: 4, text: "Anerkannt",                                label: "Institutionelle Partner", icon: Building2 },
];

export const getStats = (lang: string): Stat[] => {
    if (lang === 'de') return statsDe;
    return lang === 'en' ? statsEn : statsFr;
};

export interface StatsContent {
    label: string;
    title: string;
    description: string;
}

const statsContentFr: StatsContent = {
    label: "Chiffres Clés",
    title: "Performance, résultats et impact concrets",
    description: "Des résultats mesurables pour votre portefeuille et pour l'environnement suisse.",
};
const statsContentEn: StatsContent = {
    label: "Key Figures",
    title: "Performance, results and concrete impact",
    description: "Measurable results for your wallet and for the Swiss environment.",
};
const statsContentDe: StatsContent = {
    label: "Kennzahlen",
    title: "Leistung, Ergebnisse und konkreter Impact",
    description: "Messbare Ergebnisse für Ihren Geldbeutel und für die Schweizer Umwelt.",
};

export const getStatsContent = (lang: string): StatsContent => {
    if (lang === 'de') return statsContentDe;
    return lang === 'en' ? statsContentEn : statsContentFr;
};

// ─────────────────────────────────────────────────────────────────────────────
// WHY CHOOSE US
// ─────────────────────────────────────────────────────────────────────────────

export interface WhyChooseUsReason {
    icon: LucideIcon;
    title: string;
    description: string;
}

export interface WhyChooseUsContent {
    sectionLabel: string;
    title: string;
    titleHighlight: string;
    description: string;
    reasons: WhyChooseUsReason[];
}

const whyChooseUsContentFr: WhyChooseUsContent = {
    sectionLabel: 'Nos Valeurs',
    title: 'Pourquoi choisir',
    titleHighlight: 'Swiss Ecogestes ?',
    description: "Au-delà de l'expertise technique, nous apportons une sécurité et une tranquillité d'esprit à tous nos partenaires.",
    reasons: [
        { icon: Landmark, title: 'Crédibilité Institutionnelle', description: 'Partenaire reconnu par les SIG, le canton et les programmes officiels de subvention.' },
        { icon: FileText, title: 'Gestion Administrative',       description: "Nous prenons en charge 100% des démarches pour l'obtention de vos subventions." },
        { icon: Scale,    title: 'Neutralité Commerciale',       description: "Des conseils objectifs et indépendants, sans conflit d'intérêt avec les installateurs." },
        { icon: Handshake, title: 'Approche Humaine',            description: 'Une pédagogie bienveillante pour vous accompagner à chaque étape du projet.' },
    ],
};

const whyChooseUsContentEn: WhyChooseUsContent = {
    sectionLabel: 'Our Values',
    title: 'Why Choose',
    titleHighlight: 'Swiss Ecogestes?',
    description: 'Beyond technical expertise, we bring security and peace of mind to all our partners.',
    reasons: [
        { icon: Landmark,  title: 'Institutional Credibility', description: 'Partner recognized by SIG, the canton, and official subsidy programs.' },
        { icon: FileText,  title: 'Administrative Management', description: 'We take care of 100% of the procedures for obtaining your subsidies.' },
        { icon: Scale,     title: 'Commercial Neutrality',     description: 'Objective and independent advice, with no conflict of interest with installers.' },
        { icon: Handshake, title: 'Human Approach',            description: 'Benevolent pedagogy to accompany you at every step of the project.' },
    ],
};

const whyChooseUsContentDe: WhyChooseUsContent = {
    sectionLabel: 'Unsere Werte',
    title: 'Warum',
    titleHighlight: 'Swiss Ecogestes wählen?',
    description: 'Jenseits technischer Expertise bringen wir allen unseren Partnern Sicherheit und Seelenfrieden.',
    reasons: [
        { icon: Landmark,  title: 'Institutionelle Glaubwürdigkeit', description: 'Partner anerkannt von SIG, dem Kanton und offiziellen Subventionsprogrammen.' },
        { icon: FileText,  title: 'Administrative Verwaltung',        description: 'Wir übernehmen 100% der Schritte zur Erlangung Ihrer Subventionen.' },
        { icon: Scale,     title: 'Kommerzielle Neutralität',         description: 'Objektive und unabhängige Beratung, ohne Interessenkonflikt mit Installateuren.' },
        { icon: Handshake, title: 'Menschlicher Ansatz',              description: 'Eine wohlwollende Pädagogik, um Sie bei jedem Schritt des Projekts zu begleiten.' },
    ],
};

export const getWhyChooseUsContent = (lang: string): WhyChooseUsContent => {
    if (lang === 'de') return whyChooseUsContentDe;
    return lang === 'en' ? whyChooseUsContentEn : whyChooseUsContentFr;
};

// ─────────────────────────────────────────────────────────────────────────────
// CLIENT TYPES (cartes Nos Solutions)
// ─────────────────────────────────────────────────────────────────────────────

export interface ClientType {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    link: string;
    image: string;
}

const clientTypesFr: ClientType[] = [
    { id: 'regies',     title: 'Régies & Immeubles',    subtitle: 'Gestionnaires', description: "Valorisez votre parc et anticipez les obligations légales.",                                                              link: '/services/gerance',    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },
    { id: 'entreprises', title: 'Entreprises & PME',    subtitle: 'Professionnels', description: "Optimisez votre consommation et réduisez vos coûts d'exploitation avec nos audits (PEIK).",                           link: '/services/entreprise', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800' },
    { id: 'villas',     title: 'Propriétaires de Villas', subtitle: 'Particuliers', description: "Rénovez votre bien et profitez des subventions cantonales pour améliorer l'efficacité énergétique de votre maison.", link: '/services/villa',      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800' },
    { id: 'communes',   title: 'Communes & GRD',        subtitle: 'Collectivités', description: "Accompagnez vos citoyens et atteignez vos objectifs climatiques avec nos programmes de transition énergétique.",       link: '/services/communes',   image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800' },
];

const clientTypesEn: ClientType[] = [
    { id: 'regies',      title: 'Real Estate & Buildings', subtitle: 'Managers',       description: "Enhance your property portfolio and anticipate legal obligations.",                                                         link: '/services/gerance',    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },
    { id: 'entreprises', title: 'Businesses & SMEs',       subtitle: 'Professionals',  description: "Optimize your consumption and reduce operating costs with our audits (PEIK).",                                            link: '/services/entreprise', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800' },
    { id: 'villas',      title: 'Villa Owners',             subtitle: 'Individuals',    description: "Renovate your property and benefit from cantonal subsidies to improve your home's energy efficiency.",                   link: '/services/villa',      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800' },
    { id: 'communes',    title: 'Municipalities & DSOs',    subtitle: 'Collectivities', description: "Support your citizens and achieve your climate goals with our energy transition programmes.",                            link: '/services/communes',   image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800' },
];

const clientTypesDe: ClientType[] = [
    { id: 'regies',      title: 'Immobilien & Liegenschaften', subtitle: 'Verwalter',         description: "Werten Sie Ihr Immobilienportfolio auf und antizipieren Sie gesetzliche Anforderungen.",                          link: '/services/gerance',    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },
    { id: 'entreprises', title: 'Unternehmen & KMU',           subtitle: 'Profis',             description: "Optimieren Sie Ihren Verbrauch und senken Sie Betriebskosten mit unseren Audits (PEIK).",                         link: '/services/entreprise', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800' },
    { id: 'villas',      title: 'Villenbesitzer',               subtitle: 'Privatpersonen',     description: "Renovieren Sie Ihre Immobilie und profitieren Sie von kantonalen Fördermitteln zur Verbesserung der Energieeffizienz.", link: '/services/villa',  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800' },
    { id: 'communes',    title: 'Gemeinden & VNB',              subtitle: 'Öffentlicher Sektor', description: "Unterstützen Sie Ihre Bürger und erreichen Sie Ihre Klimaziele mit unseren Energiewendeprogrammen.",             link: '/services/communes',   image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800' },
];

export const getClientTypes = (lang: string): ClientType[] => {
    if (lang.startsWith('de')) return clientTypesDe;
    return lang.startsWith('en') ? clientTypesEn : clientTypesFr;
};

// ─────────────────────────────────────────────────────────────────────────────
// CLIENT TYPES — EN-TÊTE DE SECTION
// ─────────────────────────────────────────────────────────────────────────────

export interface ClientTypesSectionHeader {
    label: string;
    titlePrefix: string;
    titleConnector: string;
    titleHighlight: string;
    description: string;
}

const clientTypesSectionHeaderFr: ClientTypesSectionHeader = {
    label: 'Nos Solutions',
    titlePrefix: 'Une expertise adaptée',
    titleConnector: 'à',
    titleHighlight: 'chaque acteur',
    description: 'Des solutions techniques et financières sur mesure pour chaque type de bâtiment.',
};

const clientTypesSectionHeaderEn: ClientTypesSectionHeader = {
    label: 'Our Solutions',
    titlePrefix: 'Expertise adapted',
    titleConnector: 'to',
    titleHighlight: 'every profile',
    description: 'Tailored technical and financial solutions for every type of building.',
};

const clientTypesSectionHeaderDe: ClientTypesSectionHeader = {
    label: 'Unsere Lösungen',
    titlePrefix: 'Fachwissen angepasst',
    titleConnector: 'an',
    titleHighlight: 'jeden Akteur',
    description: 'Maßgeschneiderte technische und finanzielle Lösungen für jeden Gebäudetyp.',
};

export const getClientTypesSectionHeader = (lang: string): ClientTypesSectionHeader => {
    if (lang.startsWith('de')) return clientTypesSectionHeaderDe;
    return lang.startsWith('en') ? clientTypesSectionHeaderEn : clientTypesSectionHeaderFr;
};
