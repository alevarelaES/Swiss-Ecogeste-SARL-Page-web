/**
 * Corrections de contenu issues de l'audit SEO (octobre 2026), à appliquer dans Sanity :
 * - titres SEO des pages services raccourcis (Google coupe vers 60 caractères) ;
 * - diapos du carrousel en allemand : dialecte suisse-allemand remplacé par de l'allemand standard ;
 * - « GIS visit » corrigé en « SIG visit » (anglais) ;
 * - description SEO trop courte de la politique de confidentialité (anglais).
 *
 * Usage :
 *   npx tsx scripts/fix-seo-content.ts           # aperçu (avant → après), n'écrit rien
 *   SANITY_WRITE_TOKEN=sk... npx tsx scripts/fix-seo-content.ts --apply
 */

import 'dotenv/config'
import { createClient } from '@sanity/client'

const dataset = process.env.VITE_SANITY_DATASET || 'dev'
const apply = process.argv.includes('--apply')

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'btjdqrld',
  dataset,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

type Fix = { query: string; params?: Record<string, unknown>; set: Record<string, string> }

const FIXES: Fix[] = [
  // Titres SEO des pages services (le site ajoute « | Swiss Ecogestes » aux titres courts)
  {
    query: '*[_type == "servicePage" && pageSlug == "villa"][0]',
    set: {
      'seo.title.fr': 'Villas & maisons : visite SIG, CECB, IDC',
      'seo.title.en': 'Villas & homes: SIG visit, CECB, IDC',
      'seo.title.de': 'Villen & Häuser: SIG-Besuch, GEAK, IDC',
    },
  },
  {
    query: '*[_type == "servicePage" && pageSlug == "gerance"][0]',
    set: {
      'seo.title.fr': 'Régies & immeubles : GED, IDC, audits',
      'seo.title.en': 'Property managers: GED, IDC, audits',
      'seo.title.de': 'Verwaltungen & Gebäude: GED, IDC, Audits',
    },
  },
  {
    query: '*[_type == "servicePage" && pageSlug == "entreprise"][0]',
    set: {
      'seo.title.fr': 'Entreprises : visite SIG, PEIK, audits',
      'seo.title.en': 'Businesses: SIG visit, PEIK, audits',
      'seo.title.de': 'Unternehmen: SIG-Besuch, PEIK, Audits',
    },
  },
  {
    query: '*[_type == "servicePage" && pageSlug == "communes"][0]',
    set: {
      'seo.title.fr': 'Communes & GRD : stratégie énergétique',
      'seo.title.en': 'Municipalities: energy strategy',
      'seo.title.de': 'Gemeinden & VNB: Energiestrategie',
    },
  },
  // Carrousel de l'accueil, allemand standard (orthographe suisse : « ss »)
  {
    query: '*[_type == "heroSlide" && order == 1][0]',
    set: {
      'title.de': 'Senken Sie Ihre Energiekosten und werten Sie Ihr Immobilienvermögen auf',
      'subtitle.de':
        'Audits, Energiestrategie und Begleitung. Ermitteln Sie Ihr Einsparpotenzial, verfügbare Fördermittel und vorrangige Massnahmen, um die Leistung Ihrer Anlagen und Gebäude nachhaltig zu verbessern.',
    },
  },
  {
    query: '*[_type == "heroSlide" && order == 4][0]',
    set: {
      'subtitle.de':
        'Machen Sie Ihr Gebäude zu einem effizienten und rentablen Objekt – mit umfassenden Audits, individuell abgestimmten Lösungen und attraktiven Förderbeiträgen.',
    },
  },
  {
    query: '*[_type == "heroSlide" && order == 5][0]',
    set: {
      'subtitle.de':
        'Steuern Sie Ihre territoriale Energiestrategie effizient – mit strukturierter Begleitung und messbaren Resultaten.',
    },
  },
  // Description SEO trop courte (48 caractères)
  {
    query: '*[_type == "legalPage" && pageType == "confidentialite"][0]',
    set: {
      'seo.description.en':
        'How Swiss Ecogestes collects, uses and protects your personal data, and how to exercise your rights under Swiss data protection law.',
    },
  },
]

const get = (doc: any, path: string) => path.split('.').reduce((v, k) => v?.[k], doc)

async function main() {
  if (apply && !process.env.SANITY_WRITE_TOKEN) {
    throw new Error('SANITY_WRITE_TOKEN manquant (jeton "Editor" créé sur https://www.sanity.io/manage)')
  }

  const tx = client.transaction()
  let changes = 0

  for (const fix of FIXES) {
    const doc = await client.fetch(fix.query, fix.params || {})
    if (!doc?._id) {
      console.log(`⚠ introuvable : ${fix.query}`)
      continue
    }
    const set: Record<string, string> = {}
    for (const [path, value] of Object.entries(fix.set)) {
      const before = get(doc, path)
      if (before === value) continue
      set[path] = value
      console.log(`${doc._type} ${doc.pageSlug || doc.pageType || doc.order || ''} · ${path}`)
      console.log(`    avant : ${before ?? '(vide)'}`)
      console.log(`    après : ${value}`)
    }
    if (Object.keys(set).length) {
      tx.patch(client.patch(doc._id).set(set))
      changes += Object.keys(set).length
    }
  }

  if (!apply) {
    console.log(`\n${changes} champs à modifier dans le dataset "${dataset}". Relancer avec --apply pour écrire.`)
    return
  }
  if (changes) await tx.commit()
  console.log(`\n✓ ${changes} champs mis à jour dans le dataset "${dataset}".`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
