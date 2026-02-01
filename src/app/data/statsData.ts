import { LucideIcon, Zap, Leaf, Users, Building2 } from 'lucide-react';

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
    {
        id: 1,
        value: 50,
        prefix: "Jusqu'à ",
        suffix: "%",
        label: "De Subventions",
        icon: Zap,
    },
    {
        id: 2,
        value: 20,
        prefix: "10 à ",
        suffix: "%",
        label: "D'économies d'énergie",
        icon: Leaf,
    },
    {
        id: 3,
        value: 2,
        prefix: "≈ ",
        suffix: " ans",
        label: "Retour sur investissement",
        icon: Users,
    },
    {
        id: 4,
        text: "Reconnus",
        label: "Partenaires Institutionnels",
        icon: Building2,
    }
];

const statsEn: Stat[] = [
    {
        id: 1,
        value: 50,
        prefix: "Up to ",
        suffix: "%",
        label: "Subsidies",
        icon: Zap,
    },
    {
        id: 2,
        value: 20,
        prefix: "10 to ",
        suffix: "%",
        label: "Energy Savings",
        icon: Leaf,
    },
    {
        id: 3,
        value: 2,
        prefix: "≈ ",
        suffix: " years",
        label: "Return on Investment",
        icon: Users,
    },
    {
        id: 4,
        text: "Recognized",
        label: "Institutional Partners",
        icon: Building2,
    }
];


const statsDe: Stat[] = [
    {
        id: 1,
        value: 50,
        prefix: "Bis zu ",
        suffix: "%",
        label: "Subventionen",
        icon: Zap,
    },
    {
        id: 2,
        value: 20,
        prefix: "10 bis ",
        suffix: "%",
        label: "Energieeinsparung",
        icon: Leaf,
    },
    {
        id: 3,
        value: 2,
        prefix: "≈ ",
        suffix: " Jahre",
        label: "Kapitalrendite",
        icon: Users,
    },
    {
        id: 4,
        text: "Anerkannt",
        label: "Institutionelle Partner",
        icon: Building2,
    }
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
    label: "Performance Durable",
    title: "L'impact de nos actions",
    description: "Des résultats mesurables pour votre portefeuille et pour l'environnement suisse."
};

const statsContentEn: StatsContent = {
    label: "Sustainable Performance",
    title: "The impact of our actions",
    description: "Measurable results for your wallet and for the Swiss environment."
};


const statsContentDe: StatsContent = {
    label: "Nachhaltige Leistung",
    title: "Die Wirkung unseres Handelns",
    description: "Messbare Ergebnisse für Ihren Geldbeutel und für die Schweizer Umwelt."
};

export const getStatsContent = (lang: string): StatsContent => {
    if (lang === 'de') return statsContentDe;
    return lang === 'en' ? statsContentEn : statsContentFr;
};
