import { Home, Calculator, Flame, Building } from 'lucide-react';
import { SERVICE_IMAGES } from '../config/images';

export const servicesFr = [
    {
        id: "gerance",
        number: "01",
        icon: Calculator,
        title: "Régies & Immeubles",
        subtitle: "Gestionnaires",
        description: "Valorisez votre parc immobilier et anticipez les obligations légales avec nos audits IDC et stratégies de rénovation.",
        fullDescription: "L'Indice de Dépense de Chaleur (IDC) est obligatoire pour de nombreux bâtiments. Nous calculons cet indice avec précision pour garantir votre conformité aux normes légales genevoises et suisses.",
        features: [
            "Audit de parc immobilier (CECB Plus)",
            "Contrat de performance énergétique",
            "Bornes de recharge pour véhicules électriques",
            "Développement de regroupements d'autoconsommateurs (RCP)",
            "Planification thermique à long terme"
        ],
        image: SERVICE_IMAGES.calculIdc,
        link: "/services/gerance",
        delay: 0.1
    },
    {
        id: "villa",
        number: "02",
        icon: Home,
        title: "Propriétaires de Villas",
        subtitle: "Particuliers",
        description: "Rénovez votre bien et profitez des subventions cantonales pour améliorer l'efficacité énergétique de votre maison.",
        fullDescription: "Notre visite conseil pour villa est une étape essentielle pour comprendre les performances énergétiques de votre habitation. Nous analysons l'isolation, les systèmes de chauffage, et les opportunités d'énergie solaire pour vous fournir un plan d'action concret.",
        features: [
            "Audit énergétique CECB",
            "Assainissement de l'enveloppe thermique",
            "Remplacement de système de chauffage",
            "Installation de panneaux photovoltaïques",
            "Gestion des demandes de subventions"
        ],
        image: SERVICE_IMAGES.visiteConseil,
        link: "/services/villa",
        delay: 0.2
    },
    {
        id: "entreprise",
        number: "03",
        icon: Building,
        title: "Entreprises & PME",
        subtitle: "Professionnels",
        description: "Optimisez votre consommation et réduisez vos coûts d'exploitation avec nos audits grands consommateurs.",
        fullDescription: "Passez aux énergies renouvelables et bénéficiez de subventions. Nous vous accompagnons dans le choix et l'installation de pompes à chaleur, chauffage à distance ou bois.",
        features: [
            "Convention d'objectifs (Grands Consommateurs)",
            "Optimisation de l'air comprimé et du froid",
            "Éclairage intelligent et LED haut rendement",
            "Monitoring énergétique en temps réel",
            "Stratégie de décarbonation"
        ],
        image: SERVICE_IMAGES.chauffage,
        link: "/services/entreprise",
        delay: 0.3
    },
    {
        id: "communes",
        number: "04",
        icon: Flame,
        title: "Communes & GRD",
        subtitle: "Collectivités",
        description: "Accompagnez vos citoyens et atteignez vos objectifs climatiques avec nos programmes de transition énergétique.",
        fullDescription: "Pour les grands parcs immobiliers, chaque détail compte. Nous optimisons les flux hydrauliques et électriques pour réduire les charges et améliorer le confort des locataires.",
        features: [
            "Programmes Equiwatt",
            "Conseil en énergie pour citoyens",
            "Stratégie énergétique communale",
            "Formation et sensibilisation",
            "Accompagnement politique climatique"
        ],
        image: SERVICE_IMAGES.ecoLogement,
        link: "/services/communes",
        delay: 0.4
    }
];

export const servicesEn = [
    {
        id: "gerance",
        number: "01",
        icon: Calculator,
        title: "Property Management",
        subtitle: "Managers",
        description: "Enhance your real estate portfolio and anticipate legal obligations with our IDC audits and renovation strategies.",
        fullDescription: "The Heat Expense Index (IDC) is mandatory for many buildings. We calculate this index precisely to ensure your compliance with Geneva and Swiss legal standards.",
        features: [
            "Property portfolio audit (CECB Plus)",
            "Energy performance contract",
            "Electric vehicle charging stations",
            "Development of self-consumer groups (RCP)",
            "Long-term thermal planning"
        ],
        image: SERVICE_IMAGES.calculIdc,
        link: "/services/gerance",
        delay: 0.1
    },
    {
        id: "villa",
        number: "02",
        icon: Home,
        title: "Villa Owners",
        subtitle: "Individuals",
        description: "Renovate your property and benefit from cantonal mandates to improve your home's energy efficiency.",
        fullDescription: "Our villa consulting visit is an essential step to understand your home's energy performance. We analyze insulation, heating systems, and solar energy opportunities to provide you with a concrete action plan.",
        features: [
            "CECB energy audit",
            "Thermal envelope renovation",
            "Heating system replacement",
            "Solar panel installation",
            "Subsidy application management"
        ],
        image: SERVICE_IMAGES.visiteConseil,
        link: "/services/villa",
        delay: 0.2
    },
    {
        id: "entreprise",
        number: "03",
        icon: Building,
        title: "Companies & SMEs",
        subtitle: "Professionals",
        description: "Optimize your consumption and reduce operating costs with our large consumer audits.",
        fullDescription: "Switch to renewable energies and benefit from subsidies. We guide you in choosing and installing heat pumps, district heating, or wood heating.",
        features: [
            "Objectives agreement (Large Consumers)",
            "Compressed air and cooling optimization",
            "Smart lighting and high-efficiency LED",
            "Real-time energy monitoring",
            "Decarbonization strategy"
        ],
        image: SERVICE_IMAGES.chauffage,
        link: "/services/entreprise",
        delay: 0.3
    },
    {
        id: "communes",
        number: "04",
        icon: Flame,
        title: "Municipalities & DSOs",
        subtitle: "Communities",
        description: "Support your citizens and achieve your climate goals with our energy transition programs.",
        fullDescription: "For large real estate portfolios, every detail counts. We optimize hydraulic and electrical flows to reduce charges and improve tenant comfort.",
        features: [
            "Equiwatt programs",
            "Energy advice for citizens",
            "Municipal energy strategy",
            "Training and awareness",
            "Climate policy support"
        ],
        image: SERVICE_IMAGES.ecoLogement,
        link: "/services/communes",
        delay: 0.4
    }
];

