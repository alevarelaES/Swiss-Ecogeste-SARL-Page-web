import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@sanity/client'

import { getHeroSlides } from '../src/app/data/heroSlides'
import { getVillaPageContent } from '../src/app/data/villaPageContent'
import { getGerancePageContent } from '../src/app/data/gerancePageContent'
import { getEntreprisePageContent } from '../src/app/data/entreprisePageContent'
import { getCommunesPageContent } from '../src/app/data/communesPageContent'

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

type LocaleStringArray = {
  fr: string[]
  en: string[]
  de: string[]
}

const projectId = process.env.VITE_SANITY_PROJECT_ID || 'btjdqrld'
const dataset = process.env.VITE_SANITY_DATASET || 'production'
const token = process.env.VITE_SANITY_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN

if (!token) {
  throw new Error('Missing Sanity write token in .env (VITE_SANITY_WRITE_TOKEN)')
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const rootDir = path.resolve(process.cwd())

function readLocale(lang: Locale): any {
  const filePath = path.join(rootDir, 'public', 'locales', lang, 'common.json')
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function localize(fr: string, en: string, de: string): LocaleString {
  return { fr, en, de }
}

function localizeText(fr: string, en: string, de: string): LocaleText {
  return { fr, en, de }
}

function parseSteps(value: string | undefined): string[] {
  if (!value) return []
  return value.split(',').map((v) => v.trim()).filter(Boolean)
}

function imageField(assetId: string) {
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: assetId,
    },
  }
}

const imageAssetCache = new Map<string, string>()

async function uploadImageFromUrl(url: string, filename: string): Promise<string | null> {
  if (!url) return null
  const cached = imageAssetCache.get(url)
  if (cached) return cached

  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.warn(`Image download failed (${response.status}) for ${url}`)
      return null
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const asset = await client.assets.upload('image', buffer, { filename })
    imageAssetCache.set(url, asset._id)
    return asset._id
  } catch (error) {
    console.warn(`Image upload failed for ${url}:`, error)
    return null
  }
}

async function ensureHeroSlides() {
  const existingSlides: Array<{ order?: number }> = await client.fetch(
    `*[_type == "heroSlide"]{order}`
  )
  const existingOrders = new Set(
    existingSlides
      .map((slide) => slide.order)
      .filter((order): order is number => typeof order === 'number')
  )

  const slidesFr = getHeroSlides('fr')
  const slidesEn = getHeroSlides('en')
  const slidesDe = getHeroSlides('de')

  let created = 0

  for (let i = 0; i < 5; i += 1) {
    const order = i + 1
    if (existingOrders.has(order)) continue

    const fr = slidesFr[i]
    const en = slidesEn[i]
    const de = slidesDe[i]

    if (!fr || !en || !de) continue

    const imageAssetId = await uploadImageFromUrl(fr.img, `hero-slide-${order}.jpg`)

    const doc: any = {
      _id: `heroSlide-seed-${order}`,
      _type: 'heroSlide',
      order,
      isMain: !!fr.isMain,
      label: localize(fr.label || '', en.label || '', de.label || ''),
      title: localize(fr.title, en.title, de.title),
      subtitle: localizeText(fr.sub, en.sub, de.sub),
      description: localizeText(fr.description || '', en.description || '', de.description || ''),
      featuresLabel: localize(
        fr.featuresLabel || '',
        en.featuresLabel || '',
        de.featuresLabel || ''
      ),
      features: {
        fr: fr.features || [],
        en: en.features || [],
        de: de.features || [],
      },
      buttonText: localize(fr.buttonText, en.buttonText, de.buttonText),
      buttonLink: fr.buttonLink,
      secondButtonText: localize(
        fr.secondButtonText || '',
        en.secondButtonText || '',
        de.secondButtonText || ''
      ),
      secondButtonLink: fr.secondButtonLink || '',
    }

    if (imageAssetId) {
      doc.image = imageField(imageAssetId)
    }

    await client.createOrReplace(doc)
    created += 1
  }

  console.log(`heroSlide: created ${created} missing document(s)`)
}

