import fs from 'node:fs'
import path from 'node:path'
import { getCliClient } from 'sanity/cli'

type Locale = 'fr' | 'en' | 'de'

type LocaleString = {
  fr: string
  en: string
  de: string
}

type LocaleText = {
  fr: string
  en: string
  de: string
}

const client = getCliClient({ apiVersion: '2024-01-01' })
const rootDir = path.resolve(process.cwd(), '..')

function readLocale(lang: Locale): any {
  const filePath = path.join(rootDir, 'public', 'locales', lang, 'common.json')
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function loc(fr: string, en: string, de: string): LocaleString {
  return { fr, en, de }
}

function loct(fr: string, en: string, de: string): LocaleText {
  return { fr, en, de }
}

function parseSteps(value?: string): string[] {
  if (!value) return []
  return value.split(',').map((x) => x.trim()).filter(Boolean)
}

async function upsertAProposPage() {
  const fr = readLocale('fr')
  const en = readLocale('en')
  const de = readLocale('de')

  const frTeam = fr?.team_page || {}
  const enTeam = en?.team_page || {}
  const deTeam = de?.team_page || {}

  const existingId = await client.fetch<string | null>(`*[_type == "aProposPage"][0]._id`)

  await client.createOrReplace({
    _id: existingId || 'aProposPage',
    _type: 'aProposPage',
    heroLabel: loc(frTeam.header_label || '', enTeam.header_label || '', deTeam.header_label || ''),
    heroTitle: loc(frTeam.header_title || '', enTeam.header_title || '', deTeam.header_title || ''),
    heroIntro: loct(frTeam.intro || '', enTeam.intro || '', deTeam.intro || ''),
    missionTitle: loc(frTeam.mission_title || '', enTeam.mission_title || '', deTeam.mission_title || ''),
    missionText: loct(frTeam.mission_text || '', enTeam.mission_text || '', deTeam.mission_text || ''),
    missionText2: loct(frTeam.mission_text2 || '', enTeam.mission_text2 || '', deTeam.mission_text2 || ''),
    presenceTitle: loc(frTeam.presence_title || '', enTeam.presence_title || '', deTeam.presence_title || ''),
    presenceText: loct(frTeam.presence_text || '', enTeam.presence_text || '', deTeam.presence_text || ''),
    companyStats: [
      {
        _key: 'a-propos-stat-1',
        value: '5',
        label: loc(
          frTeam.stat_experts || 'Experts dedies',
          enTeam.stat_experts || 'Dedicated experts',
          deTeam.stat_experts || 'Dedizierte Experten'
        ),
      },
      {
        _key: 'a-propos-stat-2',
        value: '2',
        label: loc(
          frTeam.stat_cantons || 'Cantons couverts',
          enTeam.stat_cantons || 'Cantons covered',
          deTeam.stat_cantons || 'Abgedeckte Kantone'
        ),
      },
      {
        _key: 'a-propos-stat-3',
        value: '6',
        label: loc(
          frTeam.stat_partners || 'Partenaires institutionnels',
          enTeam.stat_partners || 'Institutional partners',
          deTeam.stat_partners || 'Institutionelle Partner'
        ),
      },
      {
        _key: 'a-propos-stat-4',
        value: '100%',
        label: loc(
          frTeam.stat_approach || 'Neutre & independant',
          enTeam.stat_approach || 'Neutral & independent',
          deTeam.stat_approach || 'Neutral & unabhaengig'
        ),
      },
    ],
    qualityTitle: loc(frTeam.quality_title || '', enTeam.quality_title || '', deTeam.quality_title || ''),
    qualityText: loct(frTeam.quality_text || '', enTeam.quality_text || '', deTeam.quality_text || ''),
    qualitySteps: {
      fr: parseSteps(frTeam.quality_steps),
      en: parseSteps(enTeam.quality_steps),
      de: parseSteps(deTeam.quality_steps),
    },
    photoTitle: loc(frTeam.photo_title || '', enTeam.photo_title || '', deTeam.photo_title || ''),
    photoSubtitle: loc(
      frTeam.photo_subtitle || '',
      enTeam.photo_subtitle || '',
      deTeam.photo_subtitle || ''
    ),
  })

  console.log('aProposPage: upserted')
}

async function upsertResultatsPage() {
  const fr = readLocale('fr')
  const en = readLocale('en')
  const de = readLocale('de')

  const frResultats = fr?.resultats_page || {}
  const enResultats = en?.resultats_page || {}
  const deResultats = de?.resultats_page || {}

  const existingId = await client.fetch<string | null>(`*[_type == "resultatsPage"][0]._id`)

  await client.createOrReplace({
    _id: existingId || 'resultatsPage',
    _type: 'resultatsPage',
    seo: {
      title: loc(
        frResultats.seo_title || 'Resultats & Impact | Swiss Ecogestes',
        enResultats.seo_title || 'Results & Impact | Swiss Ecogestes',
        deResultats.seo_title || 'Ergebnisse & Impact | Swiss Ecogestes'
      ),
      description: loct(
        frResultats.seo_desc || '',
        enResultats.seo_desc || '',
        deResultats.seo_desc || ''
      ),
    },
    heroTitle: loc(
      frResultats.hero_title || 'Un impact reel, mesurable et documente',
      enResultats.hero_title || 'Real, measurable, documented impact',
      deResultats.hero_title || 'Ein realer, messbarer und dokumentierter Impact'
    ),
    heroSubtitle: loct(
      frResultats.hero_subtitle || '',
      enResultats.hero_subtitle || '',
      deResultats.hero_subtitle || ''
    ),
    impactStats: [
      {
        _key: 'resultats-stat-1',
        value: 150,
        suffix: '+',
        prefix: '',
        label: loc('Audits realises', 'Audits completed', 'Durchgefuehrte Audits'),
      },
      {
        _key: 'resultats-stat-2',
        value: 300,
        suffix: '+',
        prefix: '',
        label: loc('Batiments accompagnes', 'Buildings supported', 'Begleitete Gebaeude'),
      },
      {
        _key: 'resultats-stat-3',
        value: 25,
        suffix: '%',
        prefix: '~ ',
        label: loc('Economies identifiees', 'Identified savings', 'Identifizierte Einsparungen'),
      },
      {
        _key: 'resultats-stat-4',
        value: 15,
        suffix: '+',
        prefix: '',
        label: loc('Partenaires reconnus', 'Recognized partners', 'Anerkannte Partner'),
      },
    ],
    cases: [
      {
        _key: 'resultats-case-1',
        sector: loc('Regie & Immeuble', 'Real estate & building', 'Verwaltung & Gebaeude'),
        title: loc('Immeuble locatif, 24 logements - Geneve', 'Rental building, 24 units - Geneva', 'Mietshaus, 24 Wohnungen - Genf'),
        mainMetric: 18,
        mainMetricSuffix: '%',
        mainMetricLabel: loc('Economie generee', 'Generated savings', 'Erzielte Einsparung'),
        kpis: [
          {
            _key: 'resultats-case-1-kpi-1',
            value: '650',
            unit: 'MJ/m2a',
            label: loc('Conso. Initiale (IDC)', 'Initial consumption (IDC)', 'Anfangsverbrauch (IDC)'),
          },
          {
            _key: 'resultats-case-1-kpi-2',
            value: '12',
            unit: 'mois',
            label: loc('Retour sur investissement', 'Payback period', 'Amortisationsdauer'),
          },
        ],
        beforeItems: {
          fr: ['Chaufferie vetuste', 'Pompes mal reglees', 'Plaintes recurrentes de locataires pour inconfort estival et surchauffe'],
          en: ['Outdated boiler room', 'Poorly adjusted pumps', 'Recurring tenant complaints about summer discomfort and overheating'],
          de: ['Veraltete Heizzentrale', 'Schlecht eingestellte Pumpen', 'Wiederkehrende Mieterbeschwerden ueber Sommerkomfort und Ueberhitzung'],
        },
        afterItems: {
          fr: ['Audit IDC', 'Mise en place de la GED', 'Equilibrage hydraulique et optimisation ciblee'],
          en: ['IDC audit', 'Delegated energy management setup', 'Hydraulic balancing and targeted optimization'],
          de: ['IDC-Audit', 'Einrichtung des delegierten Energiemanagements', 'Hydraulischer Abgleich und gezielte Optimierung'],
        },
      },
      {
        _key: 'resultats-case-2',
        sector: loc('Villa individuelle', 'Single-family house', 'Einfamilienhaus'),
        title: loc('Maison familiale - La Cote (VD)', 'Family house - La Cote (VD)', 'Familienhaus - La Cote (VD)'),
        mainMetric: 65,
        mainMetricSuffix: '%',
        mainMetricLabel: loc("Frais d'etude couverts", 'Study costs covered', 'Studienkosten gedeckt'),
        kpis: [
          {
            _key: 'resultats-case-2-kpi-1',
            value: '100',
            unit: '%',
            label: loc('Plafond de Subvention', 'Subsidy cap', 'Subventionsobergrenze'),
          },
          {
            _key: 'resultats-case-2-kpi-2',
            value: '30',
            unit: 'jours',
            label: loc("Delai d'approbation", 'Approval timeline', 'Genehmigungsfrist'),
          },
        ],
        beforeItems: {
          fr: ['Chauffage au mazout tres couteux', 'Fortes deperditions en toiture', "Sensation d'inconfort face aux courants d'air"],
          en: ['Very costly oil heating', 'High roof heat losses', 'Discomfort due to air drafts'],
          de: ['Sehr kostspielige Oelheizung', 'Hohe Waermeverluste ueber das Dach', 'Unbehagen durch Zugluft'],
        },
        afterItems: {
          fr: ['Edition integrale CECB+', 'Conception de scenarios chiffres', "Montage complet du dossier d'aides"],
          en: ['Full CECB+ preparation', 'Design of quantified scenarios', 'Complete subsidy file support'],
          de: ['Vollstaendige CECB+-Erstellung', 'Ausarbeitung quantifizierter Szenarien', 'Komplette Begleitung des Foerderdossiers'],
        },
      },
      {
        _key: 'resultats-case-3',
        sector: loc('Entreprise & PME', 'Business & SME', 'Unternehmen & KMU'),
        title: loc('Site de production industriel - Lausanne', 'Industrial production site - Lausanne', 'Industrieller Produktionsstandort - Lausanne'),
        mainMetric: 22,
        mainMetricSuffix: '%',
        mainMetricLabel: loc('Economies annuelles', 'Annual savings', 'Jaehrliche Einsparungen'),
        kpis: [
          {
            _key: 'resultats-case-3-kpi-1',
            value: '200',
            unit: 'k kWh/an',
            label: loc('Consommation de base', 'Baseline consumption', 'Basisverbrauch'),
          },
          {
            _key: 'resultats-case-3-kpi-2',
            value: '70',
            unit: '%',
            label: loc('Taux subventionnable', 'Subsidizable rate', 'Foerderfaehiger Anteil'),
          },
        ],
        beforeItems: {
          fr: ["Pertes massives sur les reseaux d'air comprime", 'Groupes de froid mal regules', 'Risques de non-conformite cantonale'],
          en: ['Major losses on compressed-air networks', 'Poorly regulated cooling units', 'Risk of cantonal non-compliance'],
          de: ['Grosse Verluste in Druckluftnetzen', 'Schlecht geregelte Kaelteaggregate', 'Risiko kantonaler Nichtkonformitaet'],
        },
        afterItems: {
          fr: ['Audit PEIK complet', "Integration d'une recuperation de chaleur", "Plan d'action subventionne"],
          en: ['Full PEIK audit', 'Heat-recovery integration', 'Subsidized action plan'],
          de: ['Vollstaendiges PEIK-Audit', 'Integration einer Waermerueckgewinnung', 'Subventionierter Aktionsplan'],
        },
      },
    ],
  })

  console.log('resultatsPage: upserted')
}

async function upsertProcessSteps() {
  const existingSteps: Array<{ stepNumber?: number }> = await client.fetch(
    `*[_type == "processStep"]{stepNumber}`
  )

  const existing = new Set(
    existingSteps
      .map((s) => s.stepNumber)
      .filter((n): n is number => typeof n === 'number')
  )

  const source: Record<Locale, Array<{ title: string; description: string }>> = {
    fr: [
      { title: 'Analyse de votre situation', description: 'Identification des consommations et des enjeux' },
      { title: 'Audit energetique', description: 'Analyse detaillee de vos installations et de vos usages' },
      { title: 'Recommandations concretes', description: 'Actions priorisees avec estimation des economies' },
      { title: 'Accompagnement', description: 'Suivi et mise en oeuvre des solutions' },
    ],
    en: [
      { title: 'Analysis of your situation', description: 'Identification of consumption and key issues' },
      { title: 'Energy audit', description: 'Detailed analysis of your installations and usage' },
      { title: 'Concrete recommendations', description: 'Prioritized actions with estimated savings' },
      { title: 'Support', description: 'Follow-up and implementation of solutions' },
    ],
    de: [
      { title: 'Analyse Ihrer Situation', description: 'Identifizierung von Verbrauch und Herausforderungen' },
      { title: 'Energieaudit', description: 'Detaillierte Analyse Ihrer Anlagen und Nutzung' },
      { title: 'Konkrete Empfehlungen', description: 'Priorisierte Massnahmen mit Einsparungsschaetzung' },
      { title: 'Begleitung', description: 'Umsetzung und Begleitung der Loesungen' },
    ],
  }

  let created = 0

  for (let i = 0; i < 4; i += 1) {
    const stepNumber = i + 1
    if (existing.has(stepNumber)) continue

    await client.createOrReplace({
      _id: `processStep-seed-${stepNumber}`,
      _type: 'processStep',
      stepNumber,
      title: loc(source.fr[i].title, source.en[i].title, source.de[i].title),
      description: loc(source.fr[i].description, source.en[i].description, source.de[i].description),
    })

    created += 1
  }

  console.log(`processStep: created ${created}`)
}

async function printCounts() {
  const counts = await client.fetch(`{
    "aProposPagePublished": count(*[_type == "aProposPage" && !(_id in path("drafts.**"))]),
    "resultatsPagePublished": count(*[_type == "resultatsPage" && !(_id in path("drafts.**"))]),
    "processStepPublished": count(*[_type == "processStep" && !(_id in path("drafts.**"))])
  }`)

  console.log('published:', counts)
}

async function main() {
  await upsertAProposPage()
  await upsertResultatsPage()
  await upsertProcessSteps()
  await printCounts()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
