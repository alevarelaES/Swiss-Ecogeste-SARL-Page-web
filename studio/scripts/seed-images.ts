/**
 * Upload des images manquantes dans Sanity :
 * 1. Logos partenaires (depuis public/partners/)
 * 2. Photos membres d'équipe (placeholders Unsplash)
 *
 * Usage : cd studio && npx sanity exec scripts/seed-images.ts --with-user-token
 */
import { getCliClient } from 'sanity/cli'
import * as fs from 'fs'
import * as path from 'path'

const client = getCliClient({ apiVersion: '2024-01-01' })

// Dossier racine du projet (deux niveaux au-dessus de studio/)
const PROJECT_ROOT = path.resolve(__dirname, '../../')

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

async function uploadLocalFile(filePath: string, filename: string): Promise<string> {
  const buffer = fs.readFileSync(filePath)
  const ext = path.extname(filename).toLowerCase()
  const contentType = ext === '.svg' ? 'image/svg+xml'
    : ext === '.png' ? 'image/png'
    : ext === '.webp' ? 'image/webp'
    : 'image/jpeg'
  const asset = await client.assets.upload('image', buffer, { filename, contentType })
  console.log(`  ↑ local: ${filename}`)
  return asset._id
}

async function uploadFromUrl(url: string, filename: string): Promise<string> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Fetch failed: ${url}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: response.headers.get('content-type') || 'image/jpeg',
  })
  console.log(`  ↑ url: ${filename}`)
  return asset._id
}

function imgRef(assetId: string) {
  return { _type: 'image' as const, asset: { _type: 'reference' as const, _ref: assetId } }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. LOGOS PARTENAIRES
// ─────────────────────────────────────────────────────────────────────────────

const partnerLogos: { id: string; file: string }[] = [
  { id: 'partner-vaud',   file: 'Logo_canton_de_Vaud.svg.png' },
  { id: 'partner-geneve', file: 'Canton_Geneve_Logo.png' },
  { id: 'partner-sig',    file: 'ECO21_SIG.png' },
  { id: 'partner-suisse', file: 'Suisse_Energie.png' },
  { id: 'partner-cr',     file: 'Chauffez RENOUVELABLE.png' },
  // partner-ocen : pas de logo local, on skippe
]

async function seedPartnerLogos() {
  console.log('\n[1/2] Upload logos partenaires...')
  for (const p of partnerLogos) {
    const filePath = path.join(PROJECT_ROOT, 'public', 'partners', p.file)
    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠ Fichier introuvable: ${p.file}`)
      continue
    }
    const assetId = await uploadLocalFile(filePath, p.file)
    await client.patch(p.id).set({ logo: imgRef(assetId) }).commit()
    console.log(`  ✓ Partenaire ${p.id} mis à jour`)
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. PHOTOS MEMBRES D'ÉQUIPE
// ─────────────────────────────────────────────────────────────────────────────

const teamPhotos: { id: string; url: string; name: string }[] = [
  {
    id: 'teamMember-salman',
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    name: 'photo-salman.jpg',
  },
  {
    id: 'teamMember-aydi',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    name: 'photo-aydi.jpg',
  },
  {
    id: 'teamMember-casier',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    name: 'photo-casier.jpg',
  },
  {
    id: 'teamMember-badoux',
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    name: 'photo-badoux.jpg',
  },
  {
    id: 'teamMember-casimirus',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    name: 'photo-casimirus.jpg',
  },
]

async function seedTeamPhotos() {
  console.log('\n[2/2] Upload photos membres d\'équipe...')
  for (const m of teamPhotos) {
    const assetId = await uploadFromUrl(m.url, m.name)
    await client.patch(m.id).set({ photo: imgRef(assetId) }).commit()
    console.log(`  ✓ ${m.id} mis à jour`)
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== Upload images partenaires & équipe ===')
  await seedPartnerLogos()
  await seedTeamPhotos()
  console.log('\n✅ Terminé !')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