async function ensureProcessSteps() {
  const existingSteps: Array<{ stepNumber?: number }> = await client.fetch(
    `*[_type == "processStep"]{stepNumber}`
  )

  const existingStepNumbers = new Set(
    existingSteps
      .map((step) => step.stepNumber)
      .filter((stepNumber): stepNumber is number => typeof stepNumber === 'number')
  )

  const fallbackSteps: Record<Locale, Array<{ title: string; description: string }>> = {
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
    if (existingStepNumbers.has(stepNumber)) continue

    await client.createOrReplace({
      _id: `processStep-seed-${stepNumber}`,
      _type: 'processStep',
      stepNumber,
      title: localize(
        fallbackSteps.fr[i].title,
        fallbackSteps.en[i].title,
        fallbackSteps.de[i].title
      ),
      description: localize(
        fallbackSteps.fr[i].description,
        fallbackSteps.en[i].description,
        fallbackSteps.de[i].description
      ),
    })

    created += 1
  }

  console.log(`processStep: created ${created} missing document(s)`)
}

async function ensureServicePages() {
  const existing: Array<{ _id: string; pageSlug: string }> = await client.fetch(
    `*[_type == "servicePage"]{_id, pageSlug}`
  )

  const bySlug = new Map(existing.map((doc) => [doc.pageSlug, doc._id]))

  const pageSources = [
    {
      slug: 'villa',
      fr: getVillaPageContent('fr'),
      en: getVillaPageContent('en'),
      de: getVillaPageContent('de'),
    },
    {
      slug: 'gerance',
      fr: getGerancePageContent('fr'),
      en: getGerancePageContent('en'),
      de: getGerancePageContent('de'),
    },
    {
      slug: 'entreprise',
      fr: getEntreprisePageContent('fr'),
      en: getEntreprisePageContent('en'),
      de: getEntreprisePageContent('de'),
    },
    {
      slug: 'communes',
      fr: getCommunesPageContent('fr'),
      en: getCommunesPageContent('en'),
      de: getCommunesPageContent('de'),
    },
  ]

  for (const source of pageSources) {
    const heroImageAssetId = await uploadImageFromUrl(
      source.fr.heroImage,
      `${source.slug}-hero.jpg`
    )

    const serviceItems = await Promise.all(
      source.fr.services.map(async (serviceFr, index) => {
        const serviceEn = source.en.services[index]
        const serviceDe = source.de.services[index]

        const imageAssetId = await uploadImageFromUrl(
          serviceFr.image,
          `${source.slug}-service-${index + 1}.jpg`
        )

        const item: any = {
          _key: `${source.slug}-service-${index + 1}`,
          title: localize(serviceFr.title, serviceEn.title, serviceDe.title),
          description: localizeText(
            serviceFr.description,
            serviceEn.description,
            serviceDe.description
          ),
          features: {
            fr: serviceFr.features || [],
            en: serviceEn.features || [],
            de: serviceDe.features || [],
          },
          note: localize(
            serviceFr.note || '',
            serviceEn.note || '',
            serviceDe.note || ''
          ),
        }

        if (imageAssetId) {
          item.image = imageField(imageAssetId)
        }

        return item
      })
    )

    const doc: any = {
      _id: bySlug.get(source.slug) || `servicePage-${source.slug}`,
      _type: 'servicePage',
      pageSlug: source.slug,
      seo: {
        title: localize(source.fr.seo.title, source.en.seo.title, source.de.seo.title),
        description: localizeText(
          source.fr.seo.description,
          source.en.seo.description,
          source.de.seo.description
        ),
        canonical: source.fr.seo.canonical,
      },
      sectionLabel: localize(
        source.fr.sectionLabel,
        source.en.sectionLabel,
        source.de.sectionLabel
      ),
      title: localize(source.fr.title, source.en.title, source.de.title),
      description: localizeText(
        source.fr.description,
        source.en.description,
        source.de.description
      ),
      buttonText: localize(
        source.fr.buttonText,
        source.en.buttonText,
        source.de.buttonText
      ),
      buttonLink: source.fr.buttonLink,
      backLink: localize(source.fr.backLink, source.en.backLink, source.de.backLink),
      services: serviceItems,
    }

    if (heroImageAssetId) {
      doc.heroImage = imageField(heroImageAssetId)
    }

    await client.createOrReplace(doc)
    console.log(`servicePage: upserted ${source.slug}`)
  }
}

