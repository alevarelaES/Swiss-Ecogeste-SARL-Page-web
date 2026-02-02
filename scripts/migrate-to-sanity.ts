/**
 * Script de migration des données vers Sanity
 * 
 * Usage:
 * 1. Créez un token API sur https://www.sanity.io/manage/project/btjdqrld
 * 2. Ajoutez le token dans le fichier .env (SANITY_WRITE_TOKEN=...)
 * 3. Assurez-vous que le Studio Sanity tourne (cd studio && npm run dev)
 * 4. Exécutez: npx tsx scripts/migrate-to-sanity.ts
 */

import 'dotenv/config'
import { writeClient } from '../src/sanity/client'
import { getServices } from '../src/app/data/services'
import { getTeamMembers } from '../src/app/data/teamMembers'
import { getArticles } from '../src/app/data/articles'

// Fonction helper pour créer un document
async function createDocument(type: string, data: any) {
  try {
    const result = await writeClient.create({
      _type: type,
      ...data,
    })
    console.log(`✅ Created ${type}: ${data.name || data.title?.fr || data.id}`)
    return result
  } catch (error: any) {
    console.error(`❌ Error creating ${type}:`, error.message || error)
    throw error
  }
}

// Helper pour extraire le nom de l'icône Lucide
function getIconName(icon: any): string {
  if (typeof icon === 'string') return icon
  if (icon && icon.name) return icon.name
  // Si c'est un composant Lucide, extraire le nom du displayName ou name
  if (icon && typeof icon === 'function') {
    return icon.displayName || icon.name || 'HelpCircle'
  }
  return 'HelpCircle'
}

// Migration des services
async function migrateServices() {
  console.log('\n📦 Migrating Services...')
  
  const servicesFr = getServices('fr')
  const servicesEn = getServices('en')
  const servicesDe = getServices('de')

  for (let i = 0; i < servicesFr.length; i++) {
    const serviceFr = servicesFr[i]
    const serviceEn = servicesEn[i]
    const serviceDe = servicesDe[i]

    const serviceData = {
      id: serviceFr.id,
      number: serviceFr.number,
      icon: getIconName(serviceFr.icon),
      title: {
        fr: serviceFr.title,
        en: serviceEn.title,
        de: serviceDe.title,
      },
      subtitle: {
        fr: serviceFr.subtitle,
        en: serviceEn.subtitle,
        de: serviceDe.subtitle,
      },
      description: {
        fr: serviceFr.description,
        en: serviceEn.description,
        de: serviceDe.description,
      },
      fullDescription: {
        fr: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: serviceFr.fullDescription }],
          },
        ],
        en: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: serviceEn.fullDescription }],
          },
        ],
        de: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: serviceDe.fullDescription }],
          },
        ],
      },
      features: {
        fr: serviceFr.features,
        en: serviceEn.features,
        de: serviceDe.features,
      },
      link: serviceFr.link,
      delay: serviceFr.delay,
      // Note: Les images doivent être uploadées manuellement dans le Studio
      // car elles pointent actuellement vers des URLs externes (Unsplash)
    }

    await createDocument('service', serviceData)
  }
}

// Migration des membres de l'équipe
async function migrateTeamMembers() {
  console.log('\n👥 Migrating Team Members...')
  
  const teamMembersFr = getTeamMembers('fr')
  const teamMembersEn = getTeamMembers('en')
  const teamMembersDe = getTeamMembers('de')

  for (let i = 0; i < teamMembersFr.length; i++) {
    const memberFr = teamMembersFr[i]
    const memberEn = teamMembersEn[i]
    const memberDe = teamMembersDe[i]

    const memberData = {
      name: memberFr.name,
      role: {
        fr: memberFr.role,
        en: memberEn.role,
        de: memberDe.role,
      },
      initials: memberFr.initials,
      color: memberFr.color,
      items: {
        fr: memberFr.items,
        en: memberEn.items,
        de: memberDe.items,
      },
      order: i + 1,
      // Note: Les photos doivent être uploadées manuellement dans le Studio
    }

    await createDocument('teamMember', memberData)
  }
}

// Helper pour convertir HTML en Portable Text basique
function htmlToPortableText(html: string): any[] {
  // Cette fonction est une version simplifiée
  // Pour une conversion complète, utilisez @sanity/block-content-to-html
  
  const paragraphs = html
    .split('</p>')
    .filter((p) => p.trim())
    .map((p) => p.replace(/<\/?[^>]+(>|$)/g, '').trim())

  return paragraphs.map((text) => ({
    _type: 'block',
    children: [{ _type: 'span', text }],
  }))
}

// Migration des articles
async function migrateArticles() {
  console.log('\n📝 Migrating Articles...')
  
  const articlesFr = getArticles('fr')
  const articlesEn = getArticles('en')
  const articlesDe = getArticles('de')

  for (let i = 0; i < articlesFr.length; i++) {
    const articleFr = articlesFr[i]
    const articleEn = articlesEn[i]
    const articleDe = articlesDe[i]

    const articleData = {
      title: {
        fr: articleFr.title,
        en: articleEn.title,
        de: articleDe.title,
      },
      slug: {
        _type: 'slug',
        current: articleFr.slug,
      },
      excerpt: {
        fr: articleFr.excerpt,
        en: articleEn.excerpt,
        de: articleDe.excerpt,
      },
      category: {
        fr: articleFr.category,
        en: articleEn.category,
        de: articleDe.category,
      },
      publishedAt: articleFr.date,
      readTime: articleFr.readTime,
      content: {
        fr: articleFr.content ? htmlToPortableText(articleFr.content) : [],
        en: articleEn.content ? htmlToPortableText(articleEn.content) : [],
        de: articleDe.content ? htmlToPortableText(articleDe.content) : [],
      },
      featured: false,
      tags: [],
      // Note: Les images doivent être uploadées manuellement
    }

    await createDocument('article', articleData)
  }
}

// Migration des paramètres
async function migrateSettings() {
  console.log('\n⚙️  Creating Settings document...')
  
  const settingsData = {
    siteName: {
      fr: 'Swiss Ecogeste',
      en: 'Swiss Ecogeste',
      de: 'Swiss Ecogeste',
    },
    siteDescription: {
      fr: 'Conseil en énergie et développement durable à Genève',
      en: 'Energy consulting and sustainable development in Geneva',
      de: 'Energieberatung und nachhaltige Entwicklung in Genf',
    },
    phone: '+41 22 XXX XX XX', // À remplacer
    email: 'contact@swiss-ecogeste.ch', // À remplacer
    address: {
      street: 'Rue Example 123', // À remplacer
      postalCode: '1200',
      city: 'Genève',
      country: 'Suisse',
    },
    socialMedia: {
      linkedin: '',
      facebook: '',
      twitter: '',
      instagram: '',
    },
    businessHours: {
      fr: 'Lun-Ven: 8h00-17h00',
      en: 'Mon-Fri: 8am-5pm',
      de: 'Mo-Fr: 8:00-17:00',
    },
  }

  await createDocument('settings', settingsData)
}

// Fonction principale
async function migrate() {
  console.log('🚀 Starting migration to Sanity...\n')
  
  try {
    await migrateServices()
    await migrateTeamMembers()
    await migrateArticles()
    await migrateSettings()
    
    console.log('\n✨ Migration completed successfully!')
    console.log('\n⚠️  Important: Les images doivent être uploadées manuellement dans Sanity Studio')
    console.log('   Allez sur http://localhost:3333 et ajoutez les images à chaque document')
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

// Exécuter la migration
migrate()
