import { LucideIcon, Bike, Refrigerator, Sun, Building } from 'lucide-react';

export interface SubventionItem {
    icon: LucideIcon;
    title: string;
    description: string;
    delay: number;
}

export interface SubventionsContent {
    sectionLabel: string;
    title: string;
    description: string;
    buttonText: string;
    items: SubventionItem[];
}

const subventionsContentFr: SubventionsContent = {
    sectionLabel: 'Subventions',
    title: 'Demande de subvention en ligne',
    description: 'Pour vous encourager à diminuer votre consommation d\'énergie, nous vous aidons à obtenir des aides pour vos projets durables.',
    buttonText: 'Formulaire',
    items: [
        {
            delay: 0.1,
            icon: Bike,
            title: 'Mobilité douce',
            description: 'Pour scooter, vélo électrique, batterie.'
        },
        {
            delay: 0.2,
            icon: Refrigerator,
            title: 'Électroménager',
            description: '20% du prix d\'achat d\'un appareil efficient.'
        },
        {
            delay: 0.3,
            icon: Sun,
            title: 'Solaire thermique',
            description: 'Ajoutez une subvention à celle de l\'État de Vaud.'
        },
        {
            delay: 0.4,
            icon: Building,
            title: 'Rénovation',
            description: '25% sur une rénovation énergétique certifiée.'
        }
    ]
};

const subventionsContentEn: SubventionsContent = {
    sectionLabel: 'Subsidies',
    title: 'Online Subsidy Request',
    description: 'To encourage you to reduce your energy consumption, we help you obtain aid for your sustainable projects.',
    buttonText: 'Form',
    items: [
        {
            delay: 0.1,
            icon: Bike,
            title: 'Soft Mobility',
            description: 'For scooters, electric bikes, batteries.'
        },
        {
            delay: 0.2,
            icon: Refrigerator,
            title: 'Appliances',
            description: '20% of the purchase price of an efficient appliance.'
        },
        {
            delay: 0.3,
            icon: Sun,
            title: 'Solar Thermal',
            description: 'Add a subsidy to the Vaud State one.'
        },
        {
            delay: 0.4,
            icon: Building,
            title: 'Renovation',
            description: '25% on a certified energy renovation.'
        }
    ]
};


const subventionsContentDe: SubventionsContent = {
    sectionLabel: 'Subventionen',
    title: 'Online-Subventionsantrag',
    description: 'Um Sie zu ermutigen, Ihren Energieverbrauch zu senken, helfen wir Ihnen, Unterstützung für Ihre nachhaltigen Projekte zu erhalten.',
    buttonText: 'Formular',
    items: [
        {
            delay: 0.1,
            icon: Bike,
            title: 'Sanfte Mobilität',
            description: 'Für Roller, E-Bikes, Batterien.'
        },
        {
            delay: 0.2,
            icon: Refrigerator,
            title: 'Haushaltsgeräte',
            description: '20% des Kaufpreises eines effizienten Geräts.'
        },
        {
            delay: 0.3,
            icon: Sun,
            title: 'Solarthermie',
            description: 'Fügen Sie eine Subvention zu der des Kantons Waadt hinzu.'
        },
        {
            delay: 0.4,
            icon: Building,
            title: 'Renovierung',
            description: '25% auf eine zertifizierte energetische Renovierung.'
        }
    ]
};

export const getSubventionsContent = (lang: string): SubventionsContent => {
    if (lang === 'de') return subventionsContentDe;
    return lang === 'en' ? subventionsContentEn : subventionsContentFr;
};