export const servicesDe = [
    {
        id: "gerance",
        number: "01",
        icon: Calculator,
        title: "Immobilienverwaltung",
        subtitle: "Verwalter",
        description: "Werten Sie Ihren Immobilienbestand auf und antizipieren Sie gesetzliche Verpflichtungen mit unseren IDC-Audits und Renovierungsstrategien.",
        fullDescription: "Der Heizkostenindex (IDC) ist für viele Gebäude obligatorisch. Wir berechnen diesen Index präzise, um Ihre Konformität mit den Genfer und Schweizer Rechtsnormen zu gewährleisten.",
        features: [
            "Immobilienportfolio-Audit (CECB Plus)",
            "Energieleistungsvertrag",
            "Ladestationen für Elektrofahrzeuge",
            "Entwicklung von Eigenverbrauchergemeinschaften (RCP)",
            "Langfristige thermische Planung"
        ],
        image: SERVICE_IMAGES.calculIdc,
        link: "/services/gerance",
        delay: 0.1
    },
    {
        id: "villa",
        number: "02",
        icon: Home,
        title: "Villenbesitzer",
        subtitle: "Privatpersonen",
        description: "Renovieren Sie Ihr Eigentum und profitieren Sie von kantonalen Zuschüssen zur Verbesserung der Energieeffizienz Ihres Hauses.",
        fullDescription: "Unser Beratungsbesuch für Villen ist ein wesentlicher Schritt, um die Energieeffizienz Ihres Hauses zu verstehen. Wir analysieren Dämmung, Heizsysteme und Solarenergiechancen, um Ihnen einen konkreten Maßnahmenplan zu erstellen.",
        features: [
            "CECB Energieaudit",
            "Thermische Hüllensanierung",
            "Heizungsaustausch",
            "Solaranlageninstallation",
            "Subventionsantragsmanagement"
        ],
        image: SERVICE_IMAGES.visiteConseil,
        link: "/services/villa",
        delay: 0.2
    },
    {
        id: "entreprise",
        number: "03",
        icon: Building,
        title: "Unternehmen & KMU",
        subtitle: "Profis",
        description: "Optimieren Sie Ihren Verbrauch und senken Sie Ihre Betriebskosten mit unseren Audits für Großverbraucher.",
        fullDescription: "Wechseln Sie zu erneuerbaren Energien und profitieren Sie von Fördergeldern. Wir begleiten Sie bei der Auswahl und Installation von Wärmepumpen, Fernwärme oder Holzheizungen.",
        features: [
            "Zielvereinbarung (Großverbraucher)",
            "Optimierung von Druckluft und Kälte",
            "Intelligente Beleuchtung und Hochleistungs-LED",
            "Echtzeit-Energieüberwachung",
            "Dekarbonisierungsstrategie"
        ],
        image: SERVICE_IMAGES.chauffage,
        link: "/services/entreprise",
        delay: 0.3
    },
    {
        id: "communes",
        number: "04",
        icon: Flame,
        title: "Gemeinden & VNB",
        subtitle: "Öffentliche Hand",
        description: "Begleiten Sie Ihre Bürger und erreichen Sie Ihre Klimaziele mit unseren Energiewendeprogrammen.",
        fullDescription: "Bei großen Immobilienbeständen zählt jedes Detail. Wir optimieren hydraulische und elektrische Flüsse, um die Nebenkosten zu senken und den Komfort der Mieter zu verbessern.",
        features: [
            "Equiwatt-Programme",
            "Energieberatung für Bürger",
            "Kommunale Energiestrategie",
            "Schulung und Sensibilisierung",
            "Unterstützung der Klimapolitik"
        ],
        image: SERVICE_IMAGES.ecoLogement,
        link: "/services/communes",
        delay: 0.4
    }
];

export const getServices = (lang: string) => {
    if (lang === 'de') return servicesDe;
    return lang === 'en' ? servicesEn : servicesFr;
};