async function ensureAProposPage() {
  const existing = await client.fetch<string | null>(`*[_type == "aProposPage"][0]._id`)

  const fr = readLocale('fr')
  const en = readLocale('en')
  const de = readLocale('de')

  const frTeam = fr?.team_page || {}
  const enTeam = en?.team_page || {}
  const deTeam = de?.team_page || {}

  const companyStats = [
    {
      _key: 'a-propos-stat-1',
      value: '5',
      label: localize(frTeam.stat_experts || 'Experts dedies', enTeam.stat_experts || 'Dedicated experts', deTeam.stat_experts || 'Dedizierte Experten'),
    },
    {
      _key: 'a-propos-stat-2',
      value: '2',
      label: localize(frTeam.stat_cantons || 'Cantons couverts', enTeam.stat_cantons || 'Cantons covered', deTeam.stat_cantons || 'Abgedeckte Kantone'),
    },
    {
      _key: 'a-propos-stat-3',
      value: '6',
      label: localize(frTeam.stat_partners || 'Partenaires institutionnels', enTeam.stat_partners || 'Institutional partners', deTeam.stat_partners || 'Institutionelle Partner'),
    },
    {
      _key: 'a-propos-stat-4',
      value: '100%',
      label: localize(frTeam.stat_approach || 'Neutre & independant', enTeam.stat_approach || 'Neutral & independent', deTeam.stat_approach || 'Neutral & unabhaengig'),
    },
  ]

  await client.createOrReplace({
    _id: existing || 'aProposPage',
    _type: 'aProposPage',
    heroLabel: localize(frTeam.header_label || '', enTeam.header_label || '', deTeam.header_label || ''),
    heroTitle: localize(frTeam.header_title || '', enTeam.header_title || '', deTeam.header_title || ''),
    heroIntro: localizeText(frTeam.intro || '', enTeam.intro || '', deTeam.intro || ''),
    missionTitle: localize(frTeam.mission_title || '', enTeam.mission_title || '', deTeam.mission_title || ''),
    missionText: localizeText(frTeam.mission_text || '', enTeam.mission_text || '', deTeam.mission_text || ''),
    missionText2: localizeText(frTeam.mission_text2 || '', enTeam.mission_text2 || '', deTeam.mission_text2 || ''),
    presenceTitle: localize(frTeam.presence_title || '', enTeam.presence_title || '', deTeam.presence_title || ''),
    presenceText: localizeText(frTeam.presence_text || '', enTeam.presence_text || '', deTeam.presence_text || ''),
    companyStats,
    qualityTitle: localize(frTeam.quality_title || '', enTeam.quality_title || '', deTeam.quality_title || ''),
    qualityText: localizeText(frTeam.quality_text || '', enTeam.quality_text || '', deTeam.quality_text || ''),
    qualitySteps: {
      fr: parseSteps(frTeam.quality_steps),
      en: parseSteps(enTeam.quality_steps),
      de: parseSteps(deTeam.quality_steps),
    } as LocaleStringArray,
    photoTitle: localize(frTeam.photo_title || '', enTeam.photo_title || '', deTeam.photo_title || ''),
    photoSubtitle: localize(
      frTeam.photo_subtitle || '',
      enTeam.photo_subtitle || '',
      deTeam.photo_subtitle || ''
    ),
  })

  console.log('aProposPage: upserted')
}

