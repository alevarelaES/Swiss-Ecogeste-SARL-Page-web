/**
 * Script de seed pour :
 * - Le slide Hero principal (isMain: true) manquant dans Sanity
 * - Les 6 partenaires
 *
 * Usage :  cd studio && npx sanity exec scripts/seed-missing-data.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })

// ─────────────────────────────────────────────
// HERO SLIDE PRINCIPAL (le 1er slide, isMain)
// ─────────────────────────────────────────────
async function seedMainHeroSlide() {
  const existing = await client.fetch(
    `*[_type == "heroSlide" && isMain == true][0]._id`
  )
  if (existing) {
    console.log('heroSlide (main): deja present, skip')
    return
  }

  await client.create({
    _type: 'heroSlide',
    isMain: true,
    order: 1,
    label: {
      fr: 'Swiss Ecogeste',
      en: 'Swiss Ecogeste',
      de: 'Swiss Ecogeste',
    },
    title: {
      fr: 'Réduisez vos coûts énergétiques et passez aux bonnes actions.',
      en: 'Reduce your energy costs and take the right actions.',
      de: 'Senken Sie Ihre Energiekosten und ergreifen Sie die richtigen Maßnahmen.',
    },
    subtitle: {
      fr: 'Audits, stratégie énergétique et accompagnement pour régies, entreprises, propriétaires et collectivités en Suisse romande.',
      en: 'Energy audits, strategy and support for property managers, businesses, owners and municipalities in French-speaking Switzerland.',
      de: 'Energieaudits, Strategie und Begleitung für Immobilienverwaltungen, Unternehmen, Eigentümer und Gemeinden in der Westschweiz.',
    },
    description: {
      fr: 'Identifiez rapidement vos économies potentielles, les aides disponibles et les actions prioritaires pour améliorer durablement la performance de vos installations et bâtiments.',
      en: 'Quickly identify your savings potential, available subsidies and priority actions to sustainably improve the performance of your installations and buildings.',
      de: 'Identifizieren Sie schnell Ihre Einsparpotenziale, verfügbaren Fördergelder und Prioritätsmaßnahmen zur dauerhaften Verbesserung Ihrer Anlagen und Gebäude.',
    },
    featuresLabel: {
      fr: 'Une approche concrète, neutre et orientée résultats.',
      en: 'A concrete, neutral and results-oriented approach.',
      de: 'Ein konkreter, neutraler und ergebnisorientierter Ansatz.',
    },
    features: {
      fr: ['Recommandations indépendantes', 'Solutions adaptées', 'Aides et subventions', 'Expertise terrain'],
      en: ['Independent recommendations', 'Tailored solutions', 'Grants & subsidies', 'Field expertise'],
      de: ['Unabhängige Empfehlungen', 'Maßgeschneiderte Lösungen', 'Fördergelder & Subventionen', 'Felderfahrung'],
    },
    buttonText: {
      fr: 'Découvrir nos solutions',
      en: 'Discover our solutions',
      de: 'Unsere Lösungen entdecken',
    },
    buttonLink: '#nos-solutions',
    secondButtonText: {
      fr: 'Estimer mes économies',
      en: 'Estimate my savings',
      de: 'Meine Einsparungen schätzen',
    },
    secondButtonLink: '/contact',
  })

  console.log('heroSlide (main): cree avec succes')
}

// ─────────────────────────────────────────────
// PARTENAIRES
// ─────────────────────────────────────────────
async function seedPartners() {
  const existing = await client.fetch(
    `count(*[_type == "partner"])`
  )
  if (existing > 0) {
    console.log(`partner: ${existing} deja presents, skip`)
    return
  }

  const partners = [
    { name: 'Canton de Vaud',        url: 'https://www.vd.ch',                       order: 1 },
    { name: 'Canton de Genève',      url: 'https://www.ge.ch',                       order: 2 },
    { name: 'SIG Éco21',             url: 'https://eco21.ch',                        order: 3 },
    { name: 'Suisse Énergie',        url: 'https://www.suisseenergie.ch',            order: 4 },
    { name: 'Chauffez Renouvelable', url: 'https://www.chauffez-renouvelable.ch',    order: 5 },
    { name: 'OCEN',                  url: 'https://www.ge.ch/energie',               order: 6 },
  ]

  for (const p of partners) {
    await client.create({
      _type: 'partner',
      name: p.name,
      url: p.url,
      order: p.order,
    })
  }

  console.log(`partner: ${partners.length} crees (logos a uploader manuellement dans Sanity)`)
}

// ─────────────────────────────────────────────
// SETTINGS DE BASE (footer)
// ─────────────────────────────────────────────
async function seedSettings() {
  const existing = await client.fetch(`*[_type == "settings"][0]._id`)
  if (existing) {
    console.log('settings: deja present, skip (editez-le manuellement dans Sanity)')
    return
  }

  await client.createOrReplace({
    _id: 'settings',
    _type: 'settings',
    siteName: 'Swiss Ecogestes',
    siteDescription: 'Votre partenaire expert pour la transition énergétique en Suisse Romande.',
    phone: '',
    email: 'info@swissecogestes.ch',
    address: 'Vaud & Genève',
    socialMedia: {
      linkedin: 'https://www.linkedin.com',
      instagram: 'https://www.instagram.com',
    },
  })

  console.log('settings: cree avec les donnees de base')
}

async function main() {
  console.log('=== Seed des donnees manquantes ===')
  await seedMainHeroSlide()
  await seedPartners()
  await seedSettings()
  console.log('=== Termine ===')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
