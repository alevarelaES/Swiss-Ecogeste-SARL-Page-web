/**
 * Ajoute dans Sanity les liens demandés par le client (PDF « Texte_Site ») sur les pages services.
 *
 * Usage :
 *   npx tsx scripts/add-service-links.ts                                    # aperçu, n'écrit rien
 *   SANITY_WRITE_TOKEN=sk... npx tsx scripts/add-service-links.ts --apply   # applique
 *
 * Les services sont retrouvés par leur titre français. Le script est idempotent :
 * le relancer réécrit les mêmes valeurs.
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

const LINKS = {
  ecologement:
    'https://www.vd.ch/environnement/energie/subventions-des-energies-renouvelables-et-des-economies-denergie-pour-proprietaires-communes-et-entreprises/subvention-eco-logement',
  chauffezRenouvelable: 'https://www.suisseenergie.ch/renover/conseil-incitatif-chauffezrenouvelable/',
  idc: 'https://www.ge.ch/connaitre-consommation-energie-batiment-idc',
  // Le lien du PDF (ge.ch/assistance-maitrise-dusage) renvoie une erreur 404 ;
  // cette page de l'État de Genève présente l'AMU subventionné.
  amu: 'https://www.ge.ch/baisser-consommation-energetique-batiment',
  amo: 'https://ww2.sig-ge.ch/immobilier/optimisation-energetique-et-environnementale/eco21-immobilier/renovation-batiments',
  visiteConseil:
    'https://ww2.sig-ge.ch/entreprises/optimisation-energetique-et-environnementale/eco21-entreprises/accompagnement-SIG-eco21',
  visiteExpertise:
    'https://ww2.sig-ge.ch/artisans_independants/optimisation-energetique-et-environnementale/eco21-professionnels/visite_expertise',
  peik: 'https://www.suisseenergie.ch/entreprises/se-faire-conseiller/peik/',
  visiteVilla:
    'https://ww2.sig-ge.ch/particuliers/demarches-et-factures/solutions-proprietaires-villas/diagnostic-energetique-environnemental',
}

type Rule = { match: RegExp; link?: string; featureLinks?: string[] }

const RULES: Record<string, Rule[]> = {
  gerance: [
    { match: /écologement/i, link: LINKS.ecologement },
    { match: /audit chauffage/i, link: LINKS.chauffezRenouvelable },
    { match: /calcul idc/i, link: LINKS.idc },
    { match: /\bAMU\b/, link: LINKS.amu },
    { match: /\bAMO\b|maîtrise d.ouvrage/i, link: LINKS.amo },
  ],
  entreprise: [
    { match: /visite conseil/i, link: LINKS.visiteConseil },
    { match: /visite expertise/i, link: LINKS.visiteExpertise },
    { match: /PEIK/, link: LINKS.peik },
    { match: /audit chauffage/i, link: LINKS.chauffezRenouvelable },
    { match: /calcul idc/i, link: LINKS.idc },
  ],
  villa: [
    { match: /visite villa/i, link: LINKS.visiteVilla },
    { match: /audit chauffage/i, link: LINKS.chauffezRenouvelable },
    { match: /calcul idc/i, link: LINKS.idc },
    { match: /\bAMO\b|maîtrise d.ouvrage/i, link: LINKS.amo },
  ],
  communes: [
    {
      // Bâtiments communaux, Immeubles et régies, Villas et maisons, Entreprises locales
      match: /mesures concr[èe]tes/i,
      featureLinks: ['/services/gerance', '/services/gerance', '/services/villa', '/services/entreprise'],
    },
  ],
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
      // Une URL avait été saisie dans le champ « note » faute de champ dédié : on la retire
      if (/^https?:\/\//.test(service.note?.fr || '')) unset.push(`${path}.note`)

      console.log(`${page.pageSlug.padEnd(11)} ${title}`)
      if (rule.link) console.log(`            lien   → ${rule.link}`)
      if (rule.featureLinks) console.log(`            points → ${rule.featureLinks.join(', ')}`)
      if (unset.length) console.log(`            note   → supprimée (contenait une URL)`)

      let patch = client.patch(page._id).set(set)
      if (unset.length) patch = patch.unset(unset)
      tx.patch(patch)
      changes++
    }
  }

  if (!apply) {
    console.log(`\n${changes} services à modifier dans le dataset "${dataset}". Relancer avec --apply pour écrire.`)
    return
  }
  await tx.commit()
  console.log(`\n✓ ${changes} services mis à jour dans le dataset "${dataset}".`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
