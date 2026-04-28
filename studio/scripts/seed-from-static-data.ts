/**
 * Aligne Sanity avec les données statiques du projet :
 * 1. Vide paragraph2 de aboutPage
 * 2. Re-seed les 5 hero slides (avec upload d'images Unsplash)
 * 3. Seed les 4 pages service (villa, gerance, entreprise, communes)
 *
 * Usage : cd studio && npx sanity exec scripts/seed-from-static-data.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

// Cache URL → asset._id pour ne pas uploader deux fois la même image
const imageCache = new Map<string, string>()

async function uploadImageFromUrl(url: string, filename: string): Promise<string> {
  if (imageCache.has(url)) return imageCache.get(url)!
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Fetch failed: ${url}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: response.headers.get('content-type') || 'image/jpeg',
  })
  imageCache.set(url, asset._id)
  console.log(`  ↑ image: ${filename}`)
  return asset._id
}

function imgRef(assetId: string) {
  return { _type: 'image' as const, asset: { _type: 'reference' as const, _ref: assetId } }
}

function loc(fr: string, en: string, de: string) {
  return { fr, en, de }
}

function locArr(fr: string[], en: string[], de: string[]) {
  return { fr, en, de }
}

function key(i: number) {
  return `item-${i}-${Date.now()}`
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. ABOUT PAGE — vider paragraph2
// ─────────────────────────────────────────────────────────────────────────────

async function fixAboutPage() {
  console.log('\n[1/3] Correction aboutPage — suppression de paragraph2...')
  await client
    .patch('aboutPage')
    .set({ paragraph2: loc('', '', '') })
    .commit()
  console.log('✓ paragraph2 vidé')
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. HERO SLIDES
// ─────────────────────────────────────────────────────────────────────────────

async function seedHeroSlides() {
  console.log('\n[2/3] Seed hero slides...')

  // Supprimer les slides existantes
  const existingIds: string[] = await client.fetch('*[_type == "heroSlide"]._id')
  for (const id of existingIds) {
    await client.delete(id)
  }
  console.log(`  ${existingIds.length} slide(s) existante(s) supprimée(s)`)

  const slidesData = [
    {
      isMain: true,
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
      features: locArr(
        ['Recommandations indépendantes', 'Solutions adaptées', 'Aides et subventions', 'Expertise terrain'],
        ['Independent recommendations', 'Tailored solutions', 'Grants & subsidies', 'Field expertise'],
        ['Unabhängige Empfehlungen', 'Maßgeschneiderte Lösungen', 'Fördergelder & Subventionen', 'Felderfahrung']
      ),
      buttonText: loc('Découvrir nos solutions', 'Discover our solutions', 'Unsere Lösungen entdecken'),
      buttonLink: '#nos-solutions',
      secondButtonText: loc('Estimer mes économies', 'Estimate my savings', 'Meine Einsparungen schätzen'),
      secondButtonLink: '/contact',
      imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2074',
      order: 1,
    },
    {
      isMain: false,
      label: loc('Villas & Maisons', 'Villas & Houses', 'Villen & Häuser'),
      title: loc(
        'La transition énergétique simple et rentable',
        'Energy transition made simple and profitable',
        'Energiewende einfach und rentabel'
      ),
      subtitle: loc(
        "Swiss Ecogestes accompagne les propriétaires de villas et maisons vers une autonomie durable avec des solutions d'audit et de rénovation haute performance.",
        'Swiss Ecogestes accompanies villa and house owners towards sustainable autonomy with high-performance audit and renovation solutions.',
        'Swiss Ecogestes begleitet Villen- und Hausbesitzer mit leistungsstarken Audit- und Renovierungslösungen in eine nachhaltige Unabhängigkeit.'
      ),
      features: locArr(
        ['Audits CECB', 'Pompes à chaleur', 'Solaire Photovoltaïque'],
        ['CECB Audits', 'Heat Pumps', 'Solar Photovoltaic'],
        ['GEAK Audits', 'Wärmepumpen', 'Photovoltaik']
      ),
      buttonText: loc('Solutions pour Villas & Maisons', 'Solutions for Villas & Houses', 'Lösungen für Villen & Häuser'),
      buttonLink: '/services/villa',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
      order: 2,
    },
    {
      isMain: false,
      label: loc('Régies & Immeubles', 'Real Estate', 'Immobilien'),
      title: loc(
        'Partenaire des régies immobilières',
        'Partner for Real Estate Agencies',
        'Partner für Immobilienverwaltungen'
      ),
      subtitle: loc(
        'Valorisez votre parc immobilier et anticipez les obligations légales avec nos audits IDC et stratégies de rénovation.',
        'Enhance your property portfolio and anticipate legal obligations with our IDC audits and renovation strategies.',
        'Werten Sie Ihr Immobilienportfolio auf und antizipieren Sie gesetzliche Verpflichtungen mit unseren IDC-Audits und Renovierungsstrategien.'
      ),
      features: locArr(
        ['Calcul IDC', 'Audit de Parc', 'Subventions'],
        ['IDC Calculation', 'Portfolio Audit', 'Subsidies'],
        ['IDC-Berechnung', 'Portfolio-Audit', 'Fördergelder']
      ),
      buttonText: loc('Solutions pour Régies', 'Solutions for Agencies', 'Lösungen für Verwaltungen'),
      buttonLink: '/services/gerance',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
      order: 3,
    },
    {
      isMain: false,
      label: loc('Entreprises', 'Companies', 'Unternehmen'),
      title: loc(
        'Performance énergétique industrielle',
        'Industrial Energy Performance',
        'Industrielle Energieeffizienz'
      ),
      subtitle: loc(
        "Réduisez vos coûts d'exploitation et conformez-vous aux nouvelles exigences légales avec nos audits grands consommateurs.",
        'Reduce operating costs and comply with new legal requirements with our large consumer audits.',
        'Senken Sie Betriebskosten und erfüllen Sie neue gesetzliche Anforderungen mit unseren Großverbraucher-Audits.'
      ),
      features: locArr(
        ['Audit Grands Consommateurs', 'Optimisation Process', 'Exemption taxe CO2'],
        ['Large Consumer Audit', 'Process Optimization', 'CO2 Tax Exemption'],
        ['Großverbraucher-Audit', 'Prozessoptimierung', 'CO2-Abgabenbefreiung']
      ),
      buttonText: loc('Solutions pour Entreprises', 'Solutions for Businesses', 'Lösungen für Unternehmen'),
      buttonLink: '/services/entreprise',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070',
      order: 4,
    },
    {
      isMain: false,
      label: loc('Communes & GRD', 'Municipalities', 'Gemeinden'),
      title: loc(
        'Accompagnement des collectivités',
        'Support for Collectivities',
        'Unterstützung für Gemeinden'
      ),
      subtitle: loc(
        'Swiss Ecogestes soutient les communes et services industriels dans leur stratégie de transition énergétique territoriale.',
        'Swiss Ecogestes supports municipalities and industrial services in their territorial energy transition strategy.',
        'Swiss Ecogestes unterstützt Gemeinden und Industriedienste bei ihrer kommunalen Energiewende-Strategie.'
      ),
      features: locArr(
        ['Audits Territoriaux', 'Sensibilisation Citoyenne', 'Programmes Subventionnés'],
        ['Territorial Audits', 'Citizen Awareness', 'Subsidized Programs'],
        ['Kommunale Audits', 'Bürgersensibilisierung', 'Geförderte Programme']
      ),
      buttonText: loc('Solutions pour Communes', 'Solutions for Municipalities', 'Lösungen für Gemeinden'),
      buttonLink: '/services/communes',
      imageUrl: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=2070',
      order: 5,
    },
  ]

  for (const slide of slidesData) {
    const assetId = await uploadImageFromUrl(slide.imageUrl, `hero-slide-${slide.order}.jpg`)
    const doc: any = {
      _type: 'heroSlide',
      isMain: slide.isMain,
      label: slide.label,
      title: slide.title,
      subtitle: slide.subtitle,
      features: slide.features,
      buttonText: slide.buttonText,
      buttonLink: slide.buttonLink,
      image: imgRef(assetId),
      order: slide.order,
    }
    if (slide.isMain) {
      doc.description = (slide as any).description
      doc.featuresLabel = (slide as any).featuresLabel
      doc.secondButtonText = (slide as any).secondButtonText
      doc.secondButtonLink = (slide as any).secondButtonLink
    }
    await client.create(doc)
    console.log(`  ✓ Slide ${slide.order}: ${slide.title.fr}`)
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. PAGES SERVICE
// ─────────────────────────────────────────────────────────────────────────────

type ServiceItem = {
  title: { fr: string; en: string; de: string }
  description: { fr: string; en: string; de: string }
  imageUrl: string
  features: { fr: string[]; en: string[]; de: string[] }
  note?: { fr: string; en: string; de: string }
}

type ServicePageData = {
  slug: string
  seo: { title: { fr: string; en: string; de: string }; description: { fr: string; en: string; de: string }; canonical: string }
  sectionLabel: { fr: string; en: string; de: string }
  title: { fr: string; en: string; de: string }
  description: { fr: string; en: string; de: string }
  heroImageUrl: string
  buttonText: { fr: string; en: string; de: string }
  buttonLink: string
  backLink: { fr: string; en: string; de: string }
  services: ServiceItem[]
}

const servicePages: ServicePageData[] = [
  // ── VILLA ──────────────────────────────────────────────────────────────────
  {
    slug: 'villa',
    seo: {
      title: loc('Services pour Villas & Maisons | Visite SIG, CECB & IDC', 'Villa & House Services | SIG Visit, CECB & IDC', 'Dienstleistungen für Villen & Häuser | SIG-Besuch, CECB & IDC'),
      description: loc(
        'Solutions énergétiques pour propriétaires de villas. Visite Villa SIG, audit chauffage gratuit, calcul IDC, CECB et audit sur mesure.',
        'Energy solutions for villa owners. SIG villa visit, free heating audit, IDC calculation, CECB, and custom audit.',
        'Energielösungen für Villenbesitzer. SIG-Villenbesuch, kostenloser Heizungsaudit, IDC-Berechnung, CECB und maßgeschneiderter Audit.'
      ),
      canonical: '/services/villa',
    },
    sectionLabel: loc('Villas & Maisons', 'Villas & Houses', 'Villen & Häuser'),
    title: loc('Expertise Villa & Maison', 'Villa & House Expertise', 'Villa & Haus Expertise'),
    description: loc(
      "Nous accompagnons les propriétaires dans l'optimisation énergétique de leur habitat, en identifiant des économies concrètes, en maximisant les subventions disponibles et en proposant des solutions de rénovation pertinentes pour augmenter durablement la valeur du bien.",
      "We support homeowners in optimizing their home's energy performance, identifying concrete savings, maximizing available subsidies, and proposing relevant renovation solutions to sustainably increase property value.",
      'Wir begleiten Eigentümer bei der energetischen Optimierung ihres Hauses, identifizieren konkrete Einsparungen, maximieren verfügbare Fördermittel und schlagen relevante Renovierungslösungen vor, um den Immobilienwert nachhaltig zu steigern.'
    ),
    heroImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070',
    buttonText: loc('Lancer mon projet', 'Start my project', 'Projekt starten'),
    buttonLink: '/contact',
    backLink: loc('Retour', 'Back', 'Zurück'),
    services: [
      {
        title: loc('Visite Villa SIG', 'SIG Villa Visit', 'SIG-Villenbesuch'),
        description: loc(
          'Un audit complet pour identifier rapidement les économies possibles et les améliorations les plus pertinentes pour votre maison.',
          'A comprehensive audit to quickly identify possible savings and the most relevant improvements for your home.',
          'Ein umfassendes Audit zur schnellen Identifizierung möglicher Einsparungen und der relevantesten Verbesserungen für Ihr Haus.'
        ),
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
        features: locArr(
          ["Analyse et optimisation des consommations", "Installation de matériel efficient", "Identification des mesures d'assainissement", "Diagnostic de la chaudière", "Étude de faisabilité solaire photovoltaïque", "Conseils pratiques sur l'isolation et les écogestes", "Jusqu'à 80 % subventionné"],
          ['Consumption analysis and optimization', 'Installation of efficient equipment', 'Identification of remediation measures', 'Boiler diagnosis', 'Solar photovoltaic feasibility study', 'Practical advice on insulation and ecogestures', 'Up to 80% subsidized'],
          ['Verbrauchsanalyse und -optimierung', 'Installation effizienter Geräte', 'Identifizierung von Sanierungsmaßnahmen', 'Kesseldiagnose', 'Machbarkeitsstudie für Solarphotovoltaik', 'Praktische Beratung zu Dämmung und Ökogesten', 'Bis zu 80 % subventioniert']
        ),
      },
      {
        title: loc('Audit Chauffage (gratuit)*', 'Heating Audit (free)*', 'Heizungsaudit (kostenlos)*'),
        description: loc(
          "Votre installation a plus de 10 ans ? On analyse, conseille, et identifie les aides disponibles, sans frais.",
          "Is your installation more than 10 years old? We analyze, advise, and identify available aids, at no cost.",
          'Ist Ihre Anlage über 10 Jahre alt? Wir analysieren, beraten und identifizieren verfügbare Fördermittel, kostenlos.'
        ),
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800',
        features: locArr(
          ['Diagnostic complet', 'Recommandations renouvelables', 'Subventions cantonales', '100 % gratuit, subventionné SuisseEnergie'],
          ['Complete diagnosis', 'Renewable energy recommendations', 'Cantonal subsidies', '100% free, subsidized by SwissEnergy'],
          ['Vollständige Diagnose', 'Empfehlungen für erneuerbare Energien', 'Kantonale Subventionen', '100 % kostenlos, gefördert durch EnergieSchweiz']
        ),
        note: loc('* Sous conditions', '* Subject to conditions', '* Unter Bedingungen'),
      },
      {
        title: loc('Calcul IDC', 'IDC Calculation', 'IDC-Berechnung'),
        description: loc(
          "Pilotez la performance énergétique de votre bâtiment en toute conformité. Nous réalisons le calcul IDC afin de vous donner une vision claire de vos consommations et d'identifier rapidement les éventuels besoins d'action.",
          "Manage your building's energy performance in full compliance. We perform the IDC calculation to give you a clear view of your consumption and quickly identify any need for action.",
          'Steuern Sie die Energieeffizienz Ihres Gebäudes vollständig konform. Wir führen die IDC-Berechnung durch, um Ihnen einen klaren Überblick über Ihren Verbrauch zu geben und eventuelle Handlungsbedarfe schnell zu identifizieren.'
        ),
        imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800',
        features: locArr(
          ['Calcul précis et certifié', 'Respect des obligations légales', 'Vision claire de la performance énergétique'],
          ['Precise and certified calculation', 'Compliance with legal obligations', 'Clear view of energy performance'],
          ['Präzise und zertifizierte Berechnung', 'Einhaltung gesetzlicher Verpflichtungen', 'Klarer Überblick über die Energieeffizienz']
        ),
      },
      {
        title: loc('CECB & CECB+', 'CECB & CECB+', 'CECB & CECB+'),
        description: loc(
          "Analyse officielle de l'étiquette énergétique de votre bâtiment. Le CECB+ inclut un rapport de conseil complet avec scénarios de rénovation chiffrés.",
          "Official analysis of your building's energy label. CECB+ includes a complete advisory report with quantified renovation scenarios.",
          "Offizielle Analyse des Energieausweises Ihres Gebäudes. CECB+ beinhaltet einen vollständigen Beratungsbericht mit quantifizierten Renovierungsszenarien."
        ),
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
        features: locArr(
          ["Analyse complète de l'enveloppe thermique", 'Étiquette énergétique officielle (A à G)', 'Rapport de conseil avec scénarios de travaux', 'Estimation des coûts et des subventions', 'Accompagnement administratif complet'],
          ['Complete thermal envelope analysis', 'Official energy label (A to G)', 'Advisory report with work scenarios', 'Cost and subsidy estimation', 'Complete administrative support'],
          ['Vollständige Analyse der thermischen Hülle', 'Offizielles Energielabel (A bis G)', 'Beratungsbericht mit Arbeitsszenarien', 'Schätzung von Kosten und Subventionen', 'Umfassende administrative Unterstützung']
        ),
      },
      {
        title: loc('Audit sur Mesure', 'Custom Audit', 'Maßgeschneidertes Audit'),
        description: loc(
          'Une approche flexible pour répondre précisément à vos besoins.',
          'A flexible approach to precisely meet your needs.',
          'Ein flexibler Ansatz, um Ihren Bedürfnissen präzise zu entsprechen.'
        ),
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
        features: locArr(
          ['Prestation adaptée à votre projet', 'Analyse ciblée selon vos priorités', 'Recommandations personnalisées', 'Actions proposées selon votre budget et objectifs', 'Accompagnement sur mesure'],
          ['Service adapted to your project', 'Targeted analysis according to your priorities', 'Personalized recommendations', 'Actions proposed according to your budget and goals', 'Tailored support'],
          ['An Ihr Projekt angepasste Leistung', 'Gezielte Analyse nach Ihren Prioritäten', 'Personalisierte Empfehlungen', 'Maßnahmen entsprechend Ihrem Budget und Ihren Zielen', 'Maßgeschneiderte Begleitung']
        ),
      },
    ],
  },

  // ── GÉRANCE ────────────────────────────────────────────────────────────────
  {
    slug: 'gerance',
    seo: {
      title: loc('Services Régies & Immeubles | GED, IDC & Audit', 'Real Estate & Buildings Services | GED, IDC & Audit', 'Dienstleistungen für Verwaltung & Gebäude | GED, IDC & Audit'),
      description: loc(
        "Partenaire des régies immobilières. GED, écologement, audit chauffage, calcul IDC et accompagnement AMU pour votre parc immobilier.",
        'Partner for real estate agencies. DEM, ecohousing, heating audit, IDC calculation and AMU support for your property portfolio.',
        'Partner für Immobilienverwaltungen. GED, Ökologement, Heizungsaudit, IDC-Berechnung und AMU-Begleitung für Ihren Immobilienbestand.'
      ),
      canonical: '/services/gerance',
    },
    sectionLabel: loc('Régies & Immeubles', 'Real Estate & Buildings', 'Verwaltung & Gebäude'),
    title: loc('Gestion Énergétique de Parc', 'Portfolio Energy Management', 'Energiemanagement für Immobilienparks'),
    description: loc(
      "Nous aidons les régies et propriétaires à structurer leur stratégie énergétique : audits, calcul IDC, priorisation des travaux, conformité réglementaire et valorisation du parc immobilier sur le long terme.",
      'We help agencies and owners to structure their energy strategy: audits, IDC calculation, work prioritization, regulatory compliance and long-term property portfolio enhancement.',
      'Wir helfen Verwaltungen und Eigentümern, ihre Energiestrategie zu strukturieren: Audits, IDC-Berechnung, Arbeitspriorisierung, Rechtskonformität und langfristige Aufwertung des Immobilienbestands.'
    ),
    heroImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070',
    buttonText: loc('Contacter notre pôle Régie', 'Contact our Agency Division', 'Unsere Verwaltungsabteilung kontaktieren'),
    buttonLink: '/contact',
    backLink: loc('Retour', 'Back', 'Zurück'),
    services: [
      {
        title: loc('GED - Gestionnaire Énergie Délégué', 'DEM - Delegated Energy Manager', 'GED - Delegierter Energiemanager'),
        description: loc(
          "Analyse globale du portefeuille immobilier. Identification des objets prioritaires pour la rénovation et mise en place d'actions concrètes.",
          'Global analysis of the real estate portfolio. Identification of priority objects for renovation and implementation of concrete actions.',
          'Globale Analyse des Immobilienportfolios. Identifizierung prioritärer Objekte für die Renovierung und Umsetzung konkreter Maßnahmen.'
        ),
        imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800',
        features: locArr(
          ["COE (contrat d'optimisation énergétique)", 'Audit circulateurs', 'Audit ventilation', "Évaluation de l'équilibrage hydraulique", 'Audit du local déchets', 'Audit éclairage'],
          ['EOC (energy optimization contract)', 'Circulator audit', 'Ventilation audit', 'Hydraulic balancing assessment', 'Waste room audit', 'Lighting audit'],
          ['EOV (Energieoptimierungsvertrag)', 'Umwälzpumpen-Audit', 'Lüftungsaudit', 'Bewertung des hydraulischen Abgleichs', 'Abfallraum-Audit', 'Beleuchtungsaudit']
        ),
      },
      {
        title: loc('Écologement (gratuit)*', 'Ecohousing (free)*', 'Ökologement (kostenlos)*'),
        description: loc(
          "Réduisez les consommations de votre immeuble, sans travaux lourds. Nos visites permettent d'identifier des économies concrètes et immédiates.",
          "Reduce your building's consumption without major works. Our visits identify concrete and immediate savings.",
          'Reduzieren Sie den Verbrauch Ihres Gebäudes ohne große Arbeiten. Unsere Besuche identifizieren konkrete und sofortige Einsparungen.'
        ),
        imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800',
        features: locArr(
          ["Réduction des consommations d'électricité, de chauffage et d'eau", 'Sensibilisation des habitants', 'Programme subventionné', 'Actions simples et rapides', 'Valorisation auprès des locataires', 'Installation de matériel efficient'],
          ['Reduction of electricity, heating and water consumption', 'Resident awareness', 'Subsidized program', 'Simple and fast actions', 'Enhanced value for tenants', 'Installation of efficient equipment'],
          ['Reduzierung von Strom-, Heizungs- und Wasserverbrauch', 'Sensibilisierung der Bewohner', 'Gefördertes Programm', 'Einfache und schnelle Maßnahmen', 'Aufwertung gegenüber Mietern', 'Installation effizienter Geräte']
        ),
        note: loc('* Sous conditions', '* Subject to conditions', '* Unter Bedingungen'),
      },
      {
        title: loc('Audit Chauffage (gratuit)*', 'Heating Audit (free)*', 'Heizungsaudit (kostenlos)*'),
        description: loc(
          "Votre installation a plus de 10 ans ? On analyse, conseille, et identifie les aides disponibles, sans frais.",
          "Is your installation more than 10 years old? We analyze, advise, and identify available aids, at no cost.",
          'Ist Ihre Anlage über 10 Jahre alt? Wir analysieren, beraten und identifizieren verfügbare Fördermittel, kostenlos.'
        ),
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800',
        features: locArr(
          ['Diagnostic complet', 'Recommandations renouvelables', 'Subventions cantonales', '100 % gratuit, subventionné SuisseEnergie'],
          ['Complete diagnosis', 'Renewable energy recommendations', 'Cantonal subsidies', '100% free, subsidized by SwissEnergy'],
          ['Vollständige Diagnose', 'Empfehlungen für erneuerbare Energien', 'Kantonale Subventionen', '100 % kostenlos, gefördert durch EnergieSchweiz']
        ),
        note: loc('* Sous conditions', '* Subject to conditions', '* Unter Bedingungen'),
      },
      {
        title: loc('Calcul IDC', 'IDC Calculation', 'IDC-Berechnung'),
        description: loc(
          "Pilotez la performance énergétique de votre bâtiment en toute conformité. Nous réalisons le calcul IDC afin de vous donner une vision claire de vos consommations.",
          "Manage your building's energy performance in full compliance. We perform the IDC calculation to give you a clear view of your consumption.",
          'Steuern Sie die Energieeffizienz Ihres Gebäudes vollständig konform. Wir führen die IDC-Berechnung durch, um Ihnen einen klaren Überblick über Ihren Verbrauch zu geben.'
        ),
        imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800',
        features: locArr(
          ['Calcul précis et certifié', 'Respect des obligations légales', 'Vision claire de la performance énergétique'],
          ['Precise and certified calculation', 'Compliance with legal obligations', 'Clear view of energy performance'],
          ['Präzise und zertifizierte Berechnung', 'Einhaltung gesetzlicher Verpflichtungen', 'Klarer Überblick über die Energieeffizienz']
        ),
      },
      {
        title: loc('Accompagnement AMU', 'AMU Support', 'AMU-Begleitung'),
        description: loc(
          "Facilitez vos projets de rénovation et maximisez leur impact. Nous intégrons les usagers au cœur du projet pour garantir le bon usage et la performance des bâtiments.",
          'Facilitate your renovation projects and maximize their impact. We integrate users at the heart of the project to ensure proper use and building performance.',
          'Erleichtern Sie Ihre Renovierungsprojekte und maximieren Sie deren Wirkung. Wir integrieren die Nutzer in das Projekt, um die ordnungsgemäße Nutzung und Leistung der Gebäude sicherzustellen.'
        ),
        imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800',
        features: locArr(
          ['Accompagnement avant, pendant et après travaux', 'Implication des occupants pour éviter les blocages', "Optimisation de l'usage réel du bâtiment", 'Meilleure atteinte des objectifs énergétiques'],
          ['Support before, during and after works', 'Occupant involvement to avoid blockages', 'Optimization of actual building use', 'Better achievement of energy goals'],
          ['Begleitung vor, während und nach den Arbeiten', 'Einbeziehung der Bewohner zur Vermeidung von Blockaden', 'Optimierung der tatsächlichen Gebäudenutzung', 'Bessere Erreichung der Energieziele']
        ),
      },
      {
        title: loc('Audit sur Mesure', 'Custom Audit', 'Maßgeschneidertes Audit'),
        description: loc(
          'Chaque bâtiment est unique. Votre audit aussi.',
          'Every building is unique. So is your audit.',
          'Jedes Gebäude ist einzigartig. Ihr Audit auch.'
        ),
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
        features: locArr(
          ['Adapté à vos contraintes & objectifs', 'Recommandations actionnables', 'Premier échange sans engagement'],
          ['Adapted to your constraints & goals', 'Actionable recommendations', 'First exchange with no commitment'],
          ['Angepasst an Ihre Einschränkungen & Ziele', 'Umsetzbare Empfehlungen', 'Erstes Gespräch unverbindlich']
        ),
      },
    ],
  },

  // ── ENTREPRISE ─────────────────────────────────────────────────────────────
  {
    slug: 'entreprise',
    seo: {
      title: loc('Services pour Entreprises | Visite SIG, PEIK & Audit', 'Services for Businesses | SIG Visit, PEIK & Audit', 'Dienstleistungen für Unternehmen | SIG-Besuch, PEIK & Audit'),
      description: loc(
        'Optimisation énergétique pour PME et entreprises. Visite Conseil SIG, Audit PEIK, audit chauffage et calcul IDC.',
        'Energy optimization for SMEs and businesses. Free SIG advisory visit, PEIK audit, heating audit, and IDC calculation.',
        'Energieoptimierung für KMU und Unternehmen. Kostenloser SIG-Beratungsbesuch, PEIK-Audit, Heizungsaudit und IDC-Berechnung.'
      ),
      canonical: '/services/entreprise',
    },
    sectionLabel: loc('Entreprises', 'Companies', 'Unternehmen'),
    title: loc('Performance Énergétique Entreprise', 'Business Energy Performance', 'Energieeffizienz für Unternehmen'),
    description: loc(
      "Nos audits permettent d'identifier rapidement des leviers d'économie, de réduire les coûts d'exploitation et d'assurer la conformité aux exigences légales, avec des recommandations concrètes et des subventions intéressantes.",
      'Our audits quickly identify savings levers, reduce operating costs and ensure compliance with legal requirements, with concrete recommendations and attractive subsidies.',
      'Unsere Audits identifizieren schnell Einsparmöglichkeiten, senken Betriebskosten und gewährleisten die Einhaltung gesetzlicher Anforderungen — mit konkreten Empfehlungen und attraktiven Fördermitteln.'
    ),
    heroImageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000',
    buttonText: loc('Audit pour Entreprise', 'Audit for Business', 'Audit für Unternehmen'),
    buttonLink: '/contact',
    backLink: loc('Retour', 'Back', 'Zurück'),
    services: [
      {
        title: loc('Visite Conseil (gratuite)*', 'Advisory Visit (free)*', 'Beratungsbesuch (kostenlos)*'),
        description: loc(
          "Une première analyse gratuite pour repérer les actions simples et rentables permettant de réduire vos consommations et vos coûts.",
          'A free initial analysis to identify simple and cost-effective actions to reduce your consumption and costs.',
          'Eine kostenlose Erstanalyse, um einfache und kostengünstige Maßnahmen zur Reduzierung Ihres Verbrauchs und Ihrer Kosten zu identifizieren.'
        ),
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800',
        features: locArr(
          ['Analyse rapide', 'Conseils ciblés', 'Économies immédiates', 'Matériel efficient', 'Gratuite*'],
          ['Quick analysis', 'Targeted advice', 'Immediate savings', 'Efficient equipment', 'Free of charge*'],
          ['Schnelle Analyse', 'Gezielte Beratung', 'Sofortige Einsparungen', 'Effiziente Geräte', 'Kostenlos*']
        ),
        note: loc('* Sous conditions', '* Subject to conditions', '* Unter Bedingungen'),
      },
      {
        title: loc('Visite Expertise', 'Expertise Visit', 'Expertenbesuch'),
        description: loc(
          "Une analyse plus approfondie de vos installations et de vos usages pour identifier les optimisations et prioriser les actions à fort impact.",
          'A more in-depth analysis of your installations and usage to identify optimizations and prioritize high-impact actions.',
          'Eine eingehendere Analyse Ihrer Anlagen und Ihrer Nutzung, um Optimierungen zu identifizieren und Maßnahmen mit hoher Wirkung zu priorisieren.'
        ),
        imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800',
        features: locArr(
          ['Diagnostic approfondi', 'Recommandations ciblées', 'Priorisation des actions', 'Aides disponibles', 'Subventionnée'],
          ['In-depth diagnosis', 'Targeted recommendations', 'Action prioritization', 'Available aids', 'Subsidized'],
          ['Eingehende Diagnose', 'Gezielte Empfehlungen', 'Maßnahmenpriorisierung', 'Verfügbare Fördermittel', 'Subventioniert']
        ),
      },
      {
        title: loc('Audit PEIK', 'PEIK Audit', 'PEIK-Audit'),
        description: loc(
          "Pour les entreprises consommant plus de 100'000 kWh/an. Un audit énergétique structuré qui permet d'évaluer précisément vos consommations, de chiffrer les économies potentielles et de définir un plan d'action clair et rentable.",
          "For companies consuming more than 100,000 kWh/year. A structured energy audit to precisely assess your consumption, quantify potential savings, and define a clear and profitable action plan.",
          "Für Unternehmen mit einem Verbrauch von mehr als 100'000 kWh/Jahr. Ein strukturiertes Energieaudit zur genauen Bewertung Ihres Verbrauchs, Quantifizierung von Einsparmöglichkeiten und Definition eines klaren Aktionsplans."
        ),
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800',
        features: locArr(
          ['Diagnostic complet', 'Mesures prioritaires', 'Économies chiffrées', "Plan d'action clair", '50 % à 70 % subventionné'],
          ['Complete diagnosis', 'Priority measures', 'Quantified savings', 'Clear action plan', '50% to 70% subsidized'],
          ['Vollständige Diagnose', 'Prioritäre Maßnahmen', 'Quantifizierte Einsparungen', 'Klarer Aktionsplan', '50 % bis 70 % subventioniert']
        ),
      },
      {
        title: loc('Audit Chauffage (gratuit)*', 'Heating Audit (free)*', 'Heizungsaudit (kostenlos)*'),
        description: loc(
          "Votre installation a plus de 10 ans ? On analyse, conseille, et identifie les aides disponibles, sans frais.",
          "Is your installation more than 10 years old? We analyze, advise, and identify available aids, at no cost.",
          'Ist Ihre Anlage über 10 Jahre alt? Wir analysieren, beraten und identifizieren verfügbare Fördermittel, kostenlos.'
        ),
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800',
        features: locArr(
          ['Diagnostic complet', 'Recommandations renouvelables', 'Subventions cantonales', '100 % gratuit, subventionné SuisseEnergie'],
          ['Complete diagnosis', 'Renewable energy recommendations', 'Cantonal subsidies', '100% free, subsidized by SwissEnergy'],
          ['Vollständige Diagnose', 'Empfehlungen für erneuerbare Energien', 'Kantonale Subventionen', '100 % kostenlos, gefördert durch EnergieSchweiz']
        ),
        note: loc('* Sous conditions', '* Subject to conditions', '* Unter Bedingungen'),
      },
      {
        title: loc('Calcul IDC', 'IDC Calculation', 'IDC-Berechnung'),
        description: loc(
          "Pilotez la performance énergétique de votre bâtiment en toute conformité. Nous réalisons le calcul IDC afin de vous donner une vision claire de vos consommations.",
          "Manage your building's energy performance in full compliance. We perform the IDC calculation to give you a clear view of your consumption.",
          'Steuern Sie die Energieeffizienz Ihres Gebäudes vollständig konform. Wir führen die IDC-Berechnung durch, um Ihnen einen klaren Überblick über Ihren Verbrauch zu geben.'
        ),
        imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800',
        features: locArr(
          ['Calcul précis et certifié', 'Respect des obligations légales', 'Vision claire de la performance énergétique'],
          ['Precise and certified calculation', 'Compliance with legal obligations', 'Clear view of energy performance'],
          ['Präzise und zertifizierte Berechnung', 'Einhaltung gesetzlicher Verpflichtungen', 'Klarer Überblick über die Energieeffizienz']
        ),
      },
      {
        title: loc('Audit sur Mesure', 'Custom Audit', 'Maßgeschneidertes Audit'),
        description: loc(
          "Une analyse ciblée selon vos enjeux réels pour concentrer vos efforts sur les leviers les plus pertinents.",
          'A targeted analysis based on your real challenges to focus your efforts on the most relevant levers.',
          'Eine gezielte Analyse auf Basis Ihrer tatsächlichen Herausforderungen, um Ihre Bemühungen auf die relevantesten Hebel zu konzentrieren.'
        ),
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
        features: locArr(
          ['Besoins spécifiques', 'Analyse ciblée', 'Actions concrètes', 'Suivi personnalisé'],
          ['Specific needs', 'Targeted analysis', 'Concrete actions', 'Personalized follow-up'],
          ['Spezifische Bedürfnisse', 'Gezielte Analyse', 'Konkrete Maßnahmen', 'Personalisierte Nachverfolgung']
        ),
      },
    ],
  },

  // ── COMMUNES ───────────────────────────────────────────────────────────────
  {
    slug: 'communes',
    seo: {
      title: loc('Services pour Communes & GRD | Stratégie Énergétique Territoriale', 'Services for Municipalities & DSOs | Territorial Energy Strategy', 'Dienstleistungen für Gemeinden & VNB | Territoriale Energiestrategie'),
      description: loc(
        'Accompagnement des communes et services industriels pour définir et mettre en œuvre leur stratégie énergétique territoriale.',
        'Support for municipalities and industrial services to define and implement their territorial energy strategy.',
        'Unterstützung für Gemeinden und industrielle Dienste bei der Definition und Umsetzung ihrer territorialen Energiestrategie.'
      ),
      canonical: '/services/communes',
    },
    sectionLabel: loc('Communes & GRD', 'Municipalities & DSOs', 'Gemeinden & VNB'),
    title: loc('Un partenaire pour atteindre vos objectifs climatiques', 'A partner to achieve your climate goals', 'Ein Partner zur Erreichung Ihrer Klimaziele'),
    description: loc(
      "Nous accompagnons les communes et services industriels dans la définition et la mise en œuvre de stratégies énergétiques territoriales, en combinant analyse technique, planification et mobilisation des acteurs locaux.",
      'We support municipalities and industrial services in defining and implementing territorial energy strategies, combining technical analysis, planning, and local stakeholder mobilization.',
      'Wir begleiten Gemeinden und industrielle Dienste bei der Definition und Umsetzung territorialer Energiestrategien, durch Kombination von technischer Analyse, Planung und Mobilisierung lokaler Akteure.'
    ),
    heroImageUrl: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&q=80&w=2000',
    buttonText: loc("Discuter d'un partenariat", 'Discuss a partnership', 'Partnerschaft besprechen'),
    buttonLink: '/contact',
    backLink: loc('Retour', 'Back', 'Zurück'),
    services: [
      {
        title: loc("Audit Général & Plan d'Action", 'General Audit & Action Plan', 'Allgemeines Audit & Aktionsplan'),
        description: loc(
          "Une approche structurée pour définir vos priorités et transformer vos objectifs en actions concrètes.",
          'A structured approach to define your priorities and transform your goals into concrete actions.',
          'Ein strukturierter Ansatz zur Definition Ihrer Prioritäten und zur Umsetzung Ihrer Ziele in konkrete Maßnahmen.'
        ),
        imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000',
        features: locArr(
          ["Analyse de vos objectifs énergétiques, climatiques et réglementaires", "Évaluation des potentiels d'amélioration", "Élaboration d'un plan d'action clair et réaliste", 'Déploiement progressif des mesures', 'Suivi complet'],
          ['Analysis of your energy, climate and regulatory goals', 'Assessment of improvement potentials', 'Development of a clear and realistic action plan', 'Progressive deployment of measures', 'Complete monitoring'],
          ['Analyse Ihrer Energie-, Klima- und Regulierungsziele', 'Bewertung der Verbesserungspotenziale', 'Entwicklung eines klaren und realistischen Aktionsplans', 'Schrittweise Umsetzung der Maßnahmen', 'Vollständiges Monitoring']
        ),
      },
      {
        title: loc('Mesures Concrètes', 'Concrete Measures', 'Konkrete Maßnahmen'),
        description: loc(
          "Des solutions adaptées aux différents publics de votre territoire, pour passer de la stratégie à l'action.",
          'Solutions tailored to the different audiences in your territory, to move from strategy to action.',
          'Auf die verschiedenen Zielgruppen Ihres Gebiets zugeschnittene Lösungen, um von der Strategie zur Aktion zu gelangen.'
        ),
        imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000',
        features: locArr(
          ['Bâtiments communaux — audits et rénovation énergétique', 'Immeubles et régies — GED, IDC, écologement', 'Villas et maisons — visite SIG, audit chauffage, CECB', 'Entreprises locales — visite conseil, audit PEIK'],
          ['Municipal buildings — energy audits and renovation', 'Buildings & agencies — DEM, IDC, ecohousing', 'Villas & houses — SIG visit, heating audit, CECB', 'Local businesses — advisory visit, PEIK audit'],
          ['Kommunale Gebäude — Energieaudits und Renovierung', 'Gebäude & Verwaltungen — GED, IDC, Ökologement', 'Villen & Häuser — SIG-Besuch, Heizungsaudit, CECB', 'Lokale Unternehmen — Beratungsbesuch, PEIK-Audit']
        ),
      },
    ],
  },
]

async function seedServicePages() {
  console.log('\n[3/3] Seed pages service...')

  for (const page of servicePages) {
    // Supprimer l'existant
    const existingIds: string[] = await client.fetch(
      '*[_type == "servicePage" && pageSlug == $slug]._id',
      { slug: page.slug }
    )
    for (const id of existingIds) await client.delete(id)

    // Upload heroImage
    const heroAssetId = await uploadImageFromUrl(page.heroImageUrl, `${page.slug}-hero.jpg`)

    // Upload service images
    const servicesWithAssets = []
    for (let i = 0; i < page.services.length; i++) {
      const svc = page.services[i]
      const assetId = await uploadImageFromUrl(svc.imageUrl, `${page.slug}-service-${i + 1}.jpg`)
      const svcDoc: any = {
        _key: key(i),
        title: svc.title,
        description: svc.description,
        image: imgRef(assetId),
        features: svc.features,
      }
      if (svc.note) svcDoc.note = svc.note
      servicesWithAssets.push(svcDoc)
    }

    await client.create({
      _type: 'servicePage',
      pageSlug: page.slug,
      seo: {
        title: page.seo.title,
        description: page.seo.description,
        canonical: page.seo.canonical,
      },
      sectionLabel: page.sectionLabel,
      title: page.title,
      description: page.description,
      heroImage: imgRef(heroAssetId),
      buttonText: page.buttonText,
      buttonLink: page.buttonLink,
      backLink: page.backLink,
      services: servicesWithAssets,
    })

    console.log(`  ✓ Page "${page.slug}" créée (${page.services.length} services)`)
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== Seed depuis données statiques ===')
  await fixAboutPage()
  await seedHeroSlides()
  await seedServicePages()
  console.log('\n✅ Terminé !')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
