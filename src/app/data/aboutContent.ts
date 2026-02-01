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
    image: string;
}

const aboutContentFr: AboutContent = {
    sectionLabel: 'À propos de nous',
    title: 'Engagés pour un avenir durable',
    paragraph1: "Chez Swiss Ecogestes, nous sommes des acteurs de la transition énergétique. L'impact global commence par des actions locales, et nous collaborons étroitement avec les acteurs suisses pour promouvoir l'efficacité énergétique et réduire les déchets.",
    paragraph2: "Notre engagement se manifeste à travers des audits énergétiques personnalisés, conçus pour optimiser l'utilisation de l'énergie et minimiser les déchets. Nous accompagnons avec des solutions clés en main.",
    values: [
        {
            title: 'Local',
            subtitle: 'Action suisse'
        },
        {
            title: 'Bio',
            subtitle: 'Écologique'
        },
        {
            title: 'Éco',
            subtitle: 'Économique'
        }
    ],
    ctaText: 'Découvrir notre ADN',
    ctaLink: '/team',
    quote: '"L\'énergie la plus propre est celle que l\'on ne consomme pas"',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000'
};

const aboutContentEn: AboutContent = {
    sectionLabel: 'About Us',
    title: 'Committed to a sustainable future',
    paragraph1: "At Swiss Ecogestes, we are actors in the energy transition. Global impact starts with local actions, and we work closely with Swiss stakeholders to promote energy efficiency and reduce waste.",
    paragraph2: "Our commitment is demonstrated through personalized energy audits, designed to optimize energy use and minimize waste. We provide turnkey solutions.",
    values: [
        {
            title: 'Local',
            subtitle: 'Swiss Action'
        },
        {
            title: 'Green',
            subtitle: 'Ecological'
        },
        {
            title: 'Eco',
            subtitle: 'Economical'
        }
    ],
    ctaText: 'Discover our DNA',
    ctaLink: '/team',
    quote: '"The cleanest energy is the one we do not consume"',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000'
};


const aboutContentDe: AboutContent = {
    sectionLabel: 'Über uns',
    title: 'Engagiert für eine nachhaltige Zukunft',
    paragraph1: "Bei Swiss Ecogestes sind wir Akteure der Energiewende. Globale Wirkung beginnt mit lokalen Maßnahmen, und wir arbeiten eng mit Schweizer Akteuren zusammen, um Energieeffizienz zu fördern und Verschwendung zu reduzieren.",
    paragraph2: "Unser Engagement zeigt sich in personalisierten Energieaudits, die darauf ausgelegt sind, den Energieverbrauch zu optimieren und Verschwendung zu minimieren. Wir bieten schlüsselfertige Lösungen.",
    values: [
        {
            title: 'Lokal',
            subtitle: 'Schweizer Aktion'
        },
        {
            title: 'Bio',
            subtitle: 'Ökologisch'
        },
        {
            title: 'Öko',
            subtitle: 'Wirtschaftlich'
        }
    ],
    ctaText: 'Entdecken Sie unsere DNA',
    ctaLink: '/team',
    quote: '"Die sauberste Energie ist die, die wir nicht verbrauchen"',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000'
};

export const getAboutContent = (lang: string): AboutContent => {
    if (lang.startsWith('de')) return aboutContentDe;
    return lang.startsWith('en') ? aboutContentEn : aboutContentFr;
};
