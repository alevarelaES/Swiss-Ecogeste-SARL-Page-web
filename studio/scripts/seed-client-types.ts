/**
 * Met à jour les 4 clientType dans Sanity :
 * - Ordre : Régies(1), Entreprises(2), Villas(3), Communes(4)
 * - Images uploadées depuis Unsplash
 * - Titre, sous-titre, description en FR/EN/DE
 *
 * Usage : cd studio && npx sanity exec scripts/seed-client-types.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })
const imageCache = new Map<string, string>()

async function uploadFromUrl(url: string, filename: string): Promise<string> {
  if (imageCache.has(url)) return imageCache.get(url)!
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Fetch failed: ${url}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: response.headers.get('content-type') || 'image/jpeg',
  })
  imageCache.set(url, asset._id)
  console.log(`  ↑ ${filename}`)
  return asset._id
}

function imgRef(id: string) {
  return { _type: 'image' as const, asset: { _type: 'reference' as const, _ref: id } }
}

function loc(fr: string, en: string, de: string) { return { fr, en, de } }

const data = [
  {
    _id: 'clientType-regies',
    order: 1,
    slug: 'regies',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    imageName: 'clienttype-regies.jpg',
    title: loc('Régies & Immeubles', 'Real Estate & Buildings', 'Immobilien & Liegenschaften'),
    subtitle: loc('Gestionnaires', 'Managers', 'Verwalter'),
    description: loc(
      "Valorisez votre parc et anticipez les obligations légales.",
      "Enhance your property portfolio and anticipate legal obligations.",
      "Werten Sie Ihr Immobilienportfolio auf und antizipieren Sie gesetzliche Anforderungen."
    ),
    link: '/services/gerance',
  },
  {
    _id: 'clientType-entreprises',
    order: 2,
    slug: 'entreprises',
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800',
    imageName: 'clienttype-entreprises.jpg',
    title: loc('Entreprises & PME', 'Businesses & SMEs', 'Unternehmen & KMU'),
    subtitle: loc('Professionnels', 'Professionals', 'Profis'),
    description: loc(
      "Optimisez votre consommation et réduisez vos coûts d'exploitation avec nos audits (PEIK).",
      "Optimize your consumption and reduce operating costs with our audits (PEIK).",
      "Optimieren Sie Ihren Verbrauch und senken Sie Betriebskosten mit unseren Audits (PEIK)."
    ),
    link: '/services/entreprise',
  },
  {
    _id: 'clientType-villas',
    order: 3,
    slug: 'villas',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    imageName: 'clienttype-villas.jpg',
    title: loc('Propriétaires de Villas', 'Villa Owners', 'Villenbesitzer'),
    subtitle: loc('Particuliers', 'Individuals', 'Privatpersonen'),
    description: loc(
      "Rénovez votre bien et profitez des subventions cantonales pour améliorer l'efficacité énergétique de votre maison.",
      "Renovate your property and benefit from cantonal subsidies to improve your home's energy efficiency.",
      "Renovieren Sie Ihre Immobilie und profitieren Sie von kantonalen Fördermitteln zur Verbesserung der Energieeffizienz."
    ),
    link: '/services/villa',
  },
  {
    _id: 'clientType-communes',
    order: 4,
    slug: 'communes',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800',
    imageName: 'clienttype-communes.jpg',
    title: loc('Communes & GRD', 'Municipalities & DSOs', 'Gemeinden & VNB'),
    subtitle: loc('Collectivités', 'Collectivities', 'Öffentlicher Sektor'),
    description: loc(
      "Accompagnez vos citoyens et atteignez vos objectifs climatiques avec nos programmes de transition énergétique.",
      "Support your citizens and achieve your climate goals with our energy transition programmes.",
      "Unterstützen Sie Ihre Bürger und erreichen Sie Ihre Klimaziele mit unseren Energiewendeprogrammen."
    ),
    link: '/services/communes',
  },
]

async function main() {
  console.log('=== Seed clientTypes ===')
  for (const ct of data) {
    const assetId = await uploadFromUrl(ct.imageUrl, ct.imageName)
    await client.createOrReplace({
      _id: ct._id,
      _type: 'clientType',
      slug: ct.slug,
      order: ct.order,
      title: ct.title,
      subtitle: ct.subtitle,
      description: ct.description,
      link: ct.link,
      image: imgRef(assetId),
    })
    console.log(`  ✓ ${ct._id} (order ${ct.order})`)
  }
  console.log('\n✅ Terminé !')
}

main().catch((err) => { console.error(err); process.exit(1) })
