import { LucideIcon, Landmark, FileText, Scale, Handshake } from 'lucide-react';

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
    description: 'Au-delà de l\'expertise technique, nous apportons une sécurité et une tranquillité d\'esprit à tous nos partenaires.',
    reasons: [
        {
            icon: Landmark,
            title: 'Crédibilité Institutionnelle',
            description: 'Partenaire reconnu par les SIG, le canton et les programmes officiels de subvention.'
        },
        {
            icon: FileText,
            title: 'Gestion Administrative',
            description: 'Nous prenons en charge 100% des démarches pour l\'obtention de vos subventions.'
        },
        {
            icon: Scale,
            title: 'Neutralité Commerciale',
            description: 'Des conseils objectifs et indépendants, sans conflit d\'intérêt avec les installateurs.'
        },
        {
            icon: Handshake,
            title: 'Approche Humaine',
            description: 'Une pédagogie bienveillante pour vous accompagner à chaque étape du projet.'
        }
    ]
};

const whyChooseUsContentEn: WhyChooseUsContent = {
    sectionLabel: 'Our Values',
    title: 'Why Choose',
    titleHighlight: 'Swiss Ecogestes?',
    description: 'Beyond technical expertise, we bring security and peace of mind to all our partners.',
    reasons: [
        {
            icon: Landmark,
            title: 'Institutional Credibility',
            description: 'Partner recognized by SIG, the canton, and official subsidy programs.'
        },
        {
            icon: FileText,
            title: 'Administrative Management',
            description: 'We take care of 100% of the procedures for obtaining your subsidies.'
        },
        {
            icon: Scale,
            title: 'Commercial Neutrality',
            description: 'Objective and independent advice, with no conflict of interest with installers.'
        },
        {
            icon: Handshake,
            title: 'Human Approach',
            description: 'Benevolent pedagogy to accompany you at every step of the project.'
        }
    ]
};


const whyChooseUsContentDe: WhyChooseUsContent = {
    sectionLabel: 'Unsere Werte',
    title: 'Warum',
    titleHighlight: 'Swiss Ecogestes wählen?',
    description: 'Jenseits technischer Expertise bringen wir allen unseren Partnern Sicherheit und Seelenfrieden.',
    reasons: [
        {
            icon: Landmark,
            title: 'Institutionelle Glaubwürdigkeit',
            description: 'Partner anerkannt von SIG, dem Kanton und offiziellen Subventionsprogrammen.'
        },
        {
            icon: FileText,
            title: 'Administrative Verwaltung',
            description: 'Wir übernehmen 100% der Schritte zur Erlangung Ihrer Subventionen.'
        },
        {
            icon: Scale,
            title: 'Kommerzielle Neutralität',
            description: 'Objektive und unabhängige Beratung, ohne Interessenkonflikt mit Installateuren.'
        },
        {
            icon: Handshake,
            title: 'Menschlicher Ansatz',
            description: 'Eine wohlwollende Pädagogik, um Sie bei jedem Schritt des Projekts zu begleiten.'
        }
    ]
};

export const getWhyChooseUsContent = (lang: string): WhyChooseUsContent => {
    if (lang === 'de') return whyChooseUsContentDe;
    return lang === 'en' ? whyChooseUsContentEn : whyChooseUsContentFr;
};
