/**
 * Seed complet Swiss Ecogestes — couvre TOUS les types de documents manquants :
 * homePage, aProposPage, resultatsPage, teamMember ×5, stat ×4, processStep ×4,
 * clientType ×4, contactPage, legalPage ×3, settings (mis à jour)
 *
 * Usage : cd studio && npx sanity exec scripts/seed-complete.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

function loc(fr: string, en: string, de: string) {
  return { fr, en, de }
}

// ─────────────────────────────────────────────
// HOME PAGE — en-têtes de sections
// ─────────────────────────────────────────────
async function upsertHomePage() {
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    statsSection: {
      label: loc('Chiffres Clés', 'Key Figures', 'Kennzahlen'),
      title: loc(
        'Performance, résultats et impact concrets',
        'Performance, results and concrete impact',
        'Leistung, Ergebnisse und konkreter Impact'
      ),
      description: loc(
        "Des résultats mesurables pour votre portefeuille et pour l'environnement suisse.",
        'Measurable results for your wallet and for the Swiss environment.',
        'Messbare Ergebnisse für Ihren Geldbeutel und für die Schweizer Umwelt.'
      ),
    },
    solutionsSection: {
      label: loc('Nos Solutions', 'Our Solutions', 'Unsere Lösungen'),
      title: loc(
        'Une expertise pour chaque profil',
        'Expertise for every profile',
        'Expertise für jedes Profil'
      ),
      description: loc(
        "Que vous soyez propriétaire, régie, entreprise ou collectivité, nous avons une solution adaptée à vos besoins.",
        'Whether you are a property owner, management company, business or municipality, we have a solution tailored to your needs.',
        'Ob Eigentümer, Hausverwaltung, Unternehmen oder Gemeinde — wir haben eine Lösung für Ihre Bedürfnisse.'
      ),
    },
    partnersSection: {
      title: loc('Ils nous font confiance', 'They trust us', 'Sie vertrauen uns'),
    },
  })
  console.log('homePage: créé')
}

// ─────────────────────────────────────────────
// ABOUT PAGE (correction cta.link /team → /a-propos)
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
      "Chez Swiss Ecogestes, nous sommes convaincus que la transition énergétique passe par des actions concrètes, mesurables et rentables.",
      "At Swiss Ecogestes, we believe energy transition happens through concrete, measurable and profitable actions.",
      "Bei Swiss Ecogestes sind wir überzeugt, dass die Energiewende durch konkrete, messbare und rentable Maßnahmen gelingt."
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
      link: '/a-propos',
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
// À PROPOS PAGE (page complète)
// ─────────────────────────────────────────────
async function upsertAProposPage() {
  await client.createOrReplace({
    _id: 'aProposPage',
    _type: 'aProposPage',
    heroLabel: loc('À propos de nous', 'About us', 'Über uns'),
    heroTitle: loc(
      'Une approche concrète de la transition énergétique',
      'A concrete approach to energy transition',
      'Ein konkreter Ansatz zur Energiewende'
    ),
    heroIntro: loc(
      "Chez Swiss Ecogestes, nous sommes convaincus que la transition énergétique passe par des actions concrètes, mesurables et rentables. Nous accompagnons propriétaires, régies, entreprises et collectivités avec une approche pragmatique : réduire les consommations, optimiser les installations et générer un impact réel.",
      "At Swiss Ecogestes, we believe energy transition happens through concrete, measurable and profitable actions. We support property owners, agencies, businesses and municipalities with a pragmatic approach: reducing consumption, optimising installations and generating real impact.",
      "Bei Swiss Ecogestes sind wir überzeugt, dass die Energiewende durch konkrete, messbare und rentable Maßnahmen gelingt. Wir begleiten Eigentümer, Verwaltungen, Unternehmen und Gemeinden mit einem pragmatischen Ansatz: Verbrauch senken, Anlagen optimieren und echte Wirkung erzielen."
    ),
    missionTitle: loc('Votre intérêt, notre seule priorité.', 'Your interest, our only priority.', 'Ihr Interesse, unsere einzige Priorität.'),
    missionText: loc(
      "Pas de matériel à vendre, pas de marges cachées. Swiss Ecogestes est un conseil indépendant : nous analysons votre situation, identifions les économies réalisables et maximisons vos subventions — sans conflit d'intérêt.",
      "No equipment to sell, no hidden margins. Swiss Ecogestes is an independent advisory firm: we analyse your situation, identify achievable savings and maximise your subsidies — with no conflict of interest.",
      "Kein Material zu verkaufen, keine versteckten Margen. Swiss Ecogestes ist eine unabhängige Beratungsfirma: Wir analysieren Ihre Situation, identifizieren erreichbare Einsparungen und maximieren Ihre Fördergelder — ohne Interessenkonflikt."
    ),
    missionText2: loc(
      "Notre approche combine expertise terrain, maîtrise des programmes cantonaux (SIG Éco21, SuisseEnergie, Chauffez Renouvelable, OCEN) et accompagnement humain à chaque étape de votre projet.",
      "Our approach combines field expertise, mastery of cantonal programmes (SIG Éco21, SuisseEnergie, Chauffez Renouvelable, OCEN) and personal support at every stage of your project.",
      "Unser Ansatz kombiniert Felderfahrung, Kenntnisse kantonaler Programme (SIG Éco21, SuisseEnergie, Chauffez Renouvelable, OCEN) und persönliche Begleitung in jeder Phase Ihres Projekts."
    ),
    presenceTitle: loc('Actifs en Vaud et à Genève', 'Active in Vaud and Geneva', 'Tätig in Waadt und Genf'),
    presenceText: loc(
      "Nous intervenons principalement dans les cantons de Vaud et de Genève, avec une connaissance approfondie des exigences locales, des programmes de subvention cantonaux et des acteurs institutionnels.",
      "We operate primarily in the cantons of Vaud and Geneva, with in-depth knowledge of local requirements, cantonal subsidy programmes and institutional stakeholders.",
      "Wir sind hauptsächlich in den Kantonen Waadt und Genf tätig, mit fundiertem Wissen über lokale Anforderungen, kantonale Förderprogramme und institutionelle Akteure."
    ),
    companyStats: [
      {
        _key: 'stat-experts',
        value: '5',
        label: loc('Experts certifiés', 'Certified experts', 'Zertifizierte Experten'),
      },
      {
        _key: 'stat-cantons',
        value: '2',
        label: loc('Cantons couverts', 'Cantons covered', 'Abgedeckte Kantone'),
      },
      {
        _key: 'stat-partners',
        value: '6',
        label: loc('Partenaires institutionnels', 'Institutional partners', 'Institutionelle Partner'),
      },
      {
        _key: 'stat-approach',
        value: '100%',
        label: loc('Approche indépendante', 'Independent approach', 'Unabhängiger Ansatz'),
      },
    ],
    qualityTitle: loc(
      'Un processus rigoureux, du début à la fin',
      'A rigorous process, from start to finish',
      'Ein rigoroser Prozess von Anfang bis Ende'
    ),
    qualityText: loc(
      "Chaque audit suit un processus qualité rigoureux, de la première visite jusqu'à la remise du rapport et des recommandations personnalisées.",
      "Every audit follows a rigorous quality process, from the first visit to the delivery of the report and personalised recommendations.",
      "Jede Prüfung folgt einem strengen Qualitätsprozess, vom ersten Besuch bis zur Übergabe des Berichts und der personalisierten Empfehlungen."
    ),
    qualitySteps: {
      fr: ['Visite terrain', 'Analyse technique', 'Rapport détaillé', 'Recommandations', 'Suivi personnalisé'],
      en: ['Site visit', 'Technical analysis', 'Detailed report', 'Recommendations', 'Personalised follow-up'],
      de: ['Vor-Ort-Besuch', 'Technische Analyse', 'Detaillierter Bericht', 'Empfehlungen', 'Persönliches Follow-up'],
    },
    photoTitle: loc('Des experts engagés sur le terrain', 'Committed experts in the field', 'Engagierte Experten vor Ort'),
    photoSubtitle: loc(
      'Ensemble, nous accompagnons chaque client vers des solutions concrètes et durables.',
      'Together, we guide every client towards concrete and sustainable solutions.',
      'Gemeinsam begleiten wir jeden Kunden zu konkreten und nachhaltigen Lösungen.'
    ),
  })
  console.log('aProposPage: créé')
}

// ─────────────────────────────────────────────
// RÉSULTATS PAGE
// ─────────────────────────────────────────────
async function upsertResultatsPage() {
  await client.createOrReplace({
    _id: 'resultatsPage',
    _type: 'resultatsPage',
    seo: {
      title: loc(
        'Résultats & Preuves – Swiss Ecogestes',
        'Results & Proof – Swiss Ecogestes',
        'Ergebnisse & Nachweis – Swiss Ecogestes'
      ),
      description: loc(
        "Performance, résultats et impact concrets. Découvrez nos preuves par l'exemple.",
        'Performance, results and concrete impact. Discover our proof through examples.',
        'Leistung, Ergebnisse und konkrete Auswirkungen. Entdecken Sie unsere Nachweise anhand von Beispielen.'
      ),
    },
    heroTitle: loc(
      'Performance, résultats et impact concrets.',
      'Performance, results and concrete impact.',
      'Leistung, Ergebnisse und konkrete Auswirkungen.'
    ),
    heroSubtitle: loc(
      "Audits, stratégie énergétique et accompagnement pour régies, entreprises, propriétaires et collectivités. Identifiez rapidement vos économies potentielles, les aides disponibles et les actions prioritaires pour améliorer durablement la performance de vos installations.",
      "Audits, energy strategy and support for property managers, businesses, owners and municipalities. Quickly identify your potential savings, available subsidies and priority actions to sustainably improve the performance of your facilities.",
      "Audits, Energiestrategie und Unterstützung für Hausverwaltungen, Unternehmen, Eigentümer und Gemeinden. Identifizieren Sie schnell Ihre potenziellen Einsparungen, verfügbaren Subventionen und vorrangigen Maßnahmen."
    ),
    impactStats: [
      {
        _key: 'impact-audits',
        value: 150,
        suffix: '+',
        label: loc('Audits réalisés', 'Audits completed', 'Durchgeführte Audits'),
      },
      {
        _key: 'impact-batiments',
        value: 300,
        suffix: '+',
        label: loc('Bâtiments accompagnés', 'Buildings supported', 'Begleitete Gebäude'),
      },
      {
        _key: 'impact-economies',
        value: 25,
        suffix: '%',
        prefix: '~ ',
        label: loc("Économies identifiées", 'Savings identified', 'Identifizierte Einsparungen'),
      },
      {
        _key: 'impact-partenaires',
        value: 15,
        suffix: '+',
        label: loc('Partenaires reconnus', 'Recognised partners', 'Anerkannte Partner'),
      },
    ],
    cases: [
      {
        _key: 'case-regie',
        sector: loc('Régie & Immeuble', 'Property Management & Building', 'Hausverwaltung & Gebäude'),
        title: loc(
          'Immeuble locatif, 24 logements — Genève',
          'Rental building, 24 units — Geneva',
          'Mietgebäude mit 24 Einheiten — Genf'
        ),
        mainMetric: 18,
        mainMetricSuffix: '%',
        mainMetricLabel: loc("Économie générée", 'Savings generated', 'Erzielte Einsparungen'),
        kpis: [
          {
            _key: 'kpi-idc',
            value: '650',
            unit: 'MJ/m²a',
            label: loc('Conso. Initiale (IDC)', 'Initial consumption (IDC)', 'Anfänglicher Verbrauch (IDC)'),
          },
          {
            _key: 'kpi-roi',
            value: '12',
            unit: 'mois',
            label: loc('Retour sur investissement', 'Return on investment', 'Amortisationsdauer'),
          },
        ],
        beforeItems: {
          fr: ['Chaufferie vétuste', 'Pompes mal réglées', 'Plaintes récurrentes de locataires pour inconfort estival et surchauffe'],
          en: ['Outdated boiler room', 'Poorly calibrated pumps', 'Recurring tenant complaints about summer discomfort and overheating'],
          de: ['Veraltete Heizzentrale', 'Schlecht eingestellte Pumpen', 'Wiederkehrende Mieterbeschwerden über Sommerwärme und Überhitzung'],
        },
        afterItems: {
          fr: ['Audit IDC', 'Mise en place de la GED', 'Équilibrage hydraulique et optimisation ciblée'],
          en: ['IDC audit', 'Implementation of energy management system', 'Hydraulic balancing and targeted optimization'],
          de: ['IDC-Audit', 'Implementierung eines Energiemanagementsystems', 'Hydraulischer Abgleich und gezielte Optimierung'],
        },
      },
      {
        _key: 'case-villa',
        sector: loc('Villa individuelle', 'Individual Villa', 'Einfamilienhaus'),
        title: loc(
          'Maison familiale — La Côte (VD)',
          'Family home — La Côte (VD)',
          'Einfamilienhaus — La Côte (VD)'
        ),
        mainMetric: 65,
        mainMetricSuffix: '%',
        mainMetricLabel: loc("Frais d'étude couverts", 'Study costs covered', 'Studienkosten gedeckt'),
        kpis: [
          {
            _key: 'kpi-subvention',
            value: '100',
            unit: '%',
            label: loc('Plafond de Subvention', 'Subsidy ceiling', 'Subventionsobergrenze'),
          },
          {
            _key: 'kpi-approbation',
            value: '30',
            unit: 'jours',
            label: loc("Délai d'approbation", 'Approval period', 'Genehmigungsdauer'),
          },
        ],
        beforeItems: {
          fr: ["Chauffage au mazout très coûteux", "Fortes déperditions en toiture", "Sensation d'inconfort face aux courants d'air"],
          en: ['Very expensive oil heating', 'High roof heat losses', 'Discomfort from drafts'],
          de: ['Sehr teure Ölheizung', 'Hohe Wärmeverluste über das Dach', 'Unbehagen durch Zugluft'],
        },
        afterItems: {
          fr: ['Édition intégrale CECB+', 'Conception de scénarios chiffrés', "Montage complet du dossier d'aides"],
          en: ['Complete CECB+ assessment', 'Development of costed scenarios', 'Full subsidy application package'],
          de: ['Vollständige CECB+-Bewertung', 'Erstellung kostenloser Szenarien', 'Komplettes Subventionsantragspaket'],
        },
      },
      {
        _key: 'case-entreprise',
        sector: loc('Entreprise & PME', 'Business & SME', 'Gewerbebetrieb & KMU'),
        title: loc(
          'Site de production industriel — Lausanne',
          'Industrial production facility — Lausanne',
          'Industrielle Produktionsstätte — Lausanne'
        ),
        mainMetric: 22,
        mainMetricSuffix: '%',
        mainMetricLabel: loc('Économies annuelles', 'Annual savings', 'Jährliche Einsparungen'),
        kpis: [
          {
            _key: 'kpi-conso',
            value: '200',
            unit: 'k kWh/an',
            label: loc('Consommation de base', 'Base consumption', 'Basisverbrauch'),
          },
          {
            _key: 'kpi-subv',
            value: '70',
            unit: '%',
            label: loc('Taux subventionnable', 'Eligible subsidy rate', 'Förderfähiger Subventionssatz'),
          },
        ],
        beforeItems: {
          fr: ["Pertes massives sur les réseaux d'air comprimé", 'Groupes de froid mal régulés', 'Risques de non-conformité cantonale'],
          en: ['Massive losses on compressed air networks', 'Poorly regulated cooling units', 'Risk of non-compliance with cantonal standards'],
          de: ['Massive Verluste in Druckluftnetzen', 'Schlecht geregelte Kühleinheiten', 'Risiko der Nichtkonformität mit kantonalen Standards'],
        },
        afterItems: {
          fr: ['Audit PEIK complet', "Intégration d'une récupération de chaleur", "Plan d'action subventionné"],
          en: ['Complete PEIK audit', 'Integration of heat recovery', 'Subsidized action plan'],
          de: ['Vollständiges PEIK-Audit', 'Integration der Wärmeregelung', 'Geförderter Aktionsplan'],
        },
      },
    ],
  })
  console.log('resultatsPage: créé')
}

// ─────────────────────────────────────────────
// STATS (4 chiffres clés accueil)
// ─────────────────────────────────────────────
async function upsertStats() {
  const stats = [
    {
      _id: 'stat-subventions',
      _type: 'stat',
      value: 50,
      prefix: loc("Jusqu'à ", 'Up to ', 'Bis zu '),
      suffix: loc('%', '%', '%'),
      label: loc('De Subventions', 'Subsidies', 'Subventionen'),
      icon: 'Zap',
      order: 1,
    },
    {
      _id: 'stat-economies',
      _type: 'stat',
      value: 20,
      prefix: loc('10 à ', '10 to ', '10 bis '),
      suffix: loc('%', '%', '%'),
      label: loc("D'économies d'énergie", 'Energy Savings', 'Energieeinsparung'),
      icon: 'Leaf',
      order: 2,
    },
    {
      _id: 'stat-roi',
      _type: 'stat',
      value: 2,
      prefix: loc('≈ ', '≈ ', '≈ '),
      suffix: loc(' ans', ' years', ' Jahre'),
      label: loc('Retour sur investissement', 'Return on Investment', 'Kapitalrendite'),
      icon: 'Users',
      order: 3,
    },
    {
      _id: 'stat-partenaires',
      _type: 'stat',
      text: loc('Reconnus', 'Recognized', 'Anerkannt'),
      label: loc('Partenaires Institutionnels', 'Institutional Partners', 'Institutionelle Partner'),
      icon: 'Building2',
      order: 4,
    },
  ]

  for (const stat of stats) {
    await client.createOrReplace(stat)
  }
  console.log('stats ×4: créées')
}

// ─────────────────────────────────────────────
// PROCESS STEPS
// ─────────────────────────────────────────────
async function upsertProcessSteps() {
  const steps = [
    {
      _id: 'processStep-1',
      _type: 'processStep',
      stepNumber: 1,
      title: loc('Prise de contact', 'First contact', 'Erstkontakt'),
      description: loc(
        'Échangez avec un conseiller pour définir vos besoins et objectifs.',
        'Speak with an advisor to define your needs and objectives.',
        'Sprechen Sie mit einem Berater, um Ihre Bedürfnisse und Ziele zu definieren.'
      ),
    },
    {
      _id: 'processStep-2',
      _type: 'processStep',
      stepNumber: 2,
      title: loc('Audit & Diagnostic', 'Audit & Diagnosis', 'Audit & Diagnose'),
      description: loc(
        "Réalisation d'un audit complet de vos installations pour identifier les potentiels d'économie.",
        'Comprehensive audit of your installations to identify savings potential.',
        'Umfassender Audit Ihrer Anlagen zur Identifizierung von Einsparpotenzial.'
      ),
    },
    {
      _id: 'processStep-3',
      _type: 'processStep',
      stepNumber: 3,
      title: loc('Rapport & Recommandations', 'Report & Recommendations', 'Bericht & Empfehlungen'),
      description: loc(
        'Rapport détaillé avec actions prioritaires, estimations de coûts et subventions disponibles.',
        'Detailed report with priority actions, cost estimates and available subsidies.',
        'Detaillierter Bericht mit vorrangigen Maßnahmen, Kostenschätzungen und verfügbaren Fördergeldern.'
      ),
    },
    {
      _id: 'processStep-4',
      _type: 'processStep',
      stepNumber: 4,
      title: loc('Accompagnement', 'Support', 'Begleitung'),
      description: loc(
        'Suivi de la mise en œuvre et assistance pour les démarches administratives et demandes de subventions.',
        'Follow-up on implementation and assistance with administrative procedures and subsidy applications.',
        'Nachverfolgung der Umsetzung und Unterstützung bei Verwaltungsverfahren und Förderanträgen.'
      ),
    },
  ]

  for (const step of steps) {
    await client.createOrReplace(step)
  }
  console.log('processSteps ×4: créées')
}

// ─────────────────────────────────────────────
// CLIENT TYPES (cartes solutions accueil)
// Images à uploader manuellement dans Sanity Studio
// ─────────────────────────────────────────────
async function upsertClientTypes() {
  const types = [
    {
      _id: 'clientType-regies',
      _type: 'clientType',
      slug: 'regies',
      title: loc('Régies & Immeubles', 'Real Estate & Buildings', 'Immobilien & Liegenschaften'),
      subtitle: loc('Gestionnaires', 'Managers', 'Verwalter'),
      description: loc(
        'Valorisez votre parc et anticipez les obligations légales.',
        'Enhance your property portfolio and anticipate legal obligations.',
        'Werten Sie Ihr Immobilienportfolio auf und antizipieren Sie gesetzliche Anforderungen.'
      ),
      link: '/services/gerance',
      order: 1,
    },
    {
      _id: 'clientType-villas',
      _type: 'clientType',
      slug: 'villas',
      title: loc('Propriétaires de Villas', 'Villa Owners', 'Villenbesitzer'),
      subtitle: loc('Particuliers', 'Individuals', 'Privatpersonen'),
      description: loc(
        "Rénovez votre bien et profitez des subventions cantonales pour améliorer l'efficacité énergétique de votre maison.",
        "Renovate your property and benefit from cantonal subsidies to improve your home's energy efficiency.",
        'Renovieren Sie Ihre Immobilie und profitieren Sie von kantonalen Fördermitteln zur Verbesserung der Energieeffizienz.'
      ),
      link: '/services/villa',
      order: 2,
    },
    {
      _id: 'clientType-entreprises',
      _type: 'clientType',
      slug: 'entreprises',
      title: loc('Entreprises & PME', 'Businesses & SMEs', 'Unternehmen & KMU'),
      subtitle: loc('Professionnels', 'Professionals', 'Fachleute'),
      description: loc(
        "Optimisez votre consommation et réduisez vos coûts d'exploitation avec nos audits (PEIK).",
        'Optimize your consumption and reduce operating costs with our audits (PEIK).',
        'Optimieren Sie Ihren Verbrauch und senken Sie Betriebskosten mit unseren Audits (PEIK).'
      ),
      link: '/services/entreprise',
      order: 3,
    },
    {
      _id: 'clientType-communes',
      _type: 'clientType',
      slug: 'communes',
      title: loc('Communes & GRD', 'Municipalities & DSOs', 'Gemeinden & VNB'),
      subtitle: loc('Collectivités', 'Collectivities', 'Öffentlicher Sektor'),
      description: loc(
        'Accompagnez vos citoyens et atteignez vos objectifs climatiques avec nos programmes de transition énergétique.',
        'Support your citizens and achieve your climate goals with our energy transition programmes.',
        'Unterstützen Sie Ihre Bürger und erreichen Sie Ihre Klimaziele mit unseren Energiewendeprogrammen.'
      ),
      link: '/services/communes',
      order: 4,
    },
  ]

  for (const ct of types) {
    await client.createOrReplace(ct)
  }
  console.log('clientTypes ×4: créés (images à uploader dans Studio)')
}

// ─────────────────────────────────────────────
// TEAM MEMBERS
// ─────────────────────────────────────────────
async function upsertTeamMembers() {
  const members = [
    {
      _id: 'teamMember-salman',
      _type: 'teamMember',
      name: 'Mohammad SALMAN',
      role: loc('Directeur & Conseiller en énergie', 'Director & Energy Advisor', 'Direktor & Energieberater'),
      initials: 'MS',
      color: 'from-[var(--primary)] to-emerald-600',
      items: {
        fr: ['Expert "Chauffez renouvelable"', 'Concessionnaire IDC Genève', 'Expert éclairage SIG', 'Gestionnaire énergie délégué', 'Conseiller PEIK', 'Conseiller TPE/PME', 'Conseiller villa'],
        en: ['"Renewable Heating" Expert', 'IDC Geneva Concessionaire', 'SIG Lighting Expert', 'Delegated Energy Manager', 'PEIK Advisor', 'SME/Small Business Advisor', 'Villa Advisor'],
        de: ['"Erneuerbar Heizen" Experte', 'IDC Genf Konzessionär', 'SIG Beleuchtungs-Experte', 'Delegierter Energiemanager', 'PEIK-Berater', 'KMU-Berater', 'Villen-Berater'],
      },
      order: 1,
    },
    {
      _id: 'teamMember-aydi',
      _type: 'teamMember',
      name: 'Reem Al AYDI',
      role: loc('Conseillère en énergie', 'Energy Advisor', 'Energieberaterin'),
      initials: 'RA',
      color: 'from-[var(--primary)] to-emerald-600',
      items: {
        fr: ['Experte "Chauffez renouvelable"', 'Concessionnaire IDC Genève', 'Conseillère villa/TPE/PME'],
        en: ['"Renewable Heating" Expert', 'IDC Geneva Concessionaire', 'Villa/SME/Small Business Advisor'],
        de: ['"Erneuerbar Heizen" Expertin', 'IDC Genf Konzessionärin', 'Beraterin für Villen/KMU'],
      },
      order: 2,
    },
    {
      _id: 'teamMember-casier',
      _type: 'teamMember',
      name: 'Thibault CASIER',
      role: loc('Conseiller en énergie', 'Energy Advisor', 'Energieberater'),
      initials: 'TC',
      color: 'from-[var(--primary)] to-emerald-600',
      items: {
        fr: ['Conseiller entreprises TPE/PME', 'Conseiller Ecologement', 'Concessionnaire IDC', 'Expert "Chauffez renouvelable"'],
        en: ['SME/Small Business Advisor', 'Ecologement Advisor', 'IDC Concessionaire', '"Renewable Heating" Expert'],
        de: ['Berater für KMU', 'Ecologement Berater', 'IDC Konzessionär', '"Erneuerbar Heizen" Experte'],
      },
      order: 3,
    },
    {
      _id: 'teamMember-badoux',
      _type: 'teamMember',
      name: 'Daniel BADOUX',
      role: loc('Conseiller en énergie', 'Energy Advisor', 'Energieberater'),
      initials: 'DB',
      color: 'from-[var(--primary)] to-emerald-600',
      items: {
        fr: ['Conseiller entreprises TPE/PME'],
        en: ['SME/Small Business Advisor'],
        de: ['Berater für KMU'],
      },
      order: 4,
    },
    {
      _id: 'teamMember-casimirus',
      _type: 'teamMember',
      name: 'Patrick CASIMIRUS',
      role: loc('Conseiller en énergie', 'Energy Advisor', 'Energieberater'),
      initials: 'PC',
      color: 'from-[var(--primary)] to-emerald-600',
      items: {
        fr: ['Conseiller entreprises TPE/PME', 'Conseiller Ecologement', 'Concessionnaire IDC', 'Expert "Chauffez renouvelable"'],
        en: ['SME/Small Business Advisor', 'Ecologement Advisor', 'IDC Concessionaire', '"Renewable Heating" Expert'],
        de: ['Berater für KMU', 'Ecologement Berater', 'IDC Konzessionär', '"Erneuerbar Heizen" Experte'],
      },
      order: 5,
    },
  ]

  for (const member of members) {
    await client.createOrReplace(member)
  }
  console.log('teamMembers ×5: créés')
}

// ─────────────────────────────────────────────
// CONTACT PAGE
// ─────────────────────────────────────────────
async function upsertContactPage() {
  await client.createOrReplace({
    _id: 'contactPage',
    _type: 'contactPage',
    seo: {
      title: loc(
        'Contact | Swiss Ecogestes',
        'Contact | Swiss Ecogestes',
        'Kontakt | Swiss Ecogestes'
      ),
      description: loc(
        "Contactez Swiss Ecogestes pour un audit énergétique gratuit. Nos conseillers sont disponibles pour répondre à vos questions.",
        'Contact Swiss Ecogestes for a free energy audit. Our advisors are available to answer your questions.',
        'Kontaktieren Sie Swiss Ecogestes für einen kostenlosen Energieaudit. Unsere Berater stehen für Ihre Fragen zur Verfügung.'
      ),
    },
    hero: {
      title: loc(
        'Parlons de votre projet',
        "Let's talk about your project",
        'Sprechen wir über Ihr Projekt'
      ),
      description: loc(
        "Chaque projet est unique. Prenez contact avec nous pour obtenir une analyse personnalisée et découvrir vos économies potentielles.",
        'Every project is unique. Get in touch with us for a personalised analysis and discover your potential savings.',
        'Jedes Projekt ist einzigartig. Nehmen Sie Kontakt mit uns auf für eine persönliche Analyse und entdecken Sie Ihre Einsparpotenziale.'
      ),
    },
    formSection: {
      tag: loc('Nous contacter', 'Contact us', 'Kontaktieren Sie uns'),
      title: loc(
        'Obtenir un audit gratuit',
        'Get a free audit',
        'Kostenlosen Audit erhalten'
      ),
      subtitle: loc(
        "Remplissez ce formulaire et un conseiller vous recontacte sous 24h.",
        'Fill in this form and an advisor will contact you within 24 hours.',
        'Füllen Sie dieses Formular aus und ein Berater meldet sich innerhalb von 24 Stunden.'
      ),
      quote: loc(
        "Notre seul intérêt : que vous économisiez. Pas de matériel à vendre, pas de marges cachées.",
        "Our only interest: your savings. No equipment to sell, no hidden margins.",
        "Unser einziges Interesse: Ihre Einsparungen. Kein Material zu verkaufen, keine versteckten Margen."
      ),
    },
  })
  console.log('contactPage: créé')
}

// ─────────────────────────────────────────────
// SETTINGS (mise à jour complète avec téléphone + réseaux)
// ─────────────────────────────────────────────
async function upsertSettings() {
  await client.createOrReplace({
    _id: 'settings',
    _type: 'settings',
    siteTitle: loc('Swiss Ecogestes', 'Swiss Ecogestes', 'Swiss Ecogestes'),
    siteDescription: loc(
      "Votre partenaire expert pour la transition énergétique en Suisse Romande. Solutions durables et accompagnement sur-mesure.",
      'Your expert partner for energy transition in French-speaking Switzerland. Sustainable solutions and tailored support.',
      'Ihr Expertenpartner für die Energiewende in der Westschweiz. Nachhaltige Lösungen und maßgeschneiderte Begleitung.'
    ),
    socialMedia: {
      linkedin: 'https://www.linkedin.com/company/swissecogestes/',
      instagram: 'https://www.instagram.com/swissecogestes/',
      facebook: 'https://www.facebook.com/swissecogestes',
      twitter: 'https://x.com/swissecogestes',
    },
    footerInfo: {
      slogan: loc(
        "Votre partenaire expert pour la transition énergétique en Suisse Romande. Solutions durables et accompagnement sur-mesure.",
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
      phone: '078 628 77 38',
      address: 'Route de Chavannes 207, 1007 Lausanne',
    },
  })
  console.log('settings: mis à jour')
}

// ─────────────────────────────────────────────
// LEGAL PAGES ×3
// ─────────────────────────────────────────────
async function upsertLegalPages() {
  // MENTIONS LÉGALES
  await client.createOrReplace({
    _id: 'legalPage-mentions',
    _type: 'legalPage',
    pageType: 'mentions-legales',
    seo: {
      title: loc(
        'Mentions Légales | Swiss Ecogestes',
        'Legal Notice | Swiss Ecogestes',
        'Impressum | Swiss Ecogestes'
      ),
      description: loc(
        "Mentions légales, informations sur l'entreprise et conditions d'utilisation du site Swiss Ecogestes.",
        'Legal notice, company information and terms of use for the Swiss Ecogestes website.',
        'Impressum, Unternehmensinformationen und Nutzungsbedingungen der Swiss Ecogestes Website.'
      ),
    },
    title: loc('Mentions Légales', 'Legal Notice', 'Impressum'),
    lastUpdated: '2026-02-01',
    sections: [
      {
        _key: 'sec-editor',
        title: loc('Éditeur du site', 'Site Publisher', 'Website-Herausgeber'),
        content: {
          fr: [
            'Swiss Ecogestes SARL',
            'Adresse : Route de Chavannes 207, 1007 Lausanne',
            'Téléphone : 078 628 77 38',
            'Email : info@swissecogestes.ch',
            'Forme juridique : Société à responsabilité limitée (SÀRL), inscrite au Registre du Commerce',
          ],
          en: [
            'Swiss Ecogestes SARL',
            'Address: Route de Chavannes 207, 1007 Lausanne',
            'Phone: 078 628 77 38',
            'Email: info@swissecogestes.ch',
            'Legal form: Limited liability company (SARL), registered in the Commercial Register',
          ],
          de: [
            'Swiss Ecogestes SARL',
            'Adresse: Route de Chavannes 207, 1007 Lausanne',
            'Telefon: 078 628 77 38',
            'E-Mail: info@swissecogestes.ch',
            'Rechtsform: Gesellschaft mit beschränkter Haftung (GmbH), eingetragen im Handelsregister',
          ],
        },
      },
      {
        _key: 'sec-director',
        title: loc('Directeur de la publication', 'Publication Director', 'Verantwortlicher Redakteur'),
        content: {
          fr: ['Mohammad SALMAN, Directeur'],
          en: ['Mohammad SALMAN, Director'],
          de: ['Mohammad SALMAN, Direktor'],
        },
      },
      {
        _key: 'sec-hosting',
        title: loc('Hébergement', 'Hosting', 'Hosting'),
        content: {
          fr: [
            'Ce site sera hébergé par Infomaniak Network SA',
            'Rue Eugène-Marziano 25, 1227 Les Acacias (Genève), Suisse',
            'Site web : infomaniak.com',
          ],
          en: [
            'This site is hosted by Infomaniak Network SA',
            'Rue Eugène-Marziano 25, 1227 Les Acacias (Geneva), Switzerland',
            'Website: infomaniak.com',
          ],
          de: [
            'Diese Website wird von Infomaniak Network SA gehostet',
            'Rue Eugène-Marziano 25, 1227 Les Acacias (Genf), Schweiz',
            'Website: infomaniak.com',
          ],
        },
      },
      {
        _key: 'sec-ip',
        title: loc('Propriété intellectuelle', 'Intellectual Property', 'Geistiges Eigentum'),
        content: {
          fr: [
            "L'ensemble du contenu de ce site (textes, images, graphiques, logos, icônes) est la propriété exclusive de Swiss Ecogestes SARL ou de ses partenaires.",
            "Toute reproduction, distribution ou utilisation sans autorisation préalable écrite est interdite.",
          ],
          en: [
            'All content on this site (texts, images, graphics, logos, icons) is the exclusive property of Swiss Ecogestes SARL or its partners.',
            'Any reproduction, distribution or use without prior written authorisation is prohibited.',
          ],
          de: [
            'Alle Inhalte dieser Website (Texte, Bilder, Grafiken, Logos, Icons) sind ausschließliches Eigentum von Swiss Ecogestes SARL oder deren Partner.',
            'Jede Vervielfältigung, Verbreitung oder Verwendung ohne vorherige schriftliche Genehmigung ist untersagt.',
          ],
        },
      },
      {
        _key: 'sec-liability',
        title: loc('Limitation de responsabilité', 'Limitation of Liability', 'Haftungsausschluss'),
        content: {
          fr: [
            "Swiss Ecogestes SARL s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site.",
            "Nous déclinons toute responsabilité pour les dommages directs ou indirects pouvant résulter de l'accès ou de l'utilisation de ce site.",
          ],
          en: [
            'Swiss Ecogestes SARL strives to ensure the accuracy and currency of information published on this site.',
            'We disclaim all liability for direct or indirect damages that may result from accessing or using this site.',
          ],
          de: [
            'Swiss Ecogestes SARL bemüht sich um die Richtigkeit und Aktualität der auf dieser Website veröffentlichten Informationen.',
            'Wir übernehmen keine Haftung für direkte oder indirekte Schäden, die durch den Zugang oder die Nutzung dieser Website entstehen können.',
          ],
        },
      },
      {
        _key: 'sec-credits',
        title: loc('Crédits', 'Credits', 'Urheberschaft'),
        content: {
          fr: [
            'Ce site internet a été conçu et réalisé par <a href="http://alexandre-varela.ch/" target="_blank" rel="noopener noreferrer" class="text-[var(--primary)] hover:underline font-bold">Alexandre Varela Tavares</a>.',
          ],
          en: [
            'This website was designed and developed by <a href="http://alexandre-varela.ch/" target="_blank" rel="noopener noreferrer" class="text-[var(--primary)] hover:underline font-bold">Alexandre Varela Tavares</a>.',
          ],
          de: [
            'Diese Website wurde entworfen und entwickelt von <a href="http://alexandre-varela.ch/" target="_blank" rel="noopener noreferrer" class="text-[var(--primary)] hover:underline font-bold">Alexandre Varela Tavares</a>.',
          ],
        },
      },
    ],
  })
  console.log('legalPage (mentions-legales): créé')

  // CONFIDENTIALITÉ
  await client.createOrReplace({
    _id: 'legalPage-confidentialite',
    _type: 'legalPage',
    pageType: 'confidentialite',
    seo: {
      title: loc(
        'Politique de Confidentialité | Swiss Ecogestes',
        'Privacy Policy | Swiss Ecogestes',
        'Datenschutzrichtlinie | Swiss Ecogestes'
      ),
      description: loc(
        'Notre politique de protection des données personnelles et de confidentialité.',
        'Our personal data protection and privacy policy.',
        'Unsere Richtlinie zum Schutz personenbezogener Daten und zur Vertraulichkeit.'
      ),
    },
    title: loc('Politique de Confidentialité', 'Privacy Policy', 'Datenschutzrichtlinie'),
    lastUpdated: '2026-02-01',
    sections: [
      {
        _key: 'sec-intro',
        title: loc('Introduction', 'Introduction', 'Einleitung'),
        content: {
          fr: [
            "Swiss Ecogestes SARL (ci-après « nous ») attache une grande importance à la protection de vos données personnelles.",
            "La présente politique décrit comment nous collectons, utilisons et protégeons vos données conformément à la Loi fédérale sur la protection des données (LPD) et au Règlement Général sur la Protection des Données (RGPD).",
          ],
          en: [
            'Swiss Ecogestes SARL (hereinafter "we") attaches great importance to the protection of your personal data.',
            'This policy describes how we collect, use and protect your data in accordance with the Federal Act on Data Protection (FADP) and the General Data Protection Regulation (GDPR).',
          ],
          de: [
            'Swiss Ecogestes SARL (nachfolgend „wir") legt großen Wert auf den Schutz Ihrer personenbezogenen Daten.',
            'Diese Richtlinie beschreibt, wie wir Ihre Daten gemäß dem Bundesgesetz über den Datenschutz (DSG) und der Datenschutz-Grundverordnung (DSGVO) erheben, nutzen und schützen.',
          ],
        },
      },
      {
        _key: 'sec-collection',
        title: loc('Données collectées', 'Data collected', 'Erhobene Daten'),
        content: {
          fr: [
            "Nous collectons uniquement les données que vous nous transmettez volontairement via nos formulaires de contact : nom, prénom, adresse e-mail, numéro de téléphone (optionnel) et message.",
            "Nous collectons également des données de navigation anonymisées (pages visitées, durée de visite) via des outils d'analyse respectueux de la vie privée.",
          ],
          en: [
            'We only collect data you voluntarily provide through our contact forms: first name, last name, email address, phone number (optional) and message.',
            'We also collect anonymised navigation data (pages visited, visit duration) via privacy-friendly analytics tools.',
          ],
          de: [
            'Wir erheben nur Daten, die Sie uns freiwillig über unsere Kontaktformulare übermitteln: Vorname, Nachname, E-Mail-Adresse, Telefonnummer (optional) und Nachricht.',
            'Wir erheben auch anonymisierte Navigationsdaten (besuchte Seiten, Besuchsdauer) über datenschutzfreundliche Analysetools.',
          ],
        },
      },
      {
        _key: 'sec-usage',
        title: loc('Utilisation des données', 'Use of data', 'Verwendung der Daten'),
        content: {
          fr: [
            "Vos données personnelles sont utilisées exclusivement pour répondre à vos demandes de contact et d'information.",
            "Nous ne vendons, ne louons ni ne partageons vos données avec des tiers à des fins commerciales.",
            "Vos données peuvent être partagées avec nos prestataires techniques (hébergement, envoi d'emails) dans le strict cadre de l'exécution de nos services.",
          ],
          en: [
            'Your personal data is used exclusively to respond to your contact and information requests.',
            'We do not sell, rent or share your data with third parties for commercial purposes.',
            'Your data may be shared with our technical service providers (hosting, email sending) strictly for service delivery purposes.',
          ],
          de: [
            'Ihre personenbezogenen Daten werden ausschließlich zur Beantwortung Ihrer Kontakt- und Informationsanfragen verwendet.',
            'Wir verkaufen, vermieten oder teilen Ihre Daten nicht mit Dritten für kommerzielle Zwecke.',
            'Ihre Daten können mit unseren technischen Dienstleistern (Hosting, E-Mail-Versand) im Rahmen der Leistungserbringung geteilt werden.',
          ],
        },
      },
      {
        _key: 'sec-retention',
        title: loc('Conservation des données', 'Data retention', 'Datenspeicherung'),
        content: {
          fr: [
            "Vos données sont conservées pendant une durée maximale de 3 ans à compter de votre dernier contact avec nous.",
            "À l'expiration de ce délai, vos données sont supprimées de manière sécurisée.",
          ],
          en: [
            'Your data is retained for a maximum of 3 years from your last contact with us.',
            'After this period, your data is securely deleted.',
          ],
          de: [
            'Ihre Daten werden für maximal 3 Jahre ab Ihrem letzten Kontakt mit uns gespeichert.',
            'Nach Ablauf dieser Frist werden Ihre Daten sicher gelöscht.',
          ],
        },
      },
      {
        _key: 'sec-rights',
        title: loc('Vos droits', 'Your rights', 'Ihre Rechte'),
        content: {
          fr: [
            "Conformément à la LPD et au RGPD, vous disposez des droits suivants : accès, rectification, suppression, portabilité et opposition au traitement de vos données.",
            "Pour exercer ces droits, contactez-nous à : info@swissecogestes.ch",
          ],
          en: [
            'In accordance with the FADP and GDPR, you have the following rights: access, rectification, deletion, portability and objection to data processing.',
            'To exercise these rights, contact us at: info@swissecogestes.ch',
          ],
          de: [
            'Gemäß DSG und DSGVO haben Sie folgende Rechte: Auskunft, Berichtigung, Löschung, Portabilität und Widerspruch gegen die Verarbeitung Ihrer Daten.',
            'Um diese Rechte auszuüben, kontaktieren Sie uns unter: info@swissecogestes.ch',
          ],
        },
      },
    ],
  })
  console.log('legalPage (confidentialite): créé')

  // COOKIES
  await client.createOrReplace({
    _id: 'legalPage-cookies',
    _type: 'legalPage',
    pageType: 'cookies',
    seo: {
      title: loc(
        'Politique des Cookies | Swiss Ecogestes',
        'Cookie Policy | Swiss Ecogestes',
        'Cookie-Richtlinie | Swiss Ecogestes'
      ),
      description: loc(
        "Informations sur l'utilisation des cookies sur notre site Swiss Ecogestes.",
        'Information on the use of cookies on our Swiss Ecogestes website.',
        'Informationen zur Verwendung von Cookies auf unserer Swiss Ecogestes Website.'
      ),
    },
    title: loc('Politique des Cookies', 'Cookie Policy', 'Cookie-Richtlinie'),
    lastUpdated: '2026-02-01',
    sections: [
      {
        _key: 'sec-what',
        title: loc("Qu'est-ce qu'un cookie ?", 'What is a cookie?', 'Was ist ein Cookie?'),
        content: {
          fr: [
            "Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, tablette, smartphone) lors de la visite d'un site web.",
            "Il permet au site de mémoriser vos préférences et d'améliorer votre expérience de navigation.",
          ],
          en: [
            'A cookie is a small text file placed on your device (computer, tablet, smartphone) when you visit a website.',
            'It allows the site to remember your preferences and improve your browsing experience.',
          ],
          de: [
            'Ein Cookie ist eine kleine Textdatei, die beim Besuch einer Website auf Ihrem Gerät (Computer, Tablet, Smartphone) gespeichert wird.',
            'Es ermöglicht der Website, Ihre Präferenzen zu speichern und Ihr Browsererlebnis zu verbessern.',
          ],
        },
      },
      {
        _key: 'sec-types',
        title: loc('Types de cookies utilisés', 'Types of cookies used', 'Verwendete Cookie-Typen'),
        content: {
          fr: [
            "Cookies essentiels : nécessaires au bon fonctionnement du site (navigation, sécurité). Ils ne peuvent pas être désactivés.",
            "Cookies de préférences : mémorisent vos choix de langue et d'affichage.",
            "Cookies analytiques : nous aident à comprendre comment les visiteurs utilisent le site, de façon anonymisée.",
          ],
          en: [
            'Essential cookies: necessary for the proper functioning of the site (navigation, security). They cannot be disabled.',
            'Preference cookies: remember your language and display choices.',
            'Analytical cookies: help us understand how visitors use the site, in an anonymised way.',
          ],
          de: [
            'Wesentliche Cookies: notwendig für das ordnungsgemäße Funktionieren der Website (Navigation, Sicherheit). Sie können nicht deaktiviert werden.',
            'Präferenz-Cookies: speichern Ihre Sprach- und Anzeigeeinstellungen.',
            'Analytische Cookies: helfen uns zu verstehen, wie Besucher die Website nutzen, auf anonymisierte Weise.',
          ],
        },
      },
      {
        _key: 'sec-third',
        title: loc('Cookies tiers', 'Third-party cookies', 'Drittanbieter-Cookies'),
        content: {
          fr: [
            "Notre site peut utiliser des services tiers (Sanity CMS, outils d'analyse) qui peuvent déposer leurs propres cookies.",
            "Nous n'avons pas de contrôle direct sur ces cookies — veuillez consulter les politiques de confidentialité de ces services.",
          ],
          en: [
            'Our site may use third-party services (Sanity CMS, analytics tools) that may place their own cookies.',
            "We do not have direct control over these cookies — please refer to these services' privacy policies.",
          ],
          de: [
            'Unsere Website kann Dienste von Drittanbietern (Sanity CMS, Analysetools) nutzen, die eigene Cookies setzen können.',
            'Wir haben keine direkte Kontrolle über diese Cookies — bitte konsultieren Sie die Datenschutzrichtlinien dieser Dienste.',
          ],
        },
      },
      {
        _key: 'sec-prefs',
        title: loc('Gestion de vos préférences', 'Managing your preferences', 'Verwalten Ihrer Präferenzen'),
        content: {
          fr: [
            "Vous pouvez à tout moment modifier vos préférences en matière de cookies via votre navigateur (paramètres > confidentialité).",
            "Le refus de certains cookies peut limiter certaines fonctionnalités du site.",
            "Pour plus d'informations, consultez les guides de votre navigateur (Chrome, Firefox, Safari, Edge).",
          ],
          en: [
            'You can change your cookie preferences at any time via your browser (settings > privacy).',
            'Refusing certain cookies may limit some site features.',
            'For more information, consult your browser guides (Chrome, Firefox, Safari, Edge).',
          ],
          de: [
            'Sie können Ihre Cookie-Präferenzen jederzeit über Ihren Browser ändern (Einstellungen > Datenschutz).',
            'Das Ablehnen bestimmter Cookies kann einige Website-Funktionen einschränken.',
            'Für weitere Informationen konsultieren Sie die Hilfe Ihres Browsers (Chrome, Firefox, Safari, Edge).',
          ],
        },
      },
    ],
  })
  console.log('legalPage (cookies): créé')
}

// ─────────────────────────────────────────────
// HERO SLIDES (image à uploader dans Studio)
// ─────────────────────────────────────────────
async function upsertHeroSlides() {
  await client.createOrReplace({
    _id: 'heroSlide-main',
    _type: 'heroSlide',
    isMain: true,
    order: 1,
    label: loc('Swiss Ecogeste', 'Swiss Ecogeste', 'Swiss Ecogeste'),
    title: loc(
      'Réduisez vos coûts énergétiques et passez aux bonnes actions.',
      'Reduce your energy costs and take the right actions.',
      'Senken Sie Ihre Energiekosten und ergreifen Sie die richtigen Maßnahmen.'
    ),
    subtitle: loc(
      'Audits, stratégie énergétique et accompagnement pour régies, entreprises, propriétaires et collectivités en Suisse romande.',
      'Energy audits, strategy and support for property managers, businesses, owners and municipalities in French-speaking Switzerland.',
      'Energieaudits, Strategie und Begleitung für Immobilienverwaltungen, Unternehmen, Eigentümer und Gemeinden in der Westschweiz.'
    ),
    description: loc(
      'Identifiez rapidement vos économies potentielles, les aides disponibles et les actions prioritaires pour améliorer durablement la performance de vos installations et bâtiments.',
      'Quickly identify your savings potential, available subsidies and priority actions to sustainably improve the performance of your installations and buildings.',
      'Identifizieren Sie schnell Ihre Einsparpotenziale, verfügbaren Fördergelder und Prioritätsmaßnahmen zur dauerhaften Verbesserung Ihrer Anlagen und Gebäude.'
    ),
    featuresLabel: loc(
      'Une approche concrète, neutre et orientée résultats.',
      'A concrete, neutral and results-oriented approach.',
      'Ein konkreter, neutraler und ergebnisorientierter Ansatz.'
    ),
    features: {
      fr: ['Recommandations indépendantes', 'Solutions adaptées', 'Aides et subventions', 'Expertise terrain'],
      en: ['Independent recommendations', 'Tailored solutions', 'Grants & subsidies', 'Field expertise'],
      de: ['Unabhängige Empfehlungen', 'Maßgeschneiderte Lösungen', 'Fördergelder & Subventionen', 'Felderfahrung'],
    },
    buttonText: loc('Découvrir nos solutions', 'Discover our solutions', 'Unsere Lösungen entdecken'),
    buttonLink: '#nos-solutions',
    secondButtonText: loc('Estimer mes économies', 'Estimate my savings', 'Meine Einsparungen schätzen'),
    secondButtonLink: '/contact',
  })

  await client.createOrReplace({
    _id: 'heroSlide-regies',
    _type: 'heroSlide',
    isMain: false,
    order: 2,
    label: loc('Régies', 'Property Managers', 'Hausverwaltungen'),
    title: loc(
      'Optimisez votre parc immobilier et anticipez les obligations légales.',
      'Optimise your property portfolio and anticipate legal obligations.',
      'Optimieren Sie Ihr Immobilienportfolio und antizipieren Sie gesetzliche Anforderungen.'
    ),
    subtitle: loc(
      'Audit IDC, stratégie énergétique et accompagnement des démarches de subvention pour vos immeubles en Suisse romande.',
      'IDC audit, energy strategy and subsidy support for your buildings in French-speaking Switzerland.',
      'IDC-Audit, Energiestrategie und Subventionsbegleitung für Ihre Liegenschaften in der Westschweiz.'
    ),
    buttonText: loc('En savoir plus', 'Learn more', 'Mehr erfahren'),
    buttonLink: '/services/gerance',
  })

  await client.createOrReplace({
    _id: 'heroSlide-villas',
    _type: 'heroSlide',
    isMain: false,
    order: 3,
    label: loc('Villas', 'Villas', 'Villen'),
    title: loc(
      'Réduisez vos factures et maximisez vos subventions pour votre villa.',
      'Reduce your bills and maximise subsidies for your villa.',
      'Senken Sie Ihre Rechnungen und maximieren Sie Subventionen für Ihre Villa.'
    ),
    subtitle: loc(
      'CECB+, audit énergétique et montage de dossiers de subventions pour propriétaires dans les cantons de Vaud et Genève.',
      'CECB+, energy audit and subsidy application for owners in the cantons of Vaud and Geneva.',
      'CECB+, Energieaudit und Subventionsantragsstellung für Eigentümer in den Kantonen Waadt und Genf.'
    ),
    buttonText: loc('En savoir plus', 'Learn more', 'Mehr erfahren'),
    buttonLink: '/services/villa',
  })

  await client.createOrReplace({
    _id: 'heroSlide-entreprises',
    _type: 'heroSlide',
    isMain: false,
    order: 4,
    label: loc('Entreprises', 'Businesses', 'Unternehmen'),
    title: loc(
      'Audit PEIK, efficacité énergétique et réduction des coûts pour votre entreprise.',
      'PEIK audit, energy efficiency and cost reduction for your business.',
      'PEIK-Audit, Energieeffizienz und Kostensenkung für Ihr Unternehmen.'
    ),
    subtitle: loc(
      "Identifiez vos gisements d'économies et accédez aux aides cantonales et fédérales avec l'accompagnement de nos experts certifiés.",
      'Identify your savings potential and access cantonal and federal subsidies with our certified experts.',
      'Identifizieren Sie Ihre Einsparpotenziale und greifen Sie auf kantonale und Bundessubventionen zu — mit unseren zertifizierten Experten.'
    ),
    buttonText: loc('En savoir plus', 'Learn more', 'Mehr erfahren'),
    buttonLink: '/services/entreprise',
  })

  console.log('heroSlides ×4: créés (images à uploader dans Studio)')
}

// ─────────────────────────────────────────────
// PARTENAIRES (logos à uploader dans Studio)
// ─────────────────────────────────────────────
async function upsertPartners() {
  const partners = [
    { _id: 'partner-vaud',   name: 'Canton de Vaud',        url: 'https://www.vd.ch',                     order: 1 },
    { _id: 'partner-geneve', name: 'Canton de Genève',      url: 'https://www.ge.ch',                     order: 2 },
    { _id: 'partner-sig',    name: 'SIG Éco21',             url: 'https://eco21.ch',                      order: 3 },
    { _id: 'partner-suisse', name: 'Suisse Énergie',        url: 'https://www.suisseenergie.ch',          order: 4 },
    { _id: 'partner-cr',     name: 'Chauffez Renouvelable', url: 'https://www.chauffez-renouvelable.ch',  order: 5 },
    { _id: 'partner-ocen',   name: 'OCEN',                  url: 'https://www.ge.ch/energie',             order: 6 },
  ]

  for (const p of partners) {
    await client.createOrReplace({ _type: 'partner', ...p })
  }
  console.log('partners ×6: créés (logos à uploader dans Studio)')
}

// ─────────────────────────────────────────────
// BLOG PAGE (singleton)
// ─────────────────────────────────────────────
async function upsertBlogPage() {
  await client.createOrReplace({
    _id: 'blogPage',
    _type: 'blogPage',
    seo: {
      title: loc(
        'Conseils & Actualités Énergie | Swiss Ecogestes',
        'Energy Tips & News | Swiss Ecogestes',
        'Energietipps & Neuigkeiten | Swiss Ecogestes'
      ),
      description: loc(
        "Découvrez nos conseils pratiques sur la rénovation énergétique, les subventions et la transition énergétique en Suisse romande.",
        "Discover our practical tips on energy renovation, subsidies and the energy transition in French-speaking Switzerland.",
        "Entdecken Sie unsere praktischen Tipps zu energetischer Sanierung, Subventionen und der Energiewende in der Westschweiz."
      ),
    },
    hero: {
      h1: loc(
        'Conseils & Actualités',
        'Tips & News',
        'Tipps & Neuigkeiten'
      ),
      intro: loc(
        "Retrouvez nos articles pratiques sur la performance énergétique, les subventions disponibles et les meilleures pratiques pour réduire votre consommation.",
        "Find our practical articles on energy performance, available subsidies and best practices to reduce your consumption.",
        "Finden Sie unsere praxisnahen Artikel zu Energieeffizienz, verfügbaren Subventionen und Best Practices zur Reduzierung Ihres Verbrauchs."
      ),
    },
    categories: ['Subventions', 'Rénovation', 'Audit', 'Entreprises', 'Villas', 'Régies'],
  })
  console.log('blogPage: créé')
}

// ─────────────────────────────────────────────
// ARTICLES (images à uploader dans Studio)
// ─────────────────────────────────────────────
function makeBlock(key: string, text: string) {
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: `${key}s`, marks: [], text }],
  }
}

function makeH2(key: string, text: string) {
  return {
    _type: 'block',
    _key: key,
    style: 'h2',
    markDefs: [],
    children: [{ _type: 'span', _key: `${key}s`, marks: [], text }],
  }
}

async function upsertArticles() {
  const articles = [
    {
      _id: 'article-subventions-2026',
      _type: 'article',
      title: loc(
        'Subventions énergie 2026 : ce qui change dans les cantons de Vaud et Genève',
        'Energy subsidies 2026: what changes in the cantons of Vaud and Geneva',
        'Energiesubventionen 2026: Was sich in den Kantonen Waadt und Genf ändert'
      ),
      slug: { _type: 'slug', current: 'subventions-energie-2026-vaud-geneve' },
      excerpt: loc(
        "Tour d'horizon des nouvelles aides cantonales pour la rénovation énergétique en 2026 : pompes à chaleur, isolation, CECB et nouveaux programmes.",
        "Overview of new cantonal subsidies for energy renovation in 2026: heat pumps, insulation, CECB and new programmes.",
        "Überblick über neue kantonale Subventionen für energetische Sanierungen 2026: Wärmepumpen, Dämmung, CECB und neue Programme."
      ),
      category: loc('Subventions', 'Subsidies', 'Subventionen'),
      publishedAt: '2026-02-15',
      readTime: '6 min',
      featured: true,
      tags: ['subventions', 'vaud', 'geneve', 'renovation'],
      content: {
        fr: [
          makeH2('fr-h1', 'Nouveautés 2026 pour les propriétaires'),
          makeBlock('fr-p1', "Les cantons de Vaud et Genève ont renforcé leurs programmes de subventions pour la rénovation énergétique en 2026. Voici ce qu'il faut savoir pour maximiser vos aides."),
          makeH2('fr-h2', 'Programme CECB+ dans le canton de Vaud'),
          makeBlock('fr-p2', "Le CECB+ (Certificat Énergétique Cantonal des Bâtiments) reste l'outil central pour accéder aux subventions vaudoises. En 2026, les plafonds ont été revus à la hausse pour les rénovations globales."),
          makeH2('fr-h3', "Chauffez Renouvelable à Genève"),
          makeBlock('fr-p3', "Le programme Chauffez Renouvelable de l'OCEN continue de financer jusqu'à 50% du remplacement d'une chaudière à mazout ou à gaz par une pompe à chaleur. Les délais de traitement ont été réduits à 30 jours."),
          makeBlock('fr-p4', "Notre équipe peut vous accompagner dans le montage complet de votre dossier de subvention. Contactez-nous pour une analyse gratuite de votre situation."),
        ],
        en: [
          makeH2('en-h1', '2026 updates for property owners'),
          makeBlock('en-p1', "The cantons of Vaud and Geneva have strengthened their subsidy programmes for energy renovation in 2026. Here's what you need to know to maximise your grants."),
          makeH2('en-h2', 'CECB+ programme in the canton of Vaud'),
          makeBlock('en-p2', "The CECB+ remains the central tool for accessing Vaud subsidies. In 2026, ceilings have been raised for comprehensive renovations."),
          makeH2('en-h3', 'Chauffez Renouvelable in Geneva'),
          makeBlock('en-p3', "The OCEN's Chauffez Renouvelable programme continues to fund up to 50% of replacing an oil or gas boiler with a heat pump. Processing times have been reduced to 30 days."),
          makeBlock('en-p4', "Our team can guide you through your full subsidy application. Contact us for a free assessment."),
        ],
        de: [
          makeH2('de-h1', 'Neuigkeiten 2026 für Eigentümer'),
          makeBlock('de-p1', "Die Kantone Waadt und Genf haben ihre Subventionsprogramme für energetische Sanierungen 2026 verstärkt. Hier erfahren Sie, wie Sie Ihre Fördergelder maximieren."),
          makeH2('de-h2', 'CECB+-Programm im Kanton Waadt'),
          makeBlock('de-p2', "Das CECB+ bleibt das zentrale Instrument für den Zugang zu Waadtländer Subventionen. 2026 wurden die Obergrenzen für Gesamtsanierungen erhöht."),
          makeH2('de-h3', 'Chauffez Renouvelable in Genf'),
          makeBlock('de-p3', "Das Chauffez Renouvelable-Programm des OCEN finanziert weiterhin bis zu 50% des Ersatzes einer Öl- oder Gasheizung durch eine Wärmepumpe. Die Bearbeitungszeiten wurden auf 30 Tage reduziert."),
          makeBlock('de-p4', "Unser Team begleitet Sie bei der vollständigen Subventionsbeantragung. Kontaktieren Sie uns für eine kostenlose Analyse."),
        ],
      },
    },
    {
      _id: 'article-idc-guide',
      _type: 'article',
      title: loc(
        "L'IDC expliqué : comment optimiser l'indice de dépense de chaleur de votre immeuble",
        "IDC explained: how to optimise the heat consumption index of your building",
        "IDC erklärt: So optimieren Sie den Wärmeverbrauchsindex Ihres Gebäudes"
      ),
      slug: { _type: 'slug', current: 'idc-indice-depense-chaleur-immeuble-guide' },
      excerpt: loc(
        "L'IDC mesure la consommation de chaleur de votre bâtiment par m². Découvrez comment l'interpréter et quelles actions permettent de l'améliorer durablement.",
        "The IDC measures your building's heat consumption per m². Discover how to interpret it and which actions improve it sustainably.",
        "Der IDC misst den Wärmeverbrauch Ihres Gebäudes pro m². Erfahren Sie, wie er zu interpretieren ist und welche Maßnahmen ihn nachhaltig verbessern."
      ),
      category: loc('Audit', 'Audit', 'Audit'),
      publishedAt: '2026-01-20',
      readTime: '8 min',
      featured: false,
      tags: ['idc', 'geneve', 'immeuble', 'regie', 'audit'],
      content: {
        fr: [
          makeH2('fr2-h1', "Qu'est-ce que l'IDC ?"),
          makeBlock('fr2-p1', "L'Indice de Dépense de Chaleur (IDC) est un indicateur obligatoire à Genève pour les immeubles chauffés collectivement. Il exprime la consommation annuelle de chaleur par mètre carré de surface de référence énergétique (SRE)."),
          makeH2('fr2-h2', 'Comment lire votre IDC ?'),
          makeBlock('fr2-p2', "Un IDC inférieur à 450 MJ/m²a est considéré comme bon. Entre 450 et 800 MJ/m²a, des améliorations sont possibles et souhaitables. Au-delà de 800 MJ/m²a, votre bâtiment est énergivore et vous risquez des pénalités cantonales."),
          makeH2('fr2-h3', "Actions pour améliorer l'IDC"),
          makeBlock('fr2-p3', "Les actions les plus efficaces incluent : l'équilibrage hydraulique du réseau de chauffage, la régulation météo des chaudières, le remplacement des pompes de circulation, et l'amélioration de l'isolation des locaux non chauffés."),
          makeBlock('fr2-p4', "Swiss Ecogestes est concessionnaire IDC pour le canton de Genève. Nous réalisons vos relevés annuels et vous accompagnons dans les démarches d'amélioration."),
        ],
        en: [
          makeH2('en2-h1', 'What is the IDC?'),
          makeBlock('en2-p1', "The Heat Consumption Index (IDC) is a mandatory indicator in Geneva for collectively heated buildings. It expresses annual heat consumption per square metre of energy reference area."),
          makeH2('en2-h2', 'How to read your IDC?'),
          makeBlock('en2-p2', "An IDC below 450 MJ/m²a is considered good. Between 450 and 800 MJ/m²a, improvements are possible and desirable. Above 800 MJ/m²a, your building is energy-intensive and you risk cantonal penalties."),
          makeH2('en2-h3', 'Actions to improve the IDC'),
          makeBlock('en2-p3', "The most effective actions include: hydraulic balancing of the heating network, weather-based boiler regulation, replacement of circulation pumps, and improved insulation of unheated areas."),
          makeBlock('en2-p4', "Swiss Ecogestes is an IDC concessionaire for the canton of Geneva. We carry out your annual readings and support you in improvement procedures."),
        ],
        de: [
          makeH2('de2-h1', 'Was ist der IDC?'),
          makeBlock('de2-p1', "Der Wärmeverbrauchsindex (IDC) ist ein obligatorischer Indikator in Genf für kollektiv beheizte Gebäude. Er drückt den jährlichen Wärmeverbrauch pro Quadratmeter Energiebezugsfläche aus."),
          makeH2('de2-h2', 'Wie liest man den IDC?'),
          makeBlock('de2-p2', "Ein IDC unter 450 MJ/m²a gilt als gut. Zwischen 450 und 800 MJ/m²a sind Verbesserungen möglich und wünschenswert. Über 800 MJ/m²a ist Ihr Gebäude energieintensiv und Sie riskieren kantonale Strafen."),
          makeH2('de2-h3', 'Maßnahmen zur Verbesserung des IDC'),
          makeBlock('de2-p3', "Die effektivsten Maßnahmen umfassen: hydraulischer Abgleich des Heiznetzes, wettergeführte Kesselregelung, Austausch der Umwälzpumpen und verbesserte Dämmung unbeheizter Bereiche."),
          makeBlock('de2-p4', "Swiss Ecogestes ist IDC-Konzessionär für den Kanton Genf. Wir führen Ihre jährlichen Ablesungen durch und begleiten Sie bei Verbesserungsmaßnahmen."),
        ],
      },
    },
    {
      _id: 'article-pompe-chaleur',
      _type: 'article',
      title: loc(
        'Pompe à chaleur : quel modèle choisir et quelles subventions obtenir en Suisse romande ?',
        'Heat pump: which model to choose and what subsidies to get in French-speaking Switzerland?',
        'Wärmepumpe: Welches Modell wählen und welche Subventionen in der Westschweiz erhalten?'
      ),
      slug: { _type: 'slug', current: 'pompe-chaleur-modele-subventions-suisse-romande' },
      excerpt: loc(
        "PAC air/eau, géothermique ou air/air : guide complet pour choisir la bonne pompe à chaleur et maximiser vos subventions en Vaud et Genève.",
        "Air/water, geothermal or air/air heat pump: complete guide to choosing the right heat pump and maximising your subsidies in Vaud and Geneva.",
        "Luft/Wasser-, Erdwärme- oder Luft/Luft-Wärmepumpe: vollständiger Leitfaden zur Auswahl der richtigen Wärmepumpe und Maximierung Ihrer Subventionen in Waadt und Genf."
      ),
      category: loc('Rénovation', 'Renovation', 'Renovierung'),
      publishedAt: '2025-12-10',
      readTime: '7 min',
      featured: false,
      tags: ['pompe-a-chaleur', 'renovation', 'subventions', 'chauffage'],
      content: {
        fr: [
          makeH2('fr3-h1', 'Les 3 types de pompes à chaleur'),
          makeBlock('fr3-p1', "Les pompes à chaleur (PAC) se déclinent en trois grandes familles : air/eau (la plus répandue), géothermique (la plus performante mais plus coûteuse à installer), et air/air (pour le chauffage d'appoint ou les logements sans radiateurs)."),
          makeH2('fr3-h2', 'Quel type choisir selon votre logement ?'),
          makeBlock('fr3-p2', "Pour une villa avec radiateurs existants : la PAC air/eau est généralement le meilleur choix. Pour une nouvelle construction ou avec plancher chauffant : la géothermique offre les meilleures performances à long terme. Pour un appartement : la PAC air/air avec système multi-split peut être une solution."),
          makeH2('fr3-h3', 'Subventions disponibles en 2026'),
          makeBlock('fr3-p3', "Dans le canton de Vaud, le programme EcoBau finance jusqu'à 15 000 CHF pour une PAC remplaçant un chauffage fossile. À Genève, le programme Chauffez Renouvelable peut couvrir jusqu'à 50% des coûts avec un plafond à 30 000 CHF pour les villas."),
          makeBlock('fr3-p4', "Attention : pour bénéficier des subventions, la décision doit être prise AVANT les travaux et le dossier doit être déposé en amont. Notre équipe gère l'intégralité du montage de dossier pour vous."),
        ],
        en: [
          makeH2('en3-h1', 'The 3 types of heat pumps'),
          makeBlock('en3-p1', "Heat pumps (HP) come in three main families: air/water (the most common), geothermal (the most efficient but more expensive to install), and air/air (for supplementary heating or homes without radiators)."),
          makeH2('en3-h2', 'Which type for your home?'),
          makeBlock('en3-p2', "For a villa with existing radiators: air/water HP is generally the best choice. For new construction or underfloor heating: geothermal offers the best long-term performance. For an apartment: an air/air HP with multi-split system can be a solution."),
          makeH2('en3-h3', 'Available subsidies in 2026'),
          makeBlock('en3-p3', "In the canton of Vaud, the EcoBau programme funds up to CHF 15,000 for an HP replacing fossil heating. In Geneva, Chauffez Renouvelable can cover up to 50% of costs, capped at CHF 30,000 for villas."),
          makeBlock('en3-p4', "Important: to benefit from subsidies, the decision must be made BEFORE work begins and the application must be filed in advance. Our team handles the entire application process for you."),
        ],
        de: [
          makeH2('de3-h1', 'Die 3 Arten von Wärmepumpen'),
          makeBlock('de3-p1', "Wärmepumpen (WP) kommen in drei Hauptfamilien: Luft/Wasser (die häufigste), Erdwärme (die effizienteste, aber teurer zu installieren) und Luft/Luft (für Zusatzheizung oder Wohnungen ohne Heizkörper)."),
          makeH2('de3-h2', 'Welcher Typ für Ihr Zuhause?'),
          makeBlock('de3-p2', "Für eine Villa mit bestehenden Heizkörpern: Luft/Wasser-WP ist in der Regel die beste Wahl. Für Neubau oder Fußbodenheizung: Erdwärme bietet die beste Langzeitleistung. Für eine Wohnung: Luft/Luft-WP mit Multi-Split-System kann eine Lösung sein."),
          makeH2('de3-h3', 'Verfügbare Subventionen 2026'),
          makeBlock('de3-p3', "Im Kanton Waadt fördert das EcoBau-Programm bis zu CHF 15.000 für eine WP als Ersatz für Fossilheizung. In Genf kann Chauffez Renouvelable bis zu 50% der Kosten abdecken, max. CHF 30.000 für Villen."),
          makeBlock('de3-p4', "Wichtig: Für Subventionen muss die Entscheidung VOR Baubeginn getroffen und der Antrag im Voraus eingereicht werden. Unser Team übernimmt den gesamten Antragsprozess für Sie."),
        ],
      },
    },
  ]

  for (const article of articles) {
    await client.createOrReplace(article)
  }
  console.log('articles ×3: créés (images à uploader dans Studio)')
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
async function main() {
  console.log('=== Seed complet Swiss Ecogestes ===')
  await upsertHomePage()
  await upsertAboutPage()
  await upsertAProposPage()
  await upsertResultatsPage()
  await upsertStats()
  await upsertProcessSteps()
  await upsertClientTypes()
  await upsertTeamMembers()
  await upsertContactPage()
  await upsertSettings()
  await upsertLegalPages()
  await upsertHeroSlides()
  await upsertPartners()
  await upsertBlogPage()
  await upsertArticles()
  console.log('=== Terminé — tous les documents créés ===')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
