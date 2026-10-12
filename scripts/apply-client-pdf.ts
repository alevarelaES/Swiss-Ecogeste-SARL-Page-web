/**
 * Applique dans Sanity les demandes du client (PDF « Texte_Site ») :
 * - liens « programme » des pages services (cartes + fenêtre de détail) ;
 * - liste des prestations sur les cartes « Nos solutions » de l'accueil.
 *
 * Usage :
 *   npx tsx scripts/apply-client-pdf.ts                                    # aperçu, n'écrit rien
 *   SANITY_WRITE_TOKEN=sk... npx tsx scripts/apply-client-pdf.ts --apply   # applique
 *
 * Les services sont retrouvés par leur titre français, les cartes de l'accueil par leur lien. Le script est idempotent :
 * le relancer réécrit les mêmes valeurs.
 */

import 'dotenv/config'
import { createClient } from '@sanity/client'
import { SERVICE_LINK_RULES as RULES } from '../src/app/data/serviceLinks'

const dataset = process.env.VITE_SANITY_DATASET || 'dev'
const apply = process.argv.includes('--apply')

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'btjdqrld',
  dataset,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const HIGHLIGHTS: Record<string, { fr: string[]; en: string[]; de: string[] }> = {
  '/services/gerance': {
    fr: ["GED – Gestionnaire énergie délégué", "Écologement (subventionné)", "Audit chauffage (gratuit)", "Calcul IDC", "Accompagnement AMU", "Audit sur mesure"],
    en: ["DEM – Delegated energy manager", "Écologement (subsidised)", "Heating audit (free)", "IDC calculation", "AMU user support", "Custom audit"],
    de: ["DEV – Delegierter Energieverwalter", "Écologement (subventioniert)", "Heizungsaudit (kostenlos)", "IDC-Berechnung", "AMU-Nutzerbegleitung", "Massgeschneidertes Audit"],
  },
  '/services/entreprise': {
    fr: ["Visite conseil SIG (gratuite)", "Visite expertise SIG", "Audit chauffage (gratuit)", "Audit PEIK", "Calcul IDC", "Audit sur mesure"],
    en: ["SIG advisory visit (free)", "SIG expert visit", "Heating audit (free)", "PEIK audit", "IDC calculation", "Custom audit"],
    de: ["SIG-Beratungsbesuch (kostenlos)", "SIG-Expertenbesuch", "Heizungsaudit (kostenlos)", "PEIK-Audit", "IDC-Berechnung", "Massgeschneidertes Audit"],
  },
  '/services/villa': {
    fr: ["Visite villa SIG", "Audit chaudière (gratuit)", "Audit CECB & CECB+", "Calcul IDC", "Autres audits sur mesure"],
    en: ["SIG villa visit", "Boiler audit (free)", "CECB & CECB+ audit", "IDC calculation", "Other custom audits"],
    de: ["SIG-Villenbesuch", "Heizkesselaudit (kostenlos)", "GEAK- & GEAK-Plus-Audit", "IDC-Berechnung", "Weitere massgeschneiderte Audits"],
  },
  '/services/communes': {
    fr: ["Audit général & plan d'action", "Mesures d'économie concrètes", "Bâtiments communaux", "Villas et maisons", "Entreprises locales"],
    en: ["General audit & action plan", "Concrete saving measures", "Municipal buildings", "Villas and houses", "Local businesses"],
    de: ["Gesamtaudit & Aktionsplan", "Konkrete Sparmassnahmen", "Gemeindegebäude", "Villen und Häuser", "Lokale Unternehmen"],
  },
}

async function main() {
  if (apply && !process.env.SANITY_WRITE_TOKEN) {
    throw new Error('SANITY_WRITE_TOKEN manquant (jeton "Editor" créé sur https://www.sanity.io/manage)')
  }

  const pages: { _id: string; pageSlug: string; services?: any[] }[] = await client.fetch(
    `*[_type == "servicePage"]{ _id, pageSlug, services }`
  )

  const tx = client.transaction()
  let changes = 0

  for (const page of pages) {
    const rules = RULES[page.pageSlug] || []
    for (const service of page.services || []) {
      const title: string = service.title?.fr || ''
      const rule = rules.find((r) => r.match.test(title))
      if (!rule) continue

      const path = `services[_key=="${service._key}"]`
      const set: Record<string, unknown> = {}
      const unset: string[] = []
      if (rule.link) set[`${path}.link`] = rule.link
      if (rule.featureLinks) set[`${path}.featureLinks`] = rule.featureLinks
      if (rule.featureLink) {
        const features: string[] = service.features?.fr || []
        const index = features.findIndex((f) => rule.featureLink!.match.test(f))
        if (index >= 0) {
          set[`${path}.featureLinks`] = features.map((_, i) => (i === index ? rule.featureLink!.href : ''))
          console.log(`${page.pageSlug.padEnd(11)} ${title}`)
          console.log(`            « ${features[index]} » → ${rule.featureLink.href}`)
        }
      }
      // Une URL avait été saisie dans le champ « note » faute de champ dédié : on la retire
      if (/^https?:\/\//.test(service.note?.fr || '')) unset.push(`${path}.note`)

      if (rule.link || rule.featureLinks) console.log(`${page.pageSlug.padEnd(11)} ${title}`)
      if (rule.link) console.log(`            lien   → ${rule.link}`)
      if (rule.featureLinks) console.log(`            points → ${rule.featureLinks.length ? rule.featureLinks.join(', ') : '(liens supprimés)'}`)
      if (unset.length) console.log(`            note   → supprimée (contenait une URL)`)

      let patch = client.patch(page._id).set(set)
      if (unset.length) patch = patch.unset(unset)
      tx.patch(patch)
      changes++
    }
  }

  const clientTypes: { _id: string; link?: string; title?: { fr?: string } }[] = await client.fetch(
    `*[_type == "clientType"]{ _id, link, title }`
  )
  for (const card of clientTypes) {
    const highlights = card.link ? HIGHLIGHTS[card.link] : undefined
    if (!highlights) continue
    console.log(`accueil     ${card.title?.fr}`)
    console.log(`            prestations → ${highlights.fr.join(' · ')}`)
    tx.patch(client.patch(card._id).set({ highlights }))
    changes++
  }

  if (!apply) {
    console.log(`\n${changes} éléments à modifier dans le dataset "${dataset}". Relancer avec --apply pour écrire.`)
    return
  }
  await tx.commit()
  console.log(`\n✓ ${changes} éléments mis à jour dans le dataset "${dataset}".`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
