export interface AboutContent {
    sectionLabel: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    values: {
        title: string;
        subtitle: string;
    }[];
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
        {
            title: 'Neutre',
            subtitle: 'Recommandations indépendantes, sans intérêt commercial'
        },
        {
            title: 'Proximité',
            subtitle: 'Expertise terrain, ancrage local en Suisse romande'
        },
        {
            title: 'Efficacité',
            subtitle: 'Actions concrètes, résultats mesurables'
        }
    ],
    ctaText: 'Découvrir notre ADN',
    ctaLink: '/a-propos',
    quote: "Grâce à Swiss Ecogestes, j'ai pu réduire mes charges et identifier des aides que je ne connaissais pas.",
    quoteAuthor: 'Marc D. — Propriétaire, Genève',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000'
};

const aboutContentEn: AboutContent = {
    sectionLabel: 'Why Swiss Ecogestes',
    title: 'You deserve honest advice, not a disguised sales pitch.',
    paragraph1: "Our only interest: your savings. No equipment to sell, no hidden margins. Just your interest, as a priority.",
    paragraph2: "",
    values: [
        {
            title: 'Neutral',
            subtitle: 'Independent recommendations, no commercial interest'
        },
        {
            title: 'Proximity',
            subtitle: 'Field expertise, local presence in French-speaking Switzerland'
        },
        {
            title: 'Efficiency',
            subtitle: 'Concrete actions, measurable results'
        }
    ],
    ctaText: 'Discover our DNA',
    ctaLink: '/a-propos',
    quote: "Thanks to Swiss Ecogestes, I was able to reduce my costs and find subsidies I didn't even know existed.",
    quoteAuthor: 'Marc D. — Property owner, Geneva',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000'
};


const aboutContentDe: AboutContent = {
    sectionLabel: 'Warum Swiss Ecogestes',
    title: 'Sie verdienen einen ehrlichen Rat, keinen verdeckten Verkauf.',
    paragraph1: "Unser einziges Interesse: Ihre Einsparungen. Kein Material zu verkaufen, keine versteckten Margen. Nur Ihr Interesse, als Priorität.",
    paragraph2: "",
    values: [
        {
            title: 'Neutral',
            subtitle: 'Unabhängige Empfehlungen, kein kommerzielles Interesse'
        },
        {
            title: 'Nähe',
            subtitle: 'Vor-Ort-Expertise, lokale Präsenz in der Westschweiz'
        },
        {
            title: 'Effizienz',
            subtitle: 'Konkrete Maßnahmen, messbare Ergebnisse'
        }
    ],
    ctaText: 'Entdecken Sie unsere DNA',
    ctaLink: '/a-propos',
    quote: "Dank Swiss Ecogestes konnte ich meine Kosten senken und Fördermittel finden, von denen ich nichts wusste.",
    quoteAuthor: 'Marc D. — Eigentümer, Genf',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000'
};

export const getAboutContent = (lang: string): AboutContent => {
    if (lang.startsWith('de')) return aboutContentDe;
    return lang.startsWith('en') ? aboutContentEn : aboutContentFr;
};
