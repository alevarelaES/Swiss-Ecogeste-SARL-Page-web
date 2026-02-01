export interface PageService {
    title: string;
    description: string;
    image: string;
    features?: string[];
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
        title: 'Services pour Villas | Audit & Rénovation',
        description: 'Solutions énergétiques pour propriétaires de villas. Audit CECB, pompes à chaleur, panneaux solaires et rénovation globale.',
        canonical: '/services/villa'
    },
    backLink: 'Retour',
    sectionLabel: 'Propriétaires',
    title: 'Expertise Villa',
    description: 'Valorisez votre patrimoine immobilier tout en réduisant votre impact écologique. De l\'audit CECB+ à l\'installation de solutions renouvelables, nous gérons votre transition clé en main.',
    buttonText: 'Lancer mon projet',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
    services: [
        {
            title: 'Audit CECB & CECB+',
            description: 'Analyse officielle de l\'étiquette énergétique de votre bâtiment. Le CECB+ inclut un rapport de conseil complet avec scénarios de rénovation chiffrés.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
            features: [
                "Analyse complète de l'enveloppe thermique",
                "Étiquette énergétique officielle (A à G)",
                "Rapport de conseil avec scénarios de travaux",
                "Estimation des coûts et des subventions",
                "Accompagnement administratif complet"
            ]
        },
        {
            title: 'Solaire Photovoltaïque',
            description: 'Produisez votre propre électricité. Étude de rentabilité, dimensionnement et installation de panneaux solaires performants.',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
            features: [
                "Étude de productivité solaire personnalisée",
                "Dimensionnement optimal des panneaux",
                "Installation par des professionnels certifiés",
                "Raccordement et mise en service inclus",
                "Garantie de performance sur 25 ans"
            ]
        },
        {
            title: 'Pompes à Chaleur',
            description: 'Remplacez votre chauffage fossile par une solution durable et économique. Programme "Chauffez Renouvelable" inclus.',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800',
            features: [
                "Remplacement de chaudières fioul/gaz",
                "Dimensionnement précis de la PAC",
                "Solutions Air-Eau ou Géothermie",
                "Réduction drastique des émissions de CO2",
                "Éligibilité aux primes cantonales"
            ]
        }
    ]
};

const villaPageContentEn: VillaPageContent = {
    seo: {
        title: 'Villa Services | Audit & Renovation',
        description: 'Energy solutions for villa owners. CECB audit, heat pumps, solar panels, and global renovation.',
        canonical: '/services/villa'
    },
    backLink: 'Back',
    sectionLabel: 'Owners',
    title: 'Villa Expertise',
    description: 'Enhance your real estate assets while reducing your ecological impact. From CECB+ audit to installation of renewable solutions, we manage your transition turnkey.',
    buttonText: 'Start my project',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
    services: [
        {
            title: 'CECB & CECB+ Audit',
            description: 'Official analysis of your building\'s energy label. CECB+ includes a complete advisory report with quantified renovation scenarios.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
            features: [
                "Complete thermal envelope analysis",
                "Official energy label (A to G)",
                "Advisory report with work scenarios",
                "Cost and subsidy estimation",
                "Complete administrative support"
            ]
        },
        {
            title: 'Solar Photovoltaic',
            description: 'Produce your own electricity. Profitability study, sizing, and installation of high-performance solar panels.',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
            features: [
                "Personalized solar productivity study",
                "Optimal panel sizing",
                "Installation by certified professionals",
                "Connection and commissioning included",
                "25-year performance warranty"
            ]
        },
        {
            title: 'Heat Pumps',
            description: 'Replace your fossil heating with a sustainable and economical solution. "Renewable Heating" program included.',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800',
            features: [
                "Replacement of oil/gas boilers",
                "Precise heat pump sizing",
                "Air-Water or Geothermal solutions",
                "Drastic reduction of CO2 emissions",
                "Eligibility for cantonal grants"
            ]
        }
    ]
};


const villaPageContentDe: VillaPageContent = {
    seo: {
        title: 'Dienstleistungen für Villen | Audit & Renovierung',
        description: 'Energielösungen für Villenbesitzer. CECB-Audit, Wärmepumpen, Solarmodule und umfassende Renovierung.',
        canonical: '/services/villa'
    },
    backLink: 'Zurück',
    sectionLabel: 'Eigentümer',
    title: 'Villa Expertise',
    description: 'Steigern Sie den Wert Ihrer Immobilie und reduzieren Sie gleichzeitig Ihren ökologischen Fußabdruck. Vom CECB+ Audit bis zur Installation erneuerbarer Lösungen managen wir Ihren Übergang schlüsselfertig.',
    buttonText: 'Projekt starten',
    buttonLink: '/contact',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
    services: [
        {
            title: 'CECB & CECB+ Audit',
            description: 'Offizielle Analyse des Energieausweises Ihres Gebäudes. CECB+ beinhaltet einen vollständigen Beratungsbericht mit quantifizierten Renovierungsszenarien.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
            features: [
                "Vollständige Analyse der thermischen Hülle",
                "Offizielles Energielabel (A bis G)",
                "Beratungsbericht mit Arbeitsszenarien",
                "Schätzung von Kosten und Subventionen",
                "Umfassende administrative Unterstützung"
            ]
        },
        {
            title: 'Solarphotovoltaik',
            description: 'Produzieren Sie Ihren eigenen Strom. Rentabilitätsstudie, Dimensionierung und Installation von Hochleistungs-Solarmodulen.',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
            features: [
                "Personalisierte Solarertragsstudie",
                "Optimale Dimensionierung der Paneele",
                "Installation durch zertifizierte Fachleute",
                "Anschluss und Inbetriebnahme inklusive",
                "25 Jahre Leistungsgarantie"
            ]
        },
        {
            title: 'Wärmepumpen',
            description: 'Ersetzen Sie Ihre fossile Heizung durch eine nachhaltige und wirtschaftliche Lösung. "Erneuerbar Heizen" Programm inklusive.',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800',
            features: [
                "Austausch von Öl-/Gaskesseln",
                "Präzise Dimensionierung der Wärmepumpe",
                "Luft-Wasser- oder Geothermie-Lösungen",
                "Drastische Reduzierung der CO2-Emissionen",
                "Berechtigung für kantonale Zuschüsse"
            ]
        }
    ]
};

export const getVillaPageContent = (lang: string): VillaPageContent => {
    if (lang === 'de') return villaPageContentDe;
    return lang === 'en' ? villaPageContentEn : villaPageContentFr;
};
