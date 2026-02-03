/**
 * Script de nettoyage - Supprime les documents invalides
 * 
 * Usage: npx tsx scripts/clean-invalid-documents.ts
 */

import 'dotenv/config'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'btjdqrld',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

async function deleteInvalidServices() {
  console.log('\n🧹 Cleaning invalid service documents...')
  
  // Find services without proper cardInfo structure
  const query = `*[_type == "service" && !defined(cardInfo.title)]`
  const invalidServices = await client.fetch(query)
  
  console.log(`Found ${invalidServices.length} invalid service documents`)
  
  for (const service of invalidServices) {
    try {
      await client.delete(service._id)
      console.log(`✅ Deleted invalid service: ${service._id}`)
    } catch (error: any) {
      console.error(`❌ Error deleting ${service._id}:`, error.message)
    }
  }
}

async function deleteInvalidClientTypes() {
  console.log('\n🧹 Cleaning invalid clientType documents...')
  
  // Find client types without proper title structure
  const query = `*[_type == "clientType" && !defined(title.fr)]`
  const invalidTypes = await client.fetch(query)
  
  console.log(`Found ${invalidTypes.length} invalid clientType documents`)
  
  for (const type of invalidTypes) {
    try {
      await client.delete(type._id)
      console.log(`✅ Deleted invalid clientType: ${type._id}`)
    } catch (error: any) {
      console.error(`❌ Error deleting ${type._id}:`, error.message)
    }
  }
}

async function listAllDocuments() {
  console.log('\n📋 Current documents in dataset:')
  
  const services = await client.fetch(`*[_type == "service"]{_id, "title": cardInfo.title.fr}`)
  console.log('\nServices:', services.length)
  services.forEach((s: any) => console.log(`  - ${s._id}: ${s.title || 'NO TITLE'}`))
  
  const clientTypes = await client.fetch(`*[_type == "clientType"]{_id, "title": title.fr}`)
  console.log('\nClient Types:', clientTypes.length)
  clientTypes.forEach((ct: any) => console.log(`  - ${ct._id}: ${ct.title || 'NO TITLE'}`))
  
  const teamMembers = await client.fetch(`*[_type == "teamMember"]{_id, name}`)
  console.log('\nTeam Members:', teamMembers.length)
  teamMembers.forEach((tm: any) => console.log(`  - ${tm._id}: ${tm.name}`))
}

async function main() {
  console.log('🚀 Starting cleanup...\n')
  
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('❌ SANITY_WRITE_TOKEN not found in .env')
    process.exit(1)
  }

  try {
    await deleteInvalidServices()
    await deleteInvalidClientTypes()
    await listAllDocuments()
    
    console.log('\n✅ Cleanup completed!')
    console.log('\n📝 Next step: Run migration again with: npm run migrate:pages')
  } catch (error: any) {
    console.error('\n❌ Cleanup failed:', error.message)
    process.exit(1)
  }
}

main()
