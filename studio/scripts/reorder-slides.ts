/**
 * Réordonne les hero slides :
 * 1. Swiss Ecogeste, 2. Régies, 3. Entreprise, 4. Villa, 5. Communes
 *
 * Usage : cd studio && npx sanity exec scripts/reorder-slides.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli'
const client = getCliClient({ apiVersion: '2024-01-01' })

async function main() {
  const slides = await client.fetch(`
    *[_type == "heroSlide"] {
      _id,
      "label": label.fr,
      order
    }
  `)
  console.log('Slides actuels:', slides.map((s: any) => `${s.order}. ${s.label}`))

  // Ordre voulu : Swiss Ecogeste=1, Régies=2, Entreprise=3, Villa=4, Communes=5
  const orderMap: Record<string, number> = {
    'Swiss Ecogeste': 1,
    'Régies & Immeubles': 2,
    'Entreprises': 3,
    'Villas & Maisons': 4,
    'Communes & GRD': 5,
  }

  for (const slide of slides) {
    const newOrder = orderMap[slide.label]
    if (newOrder !== undefined && newOrder !== slide.order) {
      await client.patch(slide._id).set({ order: newOrder }).commit()
      console.log(`  ✓ "${slide.label}" : ${slide.order} → ${newOrder}`)
    }
  }
  console.log('✅ Slides réordonnés')
}

main().catch(console.error)
