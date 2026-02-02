/**
 * Script pour supprimer tous les documents et relancer la migration
 */

import 'dotenv/config'
import { writeClient } from '../src/sanity/client'

async function deleteAllDocuments() {
  console.log('🗑️  Deleting all existing documents...')
  
  const types = ['service', 'teamMember', 'article', 'settings']
  
  for (const type of types) {
    const result = await writeClient.delete({
      query: `*[_type == "${type}"]`,
    })
    console.log(`✅ Deleted all ${type} documents`)
  }
}

deleteAllDocuments()
  .then(() => {
    console.log('\n✨ All documents deleted! Now run: npm run migrate')
  })
  .catch((error) => {
    console.error('\n❌ Error:', error)
    process.exit(1)
  })
