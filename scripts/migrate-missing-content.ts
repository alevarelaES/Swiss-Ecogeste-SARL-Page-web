import 'dotenv/config'
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

// Sanity Client
const writeClient = createClient({
    projectId: process.env.SANITY_PROJECT_ID || 'btjdqrld',
    dataset: process.env.SANITY_DATASET || 'production',
    token: process.env.SANITY_WRITE_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: false,
})

// Helper to read locales
function getLocale(lang: string) {
    const filePath = path.join(process.cwd(), 'public', 'locales', lang, 'common.json')
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

async function createDocument(type: string, data: any, docId?: string) {
    try {
        const doc = {
            _type: type,
            ...data,
        }
        if (docId) {
            doc._id = docId
        }
        const result = await writeClient.createOrReplace(doc)
        console.log(`✅ Created/Updated ${type}: ${docId}`)
        return result
    } catch (error: any) {
        console.error(`❌ Error creating ${type}:`, error.message || error)
    }
}

async function migrate() {
    const fr = getLocale('fr')
    const en = getLocale('en')
    const de = getLocale('de')

    // --- Team Page ---
    console.log('Migrating Team Page...')

    // Extract values list from 'why_us.items'
    const valueKeys = ['confiance', 'neutrality', 'data', 'legal', 'quality', 'human']
    const icons = {
        confiance: 'ShieldCheck',
        neutrality: 'Scale',
        data: 'Database',
        legal: 'FileCheck',
        quality: 'Award',
        human: 'Users'
    }

    const valuesList = valueKeys.map((key) => ({
        _key: key,
        icon: (icons as any)[key] || 'Zap',
        title: {
            fr: fr.why_us.items[key].title,
            en: en.why_us.items[key].title,
            de: de.why_us.items[key].title,
        },
        description: {
            fr: fr.why_us.items[key].desc,
            en: en.why_us.items[key].desc,
            de: de.why_us.items[key].desc,
        }
    }))

    const teamPageData = {
        hero: {
            label: {
                fr: fr.team_page.header_label,
                en: en.team_page.header_label,
                de: de.team_page.header_label,
            },
            title: {
                fr: fr.team_page.header_title,
                en: en.team_page.header_title,
                de: de.team_page.header_title,
            },
            intro: {
                fr: fr.team_page.intro,
                en: en.team_page.intro,
                de: de.team_page.intro,
            }
        },
        values: {
            title: {
                fr: fr.team_page.values_title,
                en: en.team_page.values_title,
                de: de.team_page.values_title,
            },
            intro: {
                fr: fr.team_page.values_intro,
                en: en.team_page.values_intro,
                de: de.team_page.values_intro,
            },
            list: valuesList
        }
    }

    await createDocument('teamPage', teamPageData, 'teamPage')

    // --- Contact Page ---
    console.log('Migrating Contact Page...')

    const contactPageData = {
        seo: {
            title: {
                fr: fr.contact_page.seo_title,
                en: en.contact_page.seo_title,
                de: de.contact_page.seo_title,
            },
            description: {
                fr: fr.contact_page.seo_description,
                en: en.contact_page.seo_description,
                de: de.contact_page.seo_description,
            }
        },
        hero: {
            title: {
                fr: fr.contact_page.title,
                en: en.contact_page.title,
                de: de.contact_page.title,
            },
            description: {
                fr: fr.contact_page.description,
                en: en.contact_page.description,
                de: de.contact_page.description,
            }
        },
        formSection: {
            tag: {
                fr: fr.contact_section.tag,
                en: en.contact_section.tag,
                de: de.contact_section.tag,
            },
            title: {
                fr: fr.contact_section.title,
                en: en.contact_section.title,
                de: de.contact_section.title,
            },
            subtitle: {
                fr: fr.contact_section.subtitle,
                en: en.contact_section.subtitle,
                de: de.contact_section.subtitle,
            },
            quote: {
                fr: fr.contact_section.quote,
                en: en.contact_section.quote,
                de: de.contact_section.quote,
            }
            // Image manual upload
        }
    }

    await createDocument('contactPage', contactPageData, 'contactPage')

    console.log('✨ Missing content migration complete!')
}

migrate()
