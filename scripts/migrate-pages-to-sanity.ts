/**
 * Migration Script - Page Hierarchies
 * 
 * Populates Sanity documents with local data from src/app/data/*.ts
 * 
 * Usage:
 * 1. Ensure SANITY_WRITE_TOKEN is set in .env
 * 2. Run: npx tsx scripts/migrate-pages-to-sanity.ts
 */

import 'dotenv/config'
import { createClient } from '@sanity/client'
import fs from 'fs'

// Configure Sanity client
const client = createClient({
  projectId: 'btjdqrld',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

// Icon mapping helper
function getIconName(icon: any): string {
  if (typeof icon === 'string') return icon
  if (icon && icon.name) return icon.name
  if (icon && typeof icon === 'function') {
    return icon.displayName || icon.name || 'HelpCircle'
  }
  return 'HelpCircle'
}

// Helper to create locale strings
function createLocaleString(fr: string, en: string, de: string) {
  return { fr, en, de }
}

// Helper to create locale text
function createLocaleText(fr: string, en: string, de: string) {
  return { fr, en, de }
}

// ===== IMPORT LOCAL DATA =====

// Import heroSlides
const heroSlidesFr = [
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
]

const heroSlidesEn = [
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
]

const heroSlidesDe = [
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
    features: ['Großverbraucher-Audit', 'Prozessoptimierung', 'CO2-Steuerbefreiung'],
    buttonText: 'Lösungen für Unternehmen',
    buttonLink: '/services/entreprise'
  },
  {
    img: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=2070',
    title: 'Unterstützung für Gemeinden',
    sub: 'Swiss Ecogestes unterstützt Gemeinden und Industriedienstleister bei ihrer territorialen Energiewendestrategie.',
    features: ['Territoriale Audits', 'Bürgersensibilisierung', 'Subventionierte Programme'],
    buttonText: 'Lösungen für Gemeinden',
    buttonLink: '/services/communes'
  }
]

// Stats data
const statsFr = [
  { id: 1, value: '50', prefix: "Jusqu'à ", suffix: "%", label: "De Subventions", icon: 'Zap' },
  { id: 2, value: '20', prefix: "10 à ", suffix: "%", label: "D'économies d'énergie", icon: 'Leaf' },
  { id: 3, value: '2', prefix: "≈ ", suffix: " ans", label: "Retour sur investissement", icon: 'Users' },
  { id: 4, value: '', label: "Partenaires Institutionnels", icon: 'Building2' },
]

const statsEn = [
  { id: 1, value: '50', prefix: "Up to ", suffix: "%", label: "Subsidies", icon: 'Zap' },
  { id: 2, value: '20', prefix: "10 to ", suffix: "%", label: "Energy Savings", icon: 'Leaf' },
  { id: 3, value: '2', prefix: "≈ ", suffix: " years", label: "Return on Investment", icon: 'Users' },
  { id: 4, value: '', label: "Institutional Partners", icon: 'Building2' },
]

const statsDe = [
  { id: 1, value: '50', prefix: "Bis zu ", suffix: "%", label: "Subventionen", icon: 'Zap' },
  { id: 2, value: '20', prefix: "10 bis ", suffix: "%", label: "Energieeinsparung", icon: 'Leaf' },
  { id: 3, value: '2', prefix: "≈ ", suffix: " Jahren", label: "Amortisationszeit", icon: 'Users' },
  { id: 4, value: '', label: "Institutionelle Partner", icon: 'Building2' },
]

// Client Types data
const clientTypesFr = [
  {
    id: 'regies',
    title: 'Régies & Immeubles',
    subtitle: 'Gestionnaires',
    description: 'Valorisez votre parc immobilier et réduisez les charges locatives.',
    link: '/services/gerance',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'villas',
    title: 'Propriétaires de Villas',
    subtitle: 'Particuliers',
    description: 'Rénovez votre bien et profitez des subventions cantonales.',
    link: '/services/villa',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'entreprises',
    title: 'Entreprises & PME',
    subtitle: 'Professionnels',
    description: 'Optimisez votre consommation et respectez les cadres légaux (PAKE).',
    link: '/services/entreprise',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'communes',
    title: 'Communes & GRD',
    subtitle: 'Collectivités',
    description: 'Accompagnez vos citoyens et atteignez vos objectifs climatiques.',
    link: '/services/communes',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800'
  }
]

const clientTypesEn = [
  {
    id: 'regies',
    title: 'Real Estate & Buildings',
    subtitle: 'Managers',
    description: 'Enhance your property portfolio and reduce rental charges.',
    link: '/services/gerance',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'villas',
    title: 'Villa Owners',
    subtitle: 'Individuals',
    description: 'Renovate your property and benefit from cantonal subsidies.',
    link: '/services/villa',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'entreprises',
    title: 'Businesses & SMEs',
    subtitle: 'Professionals',
    description: 'Optimize your consumption and comply with legal frameworks (PAKE).',
    link: '/services/entreprise',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'communes',
    title: 'Municipalities & DSOs',
    subtitle: 'Collectivities',
    description: 'Support your citizens and achieve your climate goals.',
    link: '/services/communes',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800'
  }
]

const clientTypesDe = [
  {
    id: 'regies',
    title: "Immobilien & Liegenschaften",
    subtitle: "Verwalter",
    description: "Werten Sie Ihr Immobilienportfolio auf und senken Sie die Mietnebenkosten.",
    link: '/services/gerance',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'villas',
    title: "Villenbesitzer",
    subtitle: "Privatpersonen",
    description: "Renovieren Sie Ihre Immobilie und profitieren Sie von kantonalen Fördermitteln.",
    link: '/services/villa',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'entreprises',
    title: "Unternehmen & KMU",
    subtitle: "Profis",
    description: "Optimieren Sie Ihren Verbrauch und erfüllen Sie gesetzliche Rahmenbedingungen (PAKE).",
    link: '/services/entreprise',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'communes',
    title: "Gemeinden & Stadtwerke",
    subtitle: "Öffentliche Hand",
    description: "Unterstützen Sie Ihre Bürger und erreichen Sie Ihre Klimaziele.",
    link: '/services/communes',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800'
  }
]

// Services data
const servicesFr = [
  {
    id: "gerance",
    number: "01",
    icon: 'Calculator',
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
    link: "/services/gerance",
  },
  {
    id: "villa",
    number: "02",
    icon: 'Home',
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
    link: "/services/villa",
  },
  {
    id: "entreprise",
    number: "03",
    icon: 'Building',
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
    link: "/services/entreprise",
  },
  {
    id: "communes",
    number: "04",
    icon: 'Flame',
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
    link: "/services/communes",
  }
]

const servicesEn = [
  {
    id: "gerance",
    number: "01",
    icon: 'Calculator',
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
    link: "/services/gerance",
  },
  {
    id: "villa",
    number: "02",
    icon: 'Home',
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
    link: "/services/villa",
  },
  {
    id: "entreprise",
    number: "03",
    icon: 'Building',
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
    link: "/services/entreprise",
  },
  {
    id: "communes",
    number: "04",
    icon: 'Flame',
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
    link: "/services/communes",
  }
]

const servicesDe = [
  {
    id: "gerance",
    number: "01",
    icon: 'Calculator',
    title: "Immobilienverwaltung",
    subtitle: "Verwalter",
    description: "Werten Sie Ihr Immobilienportfolio auf und antizipieren Sie gesetzliche Verpflichtungen mit unseren IDC-Audits und Renovierungsstrategien.",
    fullDescription: "Der Heizwärmeindex (IDC) ist für viele Gebäude obligatorisch. Wir berechnen diesen Index präzise, um Ihre Einhaltung der Genfer und Schweizer Rechtsnormen zu gewährleisten.",
    features: [
      "Gebäudeportfolio-Audit (GEAK Plus)",
      "Energieleistungsvertrag",
      "Ladestationen für Elektrofahrzeuge",
      "Entwicklung von Eigenverbrauchsgemeinschaften (ZEV)",
      "Langfristige Wärmeplanung"
    ],
    link: "/services/gerance",
  },
  {
    id: "villa",
    number: "02",
    icon: 'Home',
    title: "Villenbesitzer",
    subtitle: "Privatpersonen",
    description: "Renovieren Sie Ihre Immobilie und profitieren Sie von kantonalen Fördermitteln zur Verbesserung der Energieeffizienz Ihres Hauses.",
    fullDescription: "Unser Beratungsbesuch für Villen ist ein wesentlicher Schritt, um die Energieleistung Ihres Hauses zu verstehen. Wir analysieren Isolierung, Heizsysteme und Solarenergiemöglichkeiten, um Ihnen einen konkreten Aktionsplan zu liefern.",
    features: [
      "GEAK Energieaudit",
      "Sanierung der thermischen Gebäudehülle",
      "Austausch des Heizsystems",
      "Installation von Photovoltaik-Anlagen",
      "Verwaltung von Förderanträgen"
    ],
    link: "/services/villa",
  },
  {
    id: "entreprise",
    number: "03",
    icon: 'Building',
    title: "Unternehmen & KMU",
    subtitle: "Profis",
    description: "Optimieren Sie Ihren Verbrauch und senken Sie Betriebskosten mit unseren Großverbraucher-Audits.",
    fullDescription: "Wechseln Sie zu erneuerbaren Energien und profitieren Sie von Fördergeldern. Wir begleiten Sie bei der Auswahl und Installation von Wärmepumpen, Fernwärme oder Holzheizung.",
    features: [
      "Zielvereinbarung (Großverbraucher)",
      "Optimierung von Druckluft und Kälte",
      "Intelligente Beleuchtung und LED mit hoher Effizienz",
      "Energiemonitoring in Echtzeit",
      "Dekarbonisierungsstrategie"
    ],
    link: "/services/entreprise",
  },
  {
    id: "communes",
    number: "04",
    icon: 'Flame',
    title: "Gemeinden & Stadtwerke",
    subtitle: "Öffentliche Hand",
    description: "Unterstützen Sie Ihre Bürger und erreichen Sie Ihre Klimaziele mit unseren Energiewendeprogrammen.",
    fullDescription: "Für große Immobilienportfolios zählt jedes Detail. Wir optimieren hydraulische und elektrische Flüsse, um Kosten zu senken und den Mieterkomfort zu verbessern.",
    features: [
      "Equiwatt-Programme",
      "Energieberatung für Bürger",
      "Kommunale Energiestrategie",
      "Schulung und Sensibilisierung",
      "Unterstützung der Klimapolitik"
    ],
    link: "/services/communes",
  }
]

// Team members data
const teamMembersFr = [
  {
    name: 'Mohammad SALMAN',
    role: 'Conseiller en énergie',
    initials: 'MS',
    color: 'from-[var(--primary)] to-emerald-600',
    items: [
      'Expert "Chauffez renouvelable"',
      'Concessionnaire IDC Genève',
      'Expert éclairage SIG',
      'Conseiller villa/entreprises'
    ]
  },
  {
    name: 'Reem Al AYDI',
    role: 'Conseillère en énergie',
    initials: 'RA',
    color: 'from-[var(--primary)] to-emerald-600',
    items: [
      'Experte "Chauffez renouvelable"',
      'Concessionnaire IDC Genève',
      'Conseillère villa/TPE/PME'
    ]
  },
  {
    name: 'Thibault CASIER',
    role: 'Conseiller en énergie',
    initials: 'TC',
    color: 'from-[var(--primary)] to-emerald-600',
    items: [
      'Conseiller entreprises TPE/PME',
      'Conseiller Ecologement'
    ]
  },
  {
    name: 'Daniel BADOUX',
    role: 'Conseiller en énergie',
    initials: 'DB',
    color: 'from-[var(--primary)] to-emerald-600',
    items: [
      'Conseiller entreprises TPE/PME',
      'Conseiller Ecologement'
    ]
  },
  {
    name: 'Patrick CASIMIRUS',
    role: 'Conseiller en énergie',
    initials: 'PC',
    color: 'from-[var(--primary)] to-emerald-600',
    items: [
      'Conseiller entreprises TPE/PME',
      'Conseiller Ecologement'
    ]
  }
]

const teamMembersEn = [
  {
    name: 'Mohammad SALMAN',
    role: 'Energy Advisor',
    initials: 'MS',
    color: 'from-[var(--primary)] to-emerald-600',
    items: [
      '"Renewable Heating" Expert',
      'IDC Geneva Concessionaire',
      'SIG Lighting Expert',
      'Villa/Business Advisor'
    ]
  },
  {
    name: 'Reem Al AYDI',
    role: 'Energy Advisor',
    initials: 'RA',
    color: 'from-[var(--primary)] to-emerald-600',
    items: [
      '"Renewable Heating" Expert',
      'IDC Geneva Concessionaire',
      'Villa/SME/Small Business Advisor'
    ]
  },
  {
    name: 'Thibault CASIER',
    role: 'Energy Advisor',
    initials: 'TC',
    color: 'from-[var(--primary)] to-emerald-600',
    items: [
      'SME/Small Business Advisor',
      'Ecologement Advisor'
    ]
  },
  {
    name: 'Daniel BADOUX',
    role: 'Energy Advisor',
    initials: 'DB',
    color: 'from-[var(--primary)] to-emerald-600',
    items: [
      'SME/Small Business Advisor',
      'Ecologement Advisor'
    ]
  },
  {
    name: 'Patrick CASIMIRUS',
    role: 'Energy Advisor',
    initials: 'PC',
    color: 'from-[var(--primary)] to-emerald-600',
    items: [
      'SME/Small Business Advisor',
      'Ecologement Advisor'
    ]
  }
]

const teamMembersDe = [
  {
    name: 'Mohammad SALMAN',
    role: 'Energieberater',
    initials: 'MS',
    color: 'from-[var(--primary)] to-emerald-600',
    items: [
      'Experte "Erneuerbar Heizen"',
      'IDC Genf Konzessionär',
      'SIG Beleuchtungsexperte',
      'Berater Villa/Unternehmen'
    ]
  },
  {
    name: 'Reem Al AYDI',
    role: 'Energieberaterin',
    initials: 'RA',
    color: 'from-[var(--primary)] to-emerald-600',
    items: [
      'Expertin "Erneuerbar Heizen"',
      'IDC Genf Konzessionärin',
      'Beraterin Villa/KMU/Kleinunternehmen'
    ]
  },
  {
    name: 'Thibault CASIER',
    role: 'Energieberater',
    initials: 'TC',
    color: 'from-[var(--primary)] to-emerald-600',
    items: [
      'Berater KMU/Kleinunternehmen',
      'Ecologement Berater'
    ]
  },
  {
    name: 'Daniel BADOUX',
    role: 'Energieberater',
    initials: 'DB',
    color: 'from-[var(--primary)] to-emerald-600',
    items: [
      'Berater KMU/Kleinunternehmen',
      'Ecologement Berater'
    ]
  },
  {
    name: 'Patrick CASIMIRUS',
    role: 'Energieberater',
    initials: 'PC',
    color: 'from-[var(--primary)] to-emerald-600',
    items: [
      'Berater KMU/Kleinunternehmen',
      'Ecologement Berater'
    ]
  }
]

// About content data
const aboutContentFr = {
  sectionLabel: 'À propos de nous',
  title: 'Engagés pour un avenir durable',
  paragraph1: "Chez Swiss Ecogestes, nous sommes des acteurs de la transition énergétique. L'impact global commence par des actions locales, et nous collaborons étroitement avec les acteurs suisses pour promouvoir l'efficacité énergétique et réduire les déchets.",
  paragraph2: "Notre engagement se manifeste à travers des audits énergétiques personnalisés, conçus pour optimiser l'utilisation de l'énergie et minimiser les déchets. Nous accompagnons avec des solutions clés en main.",
  values: [
    { title: 'Local', subtitle: 'Action suisse' },
    { title: 'Bio', subtitle: 'Écologique' },
    { title: 'Éco', subtitle: 'Économique' }
  ],
  ctaText: 'Découvrir notre ADN',
  ctaLink: '/team',
  quote: '"L\'énergie la plus propre est celle que l\'on ne consomme pas"',
  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000'
}

const aboutContentEn = {
  sectionLabel: 'About Us',
  title: 'Committed to a sustainable future',
  paragraph1: "At Swiss Ecogestes, we are actors in the energy transition. Global impact starts with local actions, and we work closely with Swiss stakeholders to promote energy efficiency and reduce waste.",
  paragraph2: "Our commitment is demonstrated through personalized energy audits, designed to optimize energy use and minimize waste. We provide turnkey solutions.",
  values: [
    { title: 'Local', subtitle: 'Swiss Action' },
    { title: 'Green', subtitle: 'Ecological' },
    { title: 'Eco', subtitle: 'Economical' }
  ],
  ctaText: 'Discover our DNA',
  ctaLink: '/team',
  quote: '"The cleanest energy is the one we do not consume"',
  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000'
}

const aboutContentDe = {
  sectionLabel: 'Über uns',
  title: 'Engagiert für eine nachhaltige Zukunft',
  paragraph1: "Bei Swiss Ecogestes sind wir Akteure der Energiewende. Globale Wirkung beginnt mit lokalen Maßnahmen, und wir arbeiten eng mit Schweizer Akteuren zusammen, um Energieeffizienz zu fördern und Verschwendung zu reduzieren.",
  paragraph2: "Unser Engagement zeigt sich in personalisierten Energieaudits, die darauf ausgelegt sind, den Energieverbrauch zu optimieren und Verschwendung zu minimieren. Wir bieten schlüsselfertige Lösungen.",
  values: [
    { title: 'Lokal', subtitle: 'Schweizer Aktion' },
    { title: 'Bio', subtitle: 'Ökologisch' },
    { title: 'Öko', subtitle: 'Wirtschaftlich' }
  ],
  ctaText: 'Entdecken Sie unsere DNA',
  ctaLink: '/team',
  quote: '"Die sauberste Energie ist die, die wir nicht verbrauchen"',
  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000'
}

// ===== MIGRATION FUNCTIONS =====

/**
 * 1. Migrate Client Types
 */
async function migrateClientTypes() {
  console.log('\n📦 Migrating Client Types...')
  const createdIds: string[] = []

  for (let i = 0; i < clientTypesFr.length; i++) {
    const ctFr = clientTypesFr[i]
    const ctEn = clientTypesEn[i]
    const ctDe = clientTypesDe[i]

    const doc = {
      _id: `clientType-${ctFr.id}`,
      _type: 'clientType',
      slug: ctFr.id,
      title: {
        fr: ctFr.title,
        en: ctEn.title,
        de: ctDe.title
      },
      subtitle: {
        fr: ctFr.subtitle,
        en: ctEn.subtitle,
        de: ctDe.subtitle
      },
      description: {
        fr: ctFr.description,
        en: ctEn.description,
        de: ctDe.description
      },
      link: ctFr.link,
      order: i + 1
    }

    try {
      await client.createOrReplace(doc)
      createdIds.push(doc._id)
      console.log(`✅ Created clientType: ${ctFr.title}`)
    } catch (error: any) {
      console.error(`❌ Error creating clientType ${ctFr.id}:`, error.message)
    }
  }

  return createdIds
}

/**
 * 2. Migrate Services
 */
async function migrateServices() {
  console.log('\n📦 Migrating Services...')
  const createdIds: string[] = []

  for (let i = 0; i < servicesFr.length; i++) {
    const sFr = servicesFr[i]
    const sEn = servicesEn[i]
    const sDe = servicesDe[i]

    const doc = {
      _id: `service-${sFr.id}`,
      _type: 'service',
      cardInfo: {
        title: createLocaleString(sFr.title, sEn.title, sDe.title),
        description: createLocaleText(sFr.description, sEn.description, sDe.description),
        icon: sFr.icon,
        slug: {
          _type: 'slug',
          current: sFr.id
        }
      },
      detailPage: {
        fullDescription: createLocaleText(sFr.fullDescription, sEn.fullDescription, sDe.fullDescription),
        benefits: sFr.features.map((feat, idx) => ({
          _key: `benefit-${i}-${idx}`,
          title: createLocaleString(feat, sEn.features[idx], sDe.features[idx]),
          description: createLocaleText('', '', '') // Empty for now
        })),
        ctaText: createLocaleString('En savoir plus', 'Learn more', 'Mehr erfahren')
      }
    }

    try {
      await client.createOrReplace(doc)
      createdIds.push(doc._id)
      console.log(`✅ Created service: ${sFr.title}`)
    } catch (error: any) {
      console.error(`❌ Error creating service ${sFr.id}:`, error.message)
    }
  }

  return createdIds
}

/**
 * 3. Migrate Team Members
 */
async function migrateTeamMembers() {
  console.log('\n📦 Migrating Team Members...')
  const createdIds: string[] = []

  for (let i = 0; i < teamMembersFr.length; i++) {
    const tmFr = teamMembersFr[i]
    const tmEn = teamMembersEn[i]
    const tmDe = teamMembersDe[i]

    const doc = {
      _id: `teamMember-${tmFr.initials.toLowerCase()}`,
      _type: 'teamMember',
      name: tmFr.name,
      role: {
        fr: tmFr.role,
        en: tmEn.role,
        de: tmDe.role
      },
      initials: tmFr.initials,
      color: tmFr.color,
      items: {
        fr: tmFr.items,
        en: tmEn.items,
        de: tmDe.items
      },
      order: i + 1
    }

    try {
      await client.createOrReplace(doc)
      createdIds.push(doc._id)
      console.log(`✅ Created team member: ${tmFr.name}`)
    } catch (error: any) {
      console.error(`❌ Error creating team member ${tmFr.name}:`, error.message)
    }
  }

  return createdIds
}

/**
 * 4. Migrate Home Page
 */
async function migrateHomePage(clientTypeIds: string[]) {
  console.log('\n📦 Migrating Home Page...')

  // Transform hero slides
  const heroSlides = heroSlidesFr.map((slideFr, i) => {
    const slideEn = heroSlidesEn[i]
    const slideDe = heroSlidesDe[i]
    
    return {
      _key: `slide-${i}`,
      title: createLocaleString(slideFr.title, slideEn.title, slideDe.title),
      subtitle: createLocaleText(slideFr.sub, slideEn.sub, slideDe.sub),
      features: slideFr.features, // Simple array of strings
      buttonText: createLocaleString(slideFr.buttonText, slideEn.buttonText, slideDe.buttonText),
      buttonLink: slideFr.buttonLink
      // Image to be added manually in Studio
    }
  })

  // Transform stats
  const statsItems = statsFr.map((statFr, i) => {
    const statEn = statsEn[i]
    const statDe = statsDe[i]
    
    return {
      _key: `stat-${i}`,
      value: statFr.value,
      label: createLocaleString(statFr.label, statEn.label, statDe.label),
      prefix: statFr.prefix,
      suffix: statFr.suffix,
      icon: statFr.icon
    }
  })

  const doc = {
    _id: 'homePage',
    _type: 'homePage',
    heroSlides,
    statsSection: {
      title: createLocaleString(
        'Nos résultats en chiffres',
        'Our results in numbers',
        'Unsere Ergebnisse in Zahlen'
      ),
      items: statsItems
    },
    solutionsSection: {
      label: createLocaleString('Nos Solutions', 'Our Solutions', 'Unsere Lösungen'),
      title: createLocaleString(
        'Des solutions adaptées à chaque type de client',
        'Solutions tailored to every type of client',
        'Lösungen für jeden Kundentyp'
      ),
      description: createLocaleText(
        'Découvrez nos services spécialisés pour chaque secteur',
        'Discover our specialized services for each sector',
        'Entdecken Sie unsere spezialisierten Dienstleistungen für jeden Sektor'
      ),
      items: clientTypeIds.map(id => ({
        _type: 'reference',
        _ref: id,
        _key: id
      }))
    },
    blogSection: {
      title: createLocaleString('Actualités', 'News', 'Neuigkeiten'),
      viewAllText: createLocaleString('Voir tous les articles', 'View all articles', 'Alle Artikel ansehen'),
      featuredArticles: [] // Will be populated when articles are created
    },
    partnersSection: {
      title: createLocaleString(
        'Ils nous font confiance et recommandent nos services',
        'They trust us and recommend our services',
        'Sie vertrauen uns und empfehlen unsere Dienstleistungen'
      ),
      list: [
        {
          _key: 'partner-sig',
          name: 'SIG - Services Industriels de Genève'
        },
        {
          _key: 'partner-romande',
          name: 'Romande Energie'
        },
        {
          _key: 'partner-canton',
          name: 'Canton de Genève'
        },
        {
          _key: 'partner-cecb',
          name: 'CECB'
        }
      ]
    }
  }

  try {
    await client.createOrReplace(doc)
    console.log('✅ Created homePage singleton')
  } catch (error: any) {
    console.error('❌ Error creating homePage:', error.message)
  }
}

/**
 * 5. Migrate Services Page
 */
async function migrateServicesPage(serviceIds: string[]) {
  console.log('\n📦 Migrating Services Page...')

  const doc = {
    _id: 'servicesPage',
    _type: 'servicesPage',
    seo: {
      title: createLocaleString('Nos Services', 'Our Services', 'Unsere Dienstleistungen'),
      description: createLocaleText(
        'Découvrez nos services de conseil en énergie pour villas, régies, entreprises et communes',
        'Discover our energy consulting services for villas, property management, businesses and municipalities',
        'Entdecken Sie unsere Energieberatungsdienstleistungen für Villen, Hausverwaltungen, Unternehmen und Gemeinden'
      )
    },
    hero: {
      title: createLocaleString('Nos Services', 'Our Services', 'Unsere Dienstleistungen'),
      description: createLocaleText(
        'Des solutions énergétiques adaptées à chaque besoin',
        'Energy solutions tailored to every need',
        'Energielösungen für jeden Bedarf'
      )
    },
    servicesList: serviceIds.map(id => ({
      _type: 'reference',
      _ref: id,
      _key: id
    }))
  }

  try {
    await client.createOrReplace(doc)
    console.log('✅ Created servicesPage singleton')
  } catch (error: any) {
    console.error('❌ Error creating servicesPage:', error.message)
  }
}

/**
 * 6. Migrate Team Page
 */
async function migrateTeamPage(teamMemberIds: string[]) {
  console.log('\n📦 Migrating Team Page...')

  const doc = {
    _id: 'teamPage',
    _type: 'teamPage',
    seo: {
      title: createLocaleString('Notre Équipe', 'Our Team', 'Unser Team'),
      description: createLocaleText(
        'Rencontrez l\'équipe de conseillers en énergie de Swiss Ecogestes',
        'Meet the energy consulting team at Swiss Ecogestes',
        'Lernen Sie das Energieberatungsteam von Swiss Ecogestes kennen'
      )
    },
    hero: {
      label: createLocaleString('Notre Équipe', 'Our Team', 'Unser Team'),
      title: createLocaleString(
        'Des experts à votre service',
        'Experts at your service',
        'Experten zu Ihren Diensten'
      ),
      intro: createLocaleText(
        'Une équipe passionnée et qualifiée pour vous accompagner',
        'A passionate and qualified team to support you',
        'Ein leidenschaftliches und qualifiziertes Team, das Sie unterstützt'
      )
    },
    membersSection: {
      title: createLocaleString('Nos Conseillers', 'Our Advisors', 'Unsere Berater'),
      description: createLocaleText(
        'Des professionnels certifiés et expérimentés',
        'Certified and experienced professionals',
        'Zertifizierte und erfahrene Fachleute'
      ),
      membersList: teamMemberIds.map(id => ({
        _type: 'reference',
        _ref: id,
        _key: id
      }))
    },
    recruitmentSection: {
      title: createLocaleString('Rejoignez-nous', 'Join us', 'Werden Sie Teil unseres Teams'),
      text: createLocaleText(
        'Nous recherchons des talents passionnés par la transition énergétique',
        'We are looking for talents passionate about the energy transition',
        'Wir suchen Talente, die sich für die Energiewende begeistern'
      ),
      ctaText: createLocaleString('Nous contacter', 'Contact us', 'Kontaktieren Sie uns'),
      ctaLink: '/contact'
    }
  }

  try {
    await client.createOrReplace(doc)
    console.log('✅ Created teamPage singleton')
  } catch (error: any) {
    console.error('❌ Error creating teamPage:', error.message)
  }
}

/**
 * 7. Migrate About Page
 */
async function migrateAboutPage() {
  console.log('\n📦 Migrating About Page...')

  const doc = {
    _id: 'aboutPage',
    _type: 'aboutPage',
    sectionLabel: createLocaleString(
      aboutContentFr.sectionLabel,
      aboutContentEn.sectionLabel,
      aboutContentDe.sectionLabel
    ),
    title: createLocaleString(
      aboutContentFr.title,
      aboutContentEn.title,
      aboutContentDe.title
    ),
    paragraphs: [
      {
        _key: 'para-1',
        fr: aboutContentFr.paragraph1,
        en: aboutContentEn.paragraph1,
        de: aboutContentDe.paragraph1
      },
      {
        _key: 'para-2',
        fr: aboutContentFr.paragraph2,
        en: aboutContentEn.paragraph2,
        de: aboutContentDe.paragraph2
      }
    ],
    values: aboutContentFr.values.map((val, i) => ({
      _key: `value-${i}`,
      title: createLocaleString(val.title, aboutContentEn.values[i].title, aboutContentDe.values[i].title),
      subtitle: createLocaleString(val.subtitle, aboutContentEn.values[i].subtitle, aboutContentDe.values[i].subtitle)
    })),
    cta: {
      text: createLocaleString(aboutContentFr.ctaText, aboutContentEn.ctaText, aboutContentDe.ctaText),
      link: aboutContentFr.ctaLink
    },
    quote: createLocaleText(aboutContentFr.quote, aboutContentEn.quote, aboutContentDe.quote)
    // Image to be added manually in Studio
  }

  try {
    await client.createOrReplace(doc)
    console.log('✅ Created aboutPage singleton')
  } catch (error: any) {
    console.error('❌ Error creating aboutPage:', error.message)
  }
}

// ===== MAIN EXECUTION =====

async function main() {
  console.log('🚀 Starting migration to Sanity...\n')
  console.log('Project ID:', 'btjdqrld')
  console.log('Dataset:', 'production')
  
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('❌ SANITY_WRITE_TOKEN not found in .env')
    process.exit(1)
  }

  try {
    // 1. Migrate client types first (needed for home page references)
    const clientTypeIds = await migrateClientTypes()
    
    // 2. Migrate services (needed for services page references)
    const serviceIds = await migrateServices()
    
    // 3. Migrate team members (needed for team page references)
    const teamMemberIds = await migrateTeamMembers()
    
    // 4. Migrate page singletons
    await migrateHomePage(clientTypeIds)
    await migrateServicesPage(serviceIds)
    await migrateTeamPage(teamMemberIds)
    await migrateAboutPage()

    console.log('\n✅ Migration completed successfully!')
    console.log('\n📝 Next steps:')
    console.log('1. Upload images manually in Sanity Studio')
    console.log('2. Update image references in documents')
    console.log('3. Create articles and link them to homePage.blogSection')
    console.log('4. Add partners to homePage.partnersSection')
    
  } catch (error: any) {
    console.error('\n❌ Migration failed:', error.message)
    process.exit(1)
  }
}

main()
