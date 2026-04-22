/**
 * Seed complet du site Swiss Ecogestes :
 * - aboutPage (correction des données)
 * - blogPage (configuration de la page)
 * - servicePage x4 (villa, gérance, entreprise, communes)
 * - settings (footer, réseaux sociaux)
 *
 * Usage : cd studio && npx sanity exec scripts/seed-site-content.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

function loc(fr: string, en: string, de: string) {
  return { fr, en, de }
}

// ─────────────────────────────────────────────
// ABOUT PAGE (correction)
// ─────────────────────────────────────────────
async function upsertAboutPage() {
  await client.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    sectionLabel: loc('Pourquoi Swiss Ecogestes', 'Why Swiss Ecogestes', 'Warum Swiss Ecogestes'),
    title: loc(
      'Vous méritez un avis honnête, pas une vente déguisée.',
      'You deserve honest advice, not a disguised sales pitch.',
      'Sie verdienen einen ehrlichen Rat, keinen verdeckten Verkauf.'
    ),
    paragraph1: loc(
      "Notre seul intérêt : que vous économisiez. Pas de matériel à vendre, pas de marges cachées. Juste votre intérêt, en priorité.",
      "Our only interest: your savings. No equipment to sell, no hidden margins. Just your interest, as a priority.",
      "Unser einziges Interesse: Ihre Einsparungen. Kein Material zu verkaufen, keine versteckten Margen. Nur Ihr Interesse, als Priorität."
    ),
    paragraph2: loc(
      "Chez Swiss Ecogestes, nous sommes convaincus que la transition énergétique passe par des actions concrètes, mesurables et rentables. Nous accompagnons propriétaires, entreprises et collectivités avec une approche pragmatique : réduire les consommations, optimiser les installations et générer un impact réel, à la fois économique et environnemental.",
      "At Swiss Ecogestes, we believe energy transition happens through concrete, measurable and profitable actions. We support property owners, businesses and municipalities with a pragmatic approach: reducing consumption, optimising installations and generating real impact — both economic and environmental.",
      "Bei Swiss Ecogestes sind wir überzeugt, dass die Energiewende durch konkrete, messbare und rentable Maßnahmen gelingt. Wir begleiten Eigentümer, Unternehmen und Gemeinden mit einem pragmatischen Ansatz: Verbrauch senken, Anlagen optimieren und echte Wirkung erzielen — wirtschaftlich und ökologisch."
    ),
    values: [
      {
        _key: 'val-neutre',
        title: loc('Neutre', 'Neutral', 'Neutral'),
        subtitle: loc(
          'Recommandations indépendantes, sans intérêt commercial',
          'Independent recommendations, no commercial interest',
          'Unabhängige Empfehlungen, kein kommerzielles Interesse'
        ),
      },
      {
        _key: 'val-proximite',
        title: loc('Proximité', 'Proximity', 'Nähe'),
        subtitle: loc(
          'Expertise terrain, ancrage local en Suisse romande',
          'Field expertise, local presence in French-speaking Switzerland',
          'Vor-Ort-Expertise, lokale Präsenz in der Westschweiz'
        ),
      },
      {
        _key: 'val-efficacite',
        title: loc('Efficacité', 'Efficiency', 'Effizienz'),
        subtitle: loc(
          'Actions concrètes, résultats mesurables',
          'Concrete actions, measurable results',
          'Konkrete Maßnahmen, messbare Ergebnisse'
        ),
      },
    ],
    cta: {
      text: loc('Découvrir notre ADN', 'Discover our DNA', 'Entdecken Sie unsere DNA'),
      link: '/team',
    },
    quote: loc(
      "Grâce à Swiss Ecogestes, j'ai pu réduire mes charges et identifier des aides que je ne connaissais pas.",
      "Thanks to Swiss Ecogestes, I was able to reduce my costs and find subsidies I didn't even know existed.",
      "Dank Swiss Ecogestes konnte ich meine Kosten senken und Fördermittel finden, von denen ich nichts wusste."
    ),
    quoteAuthor: loc(
      'Marc D. — Propriétaire, Genève',
      'Marc D. — Property owner, Geneva',
      'Marc D. — Eigentümer, Genf'
    ),
  })
  console.log('aboutPage: mis à jour')
}

// ─────────────────────────────────────────────
// BLOG PAGE
// ─────────────────────────────────────────────
async function upsertBlogPage() {
  await client.createOrReplace({
    _id: 'blogPage',
    _type: 'blogPage',
    seo: {
      title: loc(
        'Actualités & Ressources | Swiss Ecogestes',
        'News & Resources | Swiss Ecogestes',
        'Aktuelles & Ressourcen | Swiss Ecogestes'
      ),
      description: loc(
        "Retrouvez nos derniers articles, guides et actualités sur la transition énergétique, le solaire et les économies d'énergie en Suisse.",
        'Find our latest articles, guides, and news on energy transition, solar, and energy savings in Switzerland.',
        'Finden Sie unsere neuesten Artikel, Ratgeber und Nachrichten zur Energiewende, Solar und Energieeinsparung in der Schweiz.'
      ),
    },
    hero: {
      sectionLabel: loc("Le Journal de l'Énergie", 'The Energy Journal', 'Energie-Journal'),
      title: loc('Actualités &', 'News &', 'Aktuelles &'),
      titleHighlight: loc('Ressources', 'Resources', 'Ressourcen'),
      description: loc(
        "Décrypter la transition énergétique. Des guides pratiques, des analyses de marché et les dernières actualités sur les subventions.",
        'Decoding the energy transition. Practical guides, market analyses, and the latest news on subsidies.',
        'Entschlüsselung der Energiewende. Praktische Ratgeber, Marktanalysen und die neuesten Nachrichten zu Subventionen.'
      ),
    },
    categories: {
      fr: ['À la une', 'Conseils', 'Actualité', 'Technique'],
      en: ['Featured', 'Tips', 'News', 'Technical'],
      de: ['Aktuell', 'Tipps', 'Neuigkeiten', 'Technik'],
    },
  })
  console.log('blogPage: créé')
}

// ─────────────────────────────────────────────
// SETTINGS (footer)
// ─────────────────────────────────────────────
async function upsertSettings() {
  await client.createOrReplace({
    _id: 'settings',
    _type: 'settings',
    siteName: 'Swiss Ecogestes',
    siteDescription: 'Votre partenaire expert pour la transition énergétique en Suisse Romande. Solutions durables et accompagnement sur-mesure.',
    email: 'info@swissecogestes.ch',
    phone: '',
    address: 'Vaud & Genève',
    socialMedia: {
      linkedin: 'https://www.linkedin.com/company/swissecogestes/',
      instagram: 'https://www.instagram.com/swissecogestes/',
    },
    footerInfo: {
      slogan: loc(
        'Votre partenaire expert pour la transition énergétique en Suisse Romande. Solutions durables et accompagnement sur-mesure.',
        'Your expert partner for energy transition in French-speaking Switzerland. Sustainable solutions and tailored support.',
        'Ihr Expertenpartner für die Energiewende in der Westschweiz. Nachhaltige Lösungen und maßgeschneiderte Begleitung.'
      ),
      copyright: loc(
        '© 2026 Swiss Ecogestes - Tous droits réservés.',
        '© 2026 Swiss Ecogestes - All rights reserved.',
        '© 2026 Swiss Ecogestes - Alle Rechte vorbehalten.'
      ),
    },
    contactInfo: {
      email: 'info@swissecogestes.ch',
      phone: '',
      address: 'Vaud & Genève',
    },
  })
  console.log('settings: mis à jour')
}

// ─────────────────────────────────────────────
// SERVICE PAGE — VILLAS & MAISONS
// ─────────────────────────────────────────────
async function upsertVillaPage() {
  await client.createOrReplace({
    _id: 'servicePage-villa',
    _type: 'servicePage',
    pageSlug: 'villa',
    seo: {
      title: loc(
        'Solutions Villas & Maisons | Swiss Ecogestes',
        'Solutions Villas & Houses | Swiss Ecogestes',
        'Lösungen Villen & Häuser | Swiss Ecogestes'
      ),
      description: loc(
        "Swiss Ecogestes accompagne les propriétaires de villas dans leur transition énergétique : audits CECB, pompes à chaleur, solaire photovoltaïque.",
        "Swiss Ecogestes supports villa and house owners in their energy transition: CECB audits, heat pumps, solar PV.",
        "Swiss Ecogestes begleitet Villen- und Hausbesitzer bei der Energiewende: CECB-Audits, Wärmepumpen, Photovoltaik."
      ),
    },
    sectionLabel: loc('Particuliers', 'Individuals', 'Privatpersonen'),
    title: loc(
      'La transition énergétique simple et rentable',
      'Energy transition made simple and profitable',
      'Energiewende einfach und rentabel'
    ),
    description: loc(
      "Swiss Ecogestes accompagne les propriétaires de villas et maisons vers une autonomie durable avec des solutions d'audit et de rénovation haute performance.",
      "Swiss Ecogestes accompanies villa and house owners towards sustainable autonomy with high-performance audit and renovation solutions.",
      "Swiss Ecogestes begleitet Villen- und Hausbesitzer mit leistungsstarken Audit- und Renovierungslösungen in eine nachhaltige Unabhängigkeit."
    ),
    buttonText: loc('Nous contacter', 'Contact us', 'Kontaktieren Sie uns'),
    buttonLink: '/contact',
    backLink: loc('Retour à nos solutions', 'Back to our solutions', 'Zurück zu unseren Lösungen'),
    services: [
      {
        _key: 'villa-s1',
        title: loc('Visite Villa SIG', 'SIG Villa Visit', 'SIG Villenbesuch'),
        description: loc(
          "Audit complet pour identifier rapidement les économies possibles et les améliorations les plus pertinentes pour votre maison.",
          "Comprehensive audit to quickly identify possible savings and the most relevant improvements for your home.",
          "Umfassender Audit, um schnell mögliche Einsparungen und die relevantesten Verbesserungen für Ihr Haus zu identifizieren."
        ),
        features: {
          fr: ['Analyse et optimisation des consommations', 'Installation de matériel efficient', 'Identification des mesures d\'assainissement', 'Diagnostic de la chaudière', 'Étude de faisabilité solaire photovoltaïque', 'Conseils pratiques sur l\'isolation et les écogestes', 'Jusqu\'à 80 % subventionné'],
          en: ['Consumption analysis and optimisation', 'Efficient equipment installation', 'Identification of renovation measures', 'Boiler diagnosis', 'Solar photovoltaic feasibility study', 'Practical advice on insulation and eco-actions', 'Up to 80% subsidised'],
          de: ['Verbrauchsanalyse und -optimierung', 'Installation effizienter Geräte', 'Identifizierung von Sanierungsmaßnahmen', 'Kesseldiagnose', 'Machbarkeitsstudie Photovoltaik', 'Praktische Tipps zu Dämmung und Ökogesten', 'Bis zu 80 % subventioniert'],
        },
        note: loc('', '', ''),
      },
      {
        _key: 'villa-s2',
        title: loc('Audit Chauffage (gratuit)*', 'Heating Audit (free)*', 'Heizungsaudit (kostenlos)*'),
        description: loc(
          "Votre installation a plus de 10 ans ? On analyse, conseille, et identifie les aides disponibles, sans frais.",
          "Is your installation more than 10 years old? We analyse, advise, and identify available subsidies, at no cost.",
          "Ist Ihre Anlage älter als 10 Jahre? Wir analysieren, beraten und identifizieren verfügbare Fördergelder — kostenlos."
        ),
        features: {
          fr: ['Diagnostic complet', 'Recommandations renouvelables', 'Subventions cantonales', '100 % gratuit, subventionné SuisseEnergie'],
          en: ['Full diagnostic', 'Renewable recommendations', 'Cantonal subsidies', '100% free, subsidised by SwissEnergy'],
          de: ['Vollständige Diagnose', 'Erneuerbare Empfehlungen', 'Kantonale Fördergelder', '100 % kostenlos, durch SuisseEnergie subventioniert'],
        },
        note: loc('* Sous conditions', '* Subject to conditions', '* Unter Bedingungen'),
      },
      {
        _key: 'villa-s3',
        title: loc('Calcul IDC', 'IDC Calculation', 'IDC-Berechnung'),
        description: loc(
          "Pilotez la performance énergétique de votre bâtiment en toute conformité. Nous réalisons le calcul IDC afin de vous donner une vision claire de vos consommations et d'identifier rapidement les éventuels besoins d'action.",
          "Manage your building's energy performance in full compliance. We perform the IDC calculation to give you a clear view of your consumption and quickly identify any action needs.",
          "Steuern Sie die Energieleistung Ihres Gebäudes vollständig konform. Wir führen die IDC-Berechnung durch, um Ihnen einen klaren Überblick über Ihren Verbrauch zu geben und schnell Handlungsbedarf zu identifizieren."
        ),
        features: {
          fr: ['Calcul précis et certifié', 'Respect des obligations légales', 'Vision claire de la performance énergétique'],
          en: ['Precise and certified calculation', 'Compliance with legal obligations', 'Clear view of energy performance'],
          de: ['Präzise und zertifizierte Berechnung', 'Einhaltung gesetzlicher Verpflichtungen', 'Klarer Überblick über Energieleistung'],
        },
        note: loc('', '', ''),
      },
      {
        _key: 'villa-s4',
        title: loc('CECB & CECB+', 'CECB & CECB+', 'GEAK & GEAK+'),
        description: loc(
          "Analyse officielle de l'étiquette énergétique de votre bâtiment. Le CECB+ inclut un rapport de conseil complet avec scénarios de rénovation chiffrés.",
          "Official analysis of your building's energy label. CECB+ includes a full advisory report with costed renovation scenarios.",
          "Offizielle Analyse des Energieausweises Ihres Gebäudes. GEAK+ enthält einen vollständigen Beratungsbericht mit bezifferten Sanierungsszenarien."
        ),
        features: {
          fr: ['Analyse complète de l\'enveloppe thermique', 'Étiquette énergétique officielle (A à G)', 'Rapport de conseil avec scénarios de travaux', 'Estimation des coûts et des subventions', 'Accompagnement administratif complet'],
          en: ['Full thermal envelope analysis', 'Official energy label (A to G)', 'Advisory report with work scenarios', 'Cost and subsidy estimation', 'Full administrative support'],
          de: ['Vollständige Analyse der Thermohülle', 'Offizieller Energieausweis (A bis G)', 'Beratungsbericht mit Renovierungsszenarien', 'Kosten- und Fördergelerschätzung', 'Vollständige administrative Begleitung'],
        },
        note: loc('', '', ''),
      },
      {
        _key: 'villa-s5',
        title: loc('Audit sur Mesure', 'Tailored Audit', 'Maßgeschneiderter Audit'),
        description: loc(
          "Une approche flexible pour répondre précisément à vos besoins.",
          "A flexible approach to precisely meet your needs.",
          "Ein flexibler Ansatz, um Ihren Bedürfnissen präzise gerecht zu werden."
        ),
        features: {
          fr: ['Prestation adaptée à votre projet', 'Analyse ciblée selon vos priorités', 'Recommandations personnalisées', 'Actions proposées selon votre budget et objectifs', 'Accompagnement sur mesure'],
          en: ['Service tailored to your project', 'Targeted analysis according to your priorities', 'Personalised recommendations', 'Actions proposed according to your budget and goals', 'Tailored support'],
          de: ['Leistung auf Ihr Projekt zugeschnitten', 'Zielgerichtete Analyse nach Ihren Prioritäten', 'Personalisierte Empfehlungen', 'Vorgeschlagene Maßnahmen nach Budget und Zielen', 'Maßgeschneiderte Begleitung'],
        },
        note: loc('', '', ''),
      },
    ],
  })
  console.log('servicePage (villa): créé')
}

// ─────────────────────────────────────────────
// SERVICE PAGE — GÉRANCE
// ─────────────────────────────────────────────
async function upsertGerancePage() {
  await client.createOrReplace({
    _id: 'servicePage-gerance',
    _type: 'servicePage',
    pageSlug: 'gerance',
    seo: {
      title: loc(
        'Solutions Régies & Immeubles | Swiss Ecogestes',
        'Solutions Real Estate | Swiss Ecogestes',
        'Lösungen Immobilienverwaltung | Swiss Ecogestes'
      ),
      description: loc(
        'Valorisez votre parc immobilier et anticipez les obligations légales avec nos audits IDC et stratégies de rénovation.',
        'Enhance your property portfolio and anticipate legal obligations with our IDC audits and renovation strategies.',
        'Werten Sie Ihr Immobilienportfolio auf und antizipieren Sie gesetzliche Verpflichtungen mit unseren IDC-Audits und Renovierungsstrategien.'
      ),
    },
    sectionLabel: loc('Gestionnaires', 'Property Managers', 'Immobilienverwalter'),
    title: loc(
      'Partenaire des régies immobilières',
      'Partner for Real Estate Agencies',
      'Partner für Immobilienverwaltungen'
    ),
    description: loc(
      'Valorisez votre parc immobilier et anticipez les obligations légales avec nos audits IDC et stratégies de rénovation énergétique.',
      'Enhance your property portfolio and anticipate legal obligations with our IDC audits and energy renovation strategies.',
      'Werten Sie Ihr Immobilienportfolio auf und antizipieren Sie gesetzliche Verpflichtungen mit unseren IDC-Audits und Energierenovierungsstrategien.'
    ),
    buttonText: loc('Nous contacter', 'Contact us', 'Kontaktieren Sie uns'),
    buttonLink: '/contact',
    backLink: loc('Retour à nos solutions', 'Back to our solutions', 'Zurück zu unseren Lösungen'),
    services: [
      {
        _key: 'ger-s1',
        title: loc('GED — Gestionnaire Énergie Délégué', 'DEM — Delegated Energy Manager', 'DEV — Delegiertes Energiemanagement'),
        description: loc(
          "Analyse globale du portefeuille immobilier. Identification des objets prioritaires pour la rénovation et mise en place d'actions concrètes.",
          "Global analysis of the property portfolio. Identification of priority properties for renovation and implementation of concrete actions.",
          "Globale Analyse des Immobilienportfolios. Identifizierung vorrangiger Objekte für die Renovierung und Umsetzung konkreter Maßnahmen."
        ),
        features: {
          fr: ['COE (contrat d\'optimisation énergétique)', 'Audit circulateurs', 'Audit ventilation', 'Évaluation de l\'équilibrage hydraulique', 'Audit du local déchets', 'Audit éclairage'],
          en: ['EOC (energy optimisation contract)', 'Circulator audit', 'Ventilation audit', 'Hydraulic balancing assessment', 'Waste room audit', 'Lighting audit'],
          de: ['EOV (Energieoptimierungsvertrag)', 'Umwälzpumpen-Audit', 'Lüftungsaudit', 'Hydraulische Abgleichbewertung', 'Abfallraum-Audit', 'Beleuchtungsaudit'],
        },
        note: loc('', '', ''),
      },
      {
        _key: 'ger-s2',
        title: loc('Écologement (gratuit)*', 'Eco-Housing (free)*', 'Öko-Wohnen (kostenlos)*'),
        description: loc(
          "Réduisez les consommations de votre immeuble, sans travaux lourds. Nos visites permettent d'identifier des économies concrètes et immédiates.",
          "Reduce your building's consumption without major works. Our visits identify concrete and immediate savings.",
          "Reduzieren Sie den Verbrauch Ihres Gebäudes ohne großen Aufwand. Unsere Besuche identifizieren konkrete und sofortige Einsparungen."
        ),
        features: {
          fr: ['Réduction des consommations d\'électricité, de chauffage et d\'eau', 'Sensibilisation des habitants', 'Programme subventionné', 'Actions simples et rapides', 'Valorisation auprès des locataires', 'Installation de matériel efficient'],
          en: ['Reduction in electricity, heating and water consumption', 'Resident awareness', 'Subsidised programme', 'Simple and quick actions', 'Added value for tenants', 'Installation of efficient equipment'],
          de: ['Reduzierung von Strom-, Heizungs- und Wasserverbrauch', 'Bewohnersensibilisierung', 'Subventioniertes Programm', 'Einfache und schnelle Maßnahmen', 'Mehrwert für Mieter', 'Installation effizienter Geräte'],
        },
        note: loc('* Sous conditions', '* Subject to conditions', '* Unter Bedingungen'),
      },
      {
        _key: 'ger-s3',
        title: loc('Audit Chauffage (gratuit)*', 'Heating Audit (free)*', 'Heizungsaudit (kostenlos)*'),
        description: loc(
          "Votre installation a plus de 10 ans ? On analyse, conseille, et identifie les aides disponibles, sans frais.",
          "Is your installation more than 10 years old? We analyse, advise, and identify available subsidies, at no cost.",
          "Ist Ihre Anlage älter als 10 Jahre? Wir analysieren, beraten und identifizieren verfügbare Fördergelder — kostenlos."
        ),
        features: {
          fr: ['Diagnostic complet', 'Recommandations renouvelables', 'Subventions cantonales', '100 % gratuit, subventionné SuisseEnergie'],
          en: ['Full diagnostic', 'Renewable recommendations', 'Cantonal subsidies', '100% free, subsidised by SwissEnergy'],
          de: ['Vollständige Diagnose', 'Erneuerbare Empfehlungen', 'Kantonale Fördergelder', '100 % kostenlos, durch SuisseEnergie subventioniert'],
        },
        note: loc('* Sous conditions', '* Subject to conditions', '* Unter Bedingungen'),
      },
      {
        _key: 'ger-s4',
        title: loc('Calcul IDC', 'IDC Calculation', 'IDC-Berechnung'),
        description: loc(
          "Pilotez la performance énergétique de votre bâtiment en toute conformité. Nous réalisons le calcul IDC afin de vous donner une vision claire de vos consommations.",
          "Manage your building's energy performance in full compliance. We perform the IDC calculation to give you a clear view of your consumption.",
          "Steuern Sie die Energieleistung Ihres Gebäudes vollständig konform. Wir führen die IDC-Berechnung durch, um Ihnen einen klaren Überblick zu geben."
        ),
        features: {
          fr: ['Calcul précis et certifié', 'Respect des obligations légales', 'Vision claire de la performance énergétique'],
          en: ['Precise and certified calculation', 'Compliance with legal obligations', 'Clear view of energy performance'],
          de: ['Präzise und zertifizierte Berechnung', 'Einhaltung gesetzlicher Verpflichtungen', 'Klarer Überblick über Energieleistung'],
        },
        note: loc('', '', ''),
      },
      {
        _key: 'ger-s5',
        title: loc('Accompagnement AMU', 'AMU Support', 'AMU-Begleitung'),
        description: loc(
          "Facilitez vos projets de rénovation et maximisez leur impact. Nous intégrons les usagers au cœur du projet pour garantir le bon usage et la performance des bâtiments.",
          "Facilitate your renovation projects and maximise their impact. We integrate users at the heart of the project to ensure proper use and building performance.",
          "Erleichtern Sie Ihre Renovierungsprojekte und maximieren Sie deren Wirkung. Wir integrieren Nutzer ins Zentrum des Projekts, um den richtigen Gebrauch und die Gebäudeleistung sicherzustellen."
        ),
        features: {
          fr: ['Accompagnement avant, pendant et après travaux', 'Implication des occupants pour éviter les blocages', 'Optimisation de l\'usage réel du bâtiment', 'Meilleure atteinte des objectifs énergétiques'],
          en: ['Support before, during and after works', 'Occupant involvement to avoid blockages', 'Optimisation of actual building use', 'Better achievement of energy objectives'],
          de: ['Begleitung vor, während und nach den Arbeiten', 'Einbeziehung der Bewohner zur Vermeidung von Blockaden', 'Optimierung der tatsächlichen Gebäudenutzung', 'Bessere Erreichung der Energieziele'],
        },
        note: loc('', '', ''),
      },
      {
        _key: 'ger-s6',
        title: loc('Audit sur Mesure', 'Tailored Audit', 'Maßgeschneiderter Audit'),
        description: loc(
          "Chaque bâtiment est unique. Votre audit aussi.",
          "Every building is unique. So is your audit.",
          "Jedes Gebäude ist einzigartig. Ihr Audit auch."
        ),
        features: {
          fr: ['Adapté à vos contraintes & objectifs', 'Recommandations actionnables', 'Premier échange sans engagement'],
          en: ['Adapted to your constraints & objectives', 'Actionable recommendations', 'First exchange with no commitment'],
          de: ['Angepasst an Ihre Einschränkungen & Ziele', 'Umsetzbare Empfehlungen', 'Erster Austausch ohne Verpflichtung'],
        },
        note: loc('', '', ''),
      },
    ],
  })
  console.log('servicePage (gerance): créé')
}

// ─────────────────────────────────────────────
// SERVICE PAGE — ENTREPRISE
// ─────────────────────────────────────────────
async function upsertEntreprisePage() {
  await client.createOrReplace({
    _id: 'servicePage-entreprise',
    _type: 'servicePage',
    pageSlug: 'entreprise',
    seo: {
      title: loc(
        'Solutions Entreprises & PME | Swiss Ecogestes',
        'Solutions Businesses & SMEs | Swiss Ecogestes',
        'Lösungen Unternehmen & KMU | Swiss Ecogestes'
      ),
      description: loc(
        "Réduisez vos coûts d'exploitation et conformez-vous aux nouvelles exigences légales avec nos audits grands consommateurs.",
        'Reduce operating costs and comply with new legal requirements with our large consumer audits.',
        'Senken Sie Betriebskosten und erfüllen Sie neue gesetzliche Anforderungen mit unseren Großverbraucher-Audits.'
      ),
    },
    sectionLabel: loc('Professionnels', 'Professionals', 'Fachleute'),
    title: loc(
      'Performance énergétique industrielle',
      'Industrial Energy Performance',
      'Industrielle Energieeffizienz'
    ),
    description: loc(
      "Nos audits permettent d'identifier rapidement des leviers d'économie, de réduire les coûts d'exploitation et d'assurer la conformité aux exigences légales, avec des recommandations concrètes et des subventions intéressantes.",
      "Our audits quickly identify savings levers, reduce operating costs and ensure compliance with legal requirements, with concrete recommendations and attractive subsidies.",
      "Unsere Audits identifizieren schnell Einsparpotenziale, senken Betriebskosten und gewährleisten die Einhaltung gesetzlicher Anforderungen, mit konkreten Empfehlungen und attraktiven Fördergeldern."
    ),
    buttonText: loc('Nous contacter', 'Contact us', 'Kontaktieren Sie uns'),
    buttonLink: '/contact',
    backLink: loc('Retour à nos solutions', 'Back to our solutions', 'Zurück zu unseren Lösungen'),
    services: [
      {
        _key: 'ent-s1',
        title: loc('Visite Conseil (gratuite)*', 'Advisory Visit (free)*', 'Beratungsbesuch (kostenlos)*'),
        description: loc(
          "Une première analyse gratuite pour repérer les actions simples et rentables permettant de réduire vos consommations et vos coûts.",
          "A free initial analysis to identify simple and profitable actions to reduce your consumption and costs.",
          "Eine kostenlose Erstanalyse, um einfache und rentable Maßnahmen zur Reduzierung Ihres Verbrauchs und Ihrer Kosten zu identifizieren."
        ),
        features: {
          fr: ['Analyse rapide', 'Conseils ciblés', 'Économies immédiates', 'Matériel efficient', 'Gratuite*'],
          en: ['Quick analysis', 'Targeted advice', 'Immediate savings', 'Efficient equipment', 'Free*'],
          de: ['Schnelle Analyse', 'Gezielte Beratung', 'Sofortige Einsparungen', 'Effiziente Geräte', 'Kostenlos*'],
        },
        note: loc('* Sous conditions', '* Subject to conditions', '* Unter Bedingungen'),
      },
      {
        _key: 'ent-s2',
        title: loc('Visite Expertise', 'Expert Visit', 'Expertenbesuch'),
        description: loc(
          "Une analyse plus approfondie de vos installations et de vos usages pour identifier les optimisations et prioriser les actions à fort impact.",
          "A more in-depth analysis of your installations and usage to identify optimisations and prioritise high-impact actions.",
          "Eine eingehendere Analyse Ihrer Anlagen und Nutzung, um Optimierungen zu identifizieren und wirkungsstarke Maßnahmen zu priorisieren."
        ),
        features: {
          fr: ['Diagnostic approfondi', 'Recommandations ciblées', 'Priorisation des actions', 'Aides disponibles', 'Subventionnée'],
          en: ['In-depth diagnostic', 'Targeted recommendations', 'Action prioritisation', 'Available subsidies', 'Subsidised'],
          de: ['Eingehende Diagnose', 'Gezielte Empfehlungen', 'Maßnahmenpriorisierung', 'Verfügbare Fördergelder', 'Subventioniert'],
        },
        note: loc('', '', ''),
      },
      {
        _key: 'ent-s3',
        title: loc('Audit PEIK', 'PEIK Audit', 'PEIK-Audit'),
        description: loc(
          "Pour les entreprises consommant plus de 100'000 kWh/an. Un audit énergétique structuré qui permet d'évaluer précisément vos consommations, de chiffrer les économies potentielles et de définir un plan d'action clair et rentable.",
          "For companies consuming more than 100,000 kWh/year. A structured energy audit to precisely evaluate your consumption, quantify potential savings and define a clear, profitable action plan.",
          "Für Unternehmen mit einem Verbrauch von mehr als 100.000 kWh/Jahr. Ein strukturierter Energieaudit zur präzisen Bewertung Ihres Verbrauchs, Bezifferung potenzieller Einsparungen und Erstellung eines klaren, rentablen Aktionsplans."
        ),
        features: {
          fr: ['Diagnostic complet', 'Mesures prioritaires', 'Économies chiffrées', 'Plan d\'action clair', '50 % à 70 % subventionné'],
          en: ['Full diagnostic', 'Priority measures', 'Quantified savings', 'Clear action plan', '50% to 70% subsidised'],
          de: ['Vollständige Diagnose', 'Vorrangige Maßnahmen', 'Bezifferte Einsparungen', 'Klarer Aktionsplan', '50 % bis 70 % subventioniert'],
        },
        note: loc('', '', ''),
      },
      {
        _key: 'ent-s4',
        title: loc('Audit Chauffage (gratuit)*', 'Heating Audit (free)*', 'Heizungsaudit (kostenlos)*'),
        description: loc(
          "Votre installation a plus de 10 ans ? On analyse, conseille, et identifie les aides disponibles, sans frais.",
          "Is your installation more than 10 years old? We analyse, advise, and identify available subsidies, at no cost.",
          "Ist Ihre Anlage älter als 10 Jahre? Wir analysieren, beraten und identifizieren verfügbare Fördergelder — kostenlos."
        ),
        features: {
          fr: ['Diagnostic complet', 'Recommandations renouvelables', 'Subventions cantonales', '100 % gratuit, subventionné SuisseEnergie'],
          en: ['Full diagnostic', 'Renewable recommendations', 'Cantonal subsidies', '100% free, subsidised by SwissEnergy'],
          de: ['Vollständige Diagnose', 'Erneuerbare Empfehlungen', 'Kantonale Fördergelder', '100 % kostenlos, durch SuisseEnergie subventioniert'],
        },
        note: loc('* Sous conditions', '* Subject to conditions', '* Unter Bedingungen'),
      },
      {
        _key: 'ent-s5',
        title: loc('Calcul IDC', 'IDC Calculation', 'IDC-Berechnung'),
        description: loc(
          "Pilotez la performance énergétique de votre bâtiment en toute conformité. Nous réalisons le calcul IDC afin de vous donner une vision claire de vos consommations.",
          "Manage your building's energy performance in full compliance. We perform the IDC calculation to give you a clear view of your consumption.",
          "Steuern Sie die Energieleistung Ihres Gebäudes vollständig konform. IDC-Berechnung für einen klaren Überblick."
        ),
        features: {
          fr: ['Calcul précis et certifié', 'Respect des obligations légales', 'Vision claire de la performance énergétique'],
          en: ['Precise and certified calculation', 'Compliance with legal obligations', 'Clear view of energy performance'],
          de: ['Präzise und zertifizierte Berechnung', 'Einhaltung gesetzlicher Verpflichtungen', 'Klarer Überblick über Energieleistung'],
        },
        note: loc('', '', ''),
      },
      {
        _key: 'ent-s6',
        title: loc('Audit sur Mesure', 'Tailored Audit', 'Maßgeschneiderter Audit'),
        description: loc(
          "Une analyse ciblée selon vos enjeux réels pour concentrer vos efforts sur les leviers les plus pertinents.",
          "A targeted analysis based on your real challenges to focus your efforts on the most relevant levers.",
          "Eine gezielte Analyse basierend auf Ihren realen Herausforderungen, um Ihre Bemühungen auf die relevantesten Hebel zu konzentrieren."
        ),
        features: {
          fr: ['Besoins spécifiques', 'Analyse ciblée', 'Actions concrètes', 'Suivi personnalisé'],
          en: ['Specific needs', 'Targeted analysis', 'Concrete actions', 'Personalised follow-up'],
          de: ['Spezifische Bedürfnisse', 'Zielgerichtete Analyse', 'Konkrete Maßnahmen', 'Personalisierte Nachverfolgung'],
        },
        note: loc('', '', ''),
      },
    ],
  })
  console.log('servicePage (entreprise): créé')
}

// ─────────────────────────────────────────────
// SERVICE PAGE — COMMUNES
// ─────────────────────────────────────────────
async function upsertCommunesPage() {
  await client.createOrReplace({
    _id: 'servicePage-communes',
    _type: 'servicePage',
    pageSlug: 'communes',
    seo: {
      title: loc(
        'Solutions Communes & GRD | Swiss Ecogestes',
        'Solutions Municipalities & GRD | Swiss Ecogestes',
        'Lösungen Gemeinden & GRD | Swiss Ecogestes'
      ),
      description: loc(
        'Swiss Ecogestes soutient les communes et services industriels dans leur stratégie de transition énergétique territoriale.',
        'Swiss Ecogestes supports municipalities and industrial services in their territorial energy transition strategy.',
        'Swiss Ecogestes unterstützt Gemeinden und Industriedienste bei ihrer kommunalen Energiewende-Strategie.'
      ),
    },
    sectionLabel: loc('Collectivités', 'Municipalities', 'Gemeinden'),
    title: loc(
      'Accompagnement des collectivités',
      'Support for Collectivities',
      'Unterstützung für Gemeinden'
    ),
    description: loc(
      'Swiss Ecogestes soutient les communes et services industriels dans leur stratégie de transition énergétique territoriale.',
      'Swiss Ecogestes supports municipalities and industrial services in their territorial energy transition strategy.',
      'Swiss Ecogestes unterstützt Gemeinden und Industriedienste bei ihrer kommunalen Energiewende-Strategie.'
    ),
    buttonText: loc('Nous contacter', 'Contact us', 'Kontaktieren Sie uns'),
    buttonLink: '/contact',
    backLink: loc('Retour à nos solutions', 'Back to our solutions', 'Zurück zu unseren Lösungen'),
    services: [
      {
        _key: 'com-s1',
        title: loc("Audit Général & Plan d'Action", 'General Audit & Action Plan', 'Allgemeiner Audit & Aktionsplan'),
        description: loc(
          "Une approche structurée pour définir vos priorités et transformer vos objectifs en actions concrètes.",
          "A structured approach to define your priorities and transform your objectives into concrete actions.",
          "Ein strukturierter Ansatz zur Definition Ihrer Prioritäten und zur Umsetzung Ihrer Ziele in konkrete Maßnahmen."
        ),
        features: {
          fr: ['Analyse de vos objectifs énergétiques, climatiques et réglementaires', 'Évaluation des potentiels d\'amélioration', 'Élaboration d\'un plan d\'action clair et réaliste', 'Déploiement progressif des mesures', 'Suivi complet'],
          en: ['Analysis of your energy, climate and regulatory objectives', 'Assessment of improvement potential', 'Development of a clear and realistic action plan', 'Progressive deployment of measures', 'Full follow-up'],
          de: ['Analyse Ihrer Energie-, Klima- und Regulierungsziele', 'Bewertung des Verbesserungspotenzials', 'Entwicklung eines klaren und realistischen Aktionsplans', 'Schrittweise Umsetzung der Maßnahmen', 'Vollständige Nachverfolgung'],
        },
        note: loc('', '', ''),
      },
      {
        _key: 'com-s2',
        title: loc('Mesures Concrètes', 'Concrete Measures', 'Konkrete Maßnahmen'),
        description: loc(
          "Des solutions adaptées aux différents publics de votre territoire, pour passer de la stratégie à l'action.",
          "Solutions adapted to the different audiences in your territory, to move from strategy to action.",
          "Auf die verschiedenen Zielgruppen Ihres Gebiets zugeschnittene Lösungen, um von der Strategie zur Aktion zu gelangen."
        ),
        features: {
          fr: ['Bâtiments communaux — audits et rénovation énergétique', 'Immeubles et régies — GED, IDC, écologement', 'Villas et maisons — visite SIG, audit chauffage, CECB', 'Entreprises locales — visite conseil, audit PEIK'],
          en: ['Municipal buildings — energy audits and renovation', 'Buildings and agencies — DEM, IDC, eco-housing', 'Villas and houses — SIG visit, heating audit, CECB', 'Local businesses — advisory visit, PEIK audit'],
          de: ['Kommunale Gebäude — Energieaudits und Renovierung', 'Gebäude und Verwaltungen — DEV, IDC, Öko-Wohnen', 'Villen und Häuser — SIG-Besuch, Heizungsaudit, GEAK', 'Lokale Unternehmen — Beratungsbesuch, PEIK-Audit'],
        },
        note: loc('', '', ''),
      },
    ],
  })
  console.log('servicePage (communes): créé')
}

async function main() {
  console.log('=== Seed complet du site ===')
  await upsertAboutPage()
  await upsertBlogPage()
  await upsertSettings()
  await upsertVillaPage()
  await upsertGerancePage()
  await upsertEntreprisePage()
  await upsertCommunesPage()
  console.log('=== Terminé ===')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