async function ensureResultatsPage() {
  const existing = await client.fetch<string | null>(`*[_type == "resultatsPage"][0]._id`)

  const fr = readLocale('fr')
  const en = readLocale('en')
  const de = readLocale('de')

  const frResultats = fr?.resultats_page || {}
  const enResultats = en?.resultats_page || {}
  const deResultats = de?.resultats_page || {}

  const impactStats = [
    {
      _key: 'resultats-stat-1',
      value: 150,
      suffix: '+',
      prefix: '',
      label: localize('Audits realises', 'Audits completed', 'Durchgefuehrte Audits'),
    },
    {
      _key: 'resultats-stat-2',
      value: 300,
      suffix: '+',
      prefix: '',
      label: localize('Batiments accompagnes', 'Buildings supported', 'Begleitete Gebaeude'),
    },
    {
      _key: 'resultats-stat-3',
      value: 25,
      suffix: '%',
      prefix: '~ ',
      label: localize('Economies identifiees', 'Identified savings', 'Identifizierte Einsparungen'),
    },
    {
      _key: 'resultats-stat-4',
      value: 15,
      suffix: '+',
      prefix: '',
      label: localize('Partenaires reconnus', 'Recognized partners', 'Anerkannte Partner'),
    },
  ]

  const cases = [
    {
      _key: 'resultats-case-1',
      sector: localize('Regie & Immeuble', 'Real estate & building', 'Verwaltung & Gebaeude'),
      title: localize('Immeuble locatif, 24 logements - Geneve', 'Rental building, 24 units - Geneva', 'Mietshaus, 24 Wohnungen - Genf'),
      mainMetric: 18,
      mainMetricSuffix: '%',
      mainMetricLabel: localize('Economie generee', 'Generated savings', 'Erzielte Einsparung'),
      kpis: [
        {
          _key: 'resultats-case-1-kpi-1',
          value: '650',
          unit: 'MJ/m2a',
          label: localize('Conso. Initiale (IDC)', 'Initial consumption (IDC)', 'Anfangsverbrauch (IDC)'),
        },
        {
          _key: 'resultats-case-1-kpi-2',
          value: '12',
          unit: 'mois',
          label: localize('Retour sur investissement', 'Payback period', 'Amortisationsdauer'),
        },
      ],
      beforeItems: {
        fr: [
          'Chaufferie vetuste',
          'Pompes mal reglees',
          'Plaintes recurrentes de locataires pour inconfort estival et surchauffe',
        ],
        en: [
          'Outdated boiler room',
          'Poorly adjusted pumps',
          'Recurring tenant complaints about summer discomfort and overheating',
        ],
        de: [
          'Veraltete Heizzentrale',
          'Schlecht eingestellte Pumpen',
          'Wiederkehrende Mieterbeschwerden ueber Sommerkomfort und Ueberhitzung',
        ],
      },
      afterItems: {
        fr: ['Audit IDC', 'Mise en place de la GED', 'Equilibrage hydraulique et optimisation ciblee'],
        en: ['IDC audit', 'Delegated energy management setup', 'Hydraulic balancing and targeted optimization'],
        de: ['IDC-Audit', 'Einrichtung des delegierten Energiemanagements', 'Hydraulischer Abgleich und gezielte Optimierung'],
      },
    },
    {
      _key: 'resultats-case-2',
      sector: localize('Villa individuelle', 'Single-family house', 'Einfamilienhaus'),
      title: localize('Maison familiale - La Cote (VD)', 'Family house - La Cote (VD)', 'Familienhaus - La Cote (VD)'),
      mainMetric: 65,
      mainMetricSuffix: '%',
      mainMetricLabel: localize("Frais d'etude couverts", 'Study costs covered', 'Studienkosten gedeckt'),
      kpis: [
        {
          _key: 'resultats-case-2-kpi-1',
          value: '100',
          unit: '%',
          label: localize('Plafond de Subvention', 'Subsidy cap', 'Subventionsobergrenze'),
        },
        {
          _key: 'resultats-case-2-kpi-2',
          value: '30',
          unit: 'jours',
          label: localize("Delai d'approbation", 'Approval timeline', 'Genehmigungsfrist'),
        },
      ],
      beforeItems: {
        fr: [
          'Chauffage au mazout tres couteux',
          'Fortes deperditions en toiture',
          "Sensation d'inconfort face aux courants d'air",
        ],
        en: [
          'Very costly oil heating',
          'High roof heat losses',
          'Discomfort due to air drafts',
        ],
        de: [
          'Sehr kostspielige Oelheizung',
          'Hohe Waermeverluste ueber das Dach',
          'Unbehagen durch Zugluft',
        ],
      },
      afterItems: {
        fr: ['Edition integrale CECB+', 'Conception de scenarios chiffres', "Montage complet du dossier d'aides"],
        en: ['Full CECB+ preparation', 'Design of quantified scenarios', 'Complete subsidy file support'],
        de: ['Vollstaendige CECB+-Erstellung', 'Ausarbeitung quantifizierter Szenarien', 'Komplette Begleitung des Foerderdossiers'],
      },
    },
    {
      _key: 'resultats-case-3',
      sector: localize('Entreprise & PME', 'Business & SME', 'Unternehmen & KMU'),
      title: localize('Site de production industriel - Lausanne', 'Industrial production site - Lausanne', 'Industrieller Produktionsstandort - Lausanne'),
      mainMetric: 22,
      mainMetricSuffix: '%',
      mainMetricLabel: localize('Economies annuelles', 'Annual savings', 'Jaehrliche Einsparungen'),
      kpis: [
        {
          _key: 'resultats-case-3-kpi-1',
          value: '200',
          unit: 'k kWh/an',
          label: localize('Consommation de base', 'Baseline consumption', 'Basisverbrauch'),
        },
        {
          _key: 'resultats-case-3-kpi-2',
          value: '70',
          unit: '%',
          label: localize('Taux subventionnable', 'Subsidizable rate', 'Foerderfaehiger Anteil'),
        },
      ],
      beforeItems: {
        fr: [
          "Pertes massives sur les reseaux d'air comprime",
          'Groupes de froid mal regules',
          'Risques de non-conformite cantonale',
        ],
        en: [
          'Major losses on compressed-air networks',
          'Poorly regulated cooling units',
          'Risk of cantonal non-compliance',
        ],
        de: [
          'Grosse Verluste in Druckluftnetzen',
          'Schlecht geregelte Kaelteaggregate',
          'Risiko kantonaler Nichtkonformitaet',
        ],
      },
      afterItems: {
        fr: ['Audit PEIK complet', "Integration d'une recuperation de chaleur", "Plan d'action subventionne"],
        en: ['Full PEIK audit', 'Heat-recovery integration', 'Subsidized action plan'],
        de: ['Vollstaendiges PEIK-Audit', 'Integration einer Waermerueckgewinnung', 'Subventionierter Aktionsplan'],
      },
    },
  ]

  await client.createOrReplace({
    _id: existing || 'resultatsPage',
    _type: 'resultatsPage',
    seo: {
      title: localize(
        frResultats.seo_title || 'Resultats & Impact | Swiss Ecogestes',
        enResultats.seo_title || 'Results & Impact | Swiss Ecogestes',
        deResultats.seo_title || 'Ergebnisse & Impact | Swiss Ecogestes'
      ),
      description: localizeText(
        frResultats.seo_desc || '',
        enResultats.seo_desc || '',
        deResultats.seo_desc || ''
      ),
    },
    heroTitle: localize(
      frResultats.hero_title || 'Un impact reel, mesurable et documente',
      enResultats.hero_title || 'Real, measurable, documented impact',
      deResultats.hero_title || 'Ein realer, messbarer und dokumentierter Impact'
    ),
    heroSubtitle: localizeText(
      frResultats.hero_subtitle || '',
      enResultats.hero_subtitle || '',
      deResultats.hero_subtitle || ''
    ),
    impactStats,
    cases,
  })

  console.log('resultatsPage: upserted')
}

async function summarizePublishedCounts() {
  const counts = await client.fetch(`{
    "heroSlidePublished": count(*[_type == "heroSlide" && !(_id in path("drafts.**"))]),
    "processStepPublished": count(*[_type == "processStep" && !(_id in path("drafts.**"))]),
    "servicePagePublished": count(*[_type == "servicePage" && !(_id in path("drafts.**"))]),
    "aProposPagePublished": count(*[_type == "aProposPage" && !(_id in path("drafts.**"))]),
    "resultatsPagePublished": count(*[_type == "resultatsPage" && !(_id in path("drafts.**"))])
  }`)

  console.log('Published counts:', counts)
}

async function main() {
  console.log('Seeding missing Sanity content...')
  await ensureHeroSlides()
  await ensureProcessSteps()
  await ensureServicePages()
  await ensureAProposPage()
  await ensureResultatsPage()
  await summarizePublishedCounts()
  console.log('Done.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
