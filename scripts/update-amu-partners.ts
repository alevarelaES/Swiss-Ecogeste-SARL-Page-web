/**
 * Demandes du client (octobre 2026), à appliquer dans Sanity :
 * - « AMU » renommé « Assistance à maîtrise d’usage (AMU) » (titre du service sur la page régies
 *   et prestation de la carte « Régies & Immeubles » de l'accueil, en fr / en / de) ;
 * - nouveaux partenaires du carrousel : SIL (Services industriels de Lausanne) et Equiwatt.
 *   Les logos sont lus dans public/partners/ (fichier dont le nom contient « sil » ou « lausanne »,
 *   et « equiwatt »).
 *
 * Usage :
 *   npx tsx scripts/update-amu-partners.ts           # aperçu, n'écrit rien
 *   SANITY_WRITE_TOKEN=sk... npx tsx scripts/update-amu-partners.ts --apply
 */

import 'dotenv/config'
import { createReadStream, readdirSync } from 'node:fs'
import { join } from 'node:path'
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

const AMU = {
  fr: 'Assistance à maîtrise d’usage (AMU)',
  en: 'Building use management assistance (AMU)',
  de: 'Nutzungsbegleitung (AMU)',
}

const PARTNERS_DIR = join(process.cwd(), 'public', 'partners')

const NEW_PARTNERS = [
  {
    _id: 'partner-sil',
    name: 'SIL',
    url: 'https://www.lausanne.ch/vie-pratique/energies-et-eau/services-industriels',
    order: 6,
    logoFile: (f: string) => !/equiwatt/i.test(f) && /(^|[^a-z])sil([^a-z]|$)|lausanne/i.test(f),
  },
  {
    _id: 'partner-equiwatt',
    name: 'Equiwatt',
    url: 'https://www.equiwatt-lausanne.ch',
    order: 7,
    logoFile: (f: string) => /equiwatt/i.test(f),
  },
]

const isAmu = (text: unknown) => typeof text === 'string' && /\bAMU\b/.test(text)

async function main() {
  if (apply && !process.env.SANITY_WRITE_TOKEN) {
    throw new Error('SANITY_WRITE_TOKEN manquant (jeton "Editor" créé sur https://www.sanity.io/manage)')
  }

  const tx = client.transaction()
  let changes = 0

  // 1. Titre du service AMU (page régies)
  const page = await client.fetch(`*[_type == "servicePage" && pageSlug == "gerance"][0]{ _id, services[]{ _key, title } }`)
  for (const service of page?.services ?? []) {
    if (!isAmu(service.title?.fr)) continue
    for (const lang of ['fr', 'en', 'de'] as const) {
      if (service.title?.[lang] === AMU[lang]) continue
      console.log(`Service régies · ${lang} : ${service.title?.[lang] ?? '(vide)'} → ${AMU[lang]}`)
      tx.patch(client.patch(page._id).set({ [`services[_key=="${service._key}"].title.${lang}`]: AMU[lang] }))
      changes++
    }
  }

  // 2. Prestation AMU des cartes de l'accueil
  const cards: { _id: string; highlights?: Record<string, string[]> }[] = await client.fetch(
    `*[_type == "clientType" && defined(highlights)]{ _id, highlights }`
  )
  for (const card of cards) {
    for (const lang of ['fr', 'en', 'de'] as const) {
      const list = card.highlights?.[lang]
      if (!list?.some(isAmu)) continue
      const next = list.map((item) => (isAmu(item) ? AMU[lang] : item))
      if (JSON.stringify(next) === JSON.stringify(list)) continue
      console.log(`Carte ${card._id} · ${lang} : ${list.filter(isAmu).join(', ')} → ${AMU[lang]}`)
      tx.patch(client.patch(card._id).set({ [`highlights.${lang}`]: next }))
      changes++
    }
  }

  // 3. Partenaires SIL et Equiwatt
  const files = readdirSync(PARTNERS_DIR)
  for (const partner of NEW_PARTNERS) {
    const existing = await client.fetch(`*[_id == $id][0]{ name, url, order, "logo": logo.asset._ref }`, { id: partner._id })
    const file = files.find(partner.logoFile)
    if (!existing?.logo && !file) {
      console.log(`⚠ ${partner.name} : aucun logo trouvé dans public/partners/`)
      continue
    }
    if (existing?.logo && existing.name === partner.name && existing.url === partner.url) continue

    console.log(`Partenaire ${partner.name} (${partner.url})${file && !existing?.logo ? ` · logo ${file}` : ''}`)
    changes++
    if (!apply) continue

    let logo = existing?.logo ? { _type: 'image', asset: { _type: 'reference', _ref: existing.logo } } : undefined
    if (!logo && file) {
      const asset = await client.assets.upload('image', createReadStream(join(PARTNERS_DIR, file)), { filename: file })
      logo = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
    }
    tx.createOrReplace({
      _id: partner._id,
      _type: 'partner',
      name: partner.name,
      url: partner.url,
      order: existing?.order ?? partner.order,
      logo,
    })
  }

  if (!apply) {
    console.log(`\n${changes} modifications à faire dans le dataset "${dataset}". Relancer avec --apply pour écrire.`)
    return
  }
  if (changes) await tx.commit()
  console.log(`\n✓ ${changes} modifications enregistrées dans le dataset "${dataset}".`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
