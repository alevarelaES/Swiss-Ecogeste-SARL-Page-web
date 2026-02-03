import 'dotenv/config'
import { writeClient } from '../src/sanity/client'
import { getHeroSlides } from '../src/app/data/heroSlides'
import { getStats, getStatsContent } from '../src/app/data/statsData'
import { getWhyChooseUsContent } from '../src/app/data/whyChooseUsContent'
import { getAboutContent } from '../src/app/data/aboutContent'
import { getClientTypes } from '../src/app/data/clientTypes'
import { getVillaPageContent } from '../src/app/data/villaPageContent'
import { getEntreprisePageContent } from '../src/app/data/entreprisePageContent'
import { getGerancePageContent } from '../src/app/data/gerancePageContent'
import { getCommunesPageContent } from '../src/app/data/communesPageContent'

// Helper function to create a document
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
        console.log(`✅ Created/Updated ${type}: ${docId || data.title?.fr || data.sectionLabel?.fr || 'Document'}`)
        return result
    } catch (error: any) {
        console.error(`❌ Error creating ${type}:`, error.message || error)
        throw error
    }
}

// 1. Migrate Hero Slides
async function migrateHeroSlides() {
    console.log('\n🌟 Migrating Hero Slides...')

    const slidesFr = getHeroSlides('fr')
    const slidesEn = getHeroSlides('en')
    const slidesDe = getHeroSlides('de')

    for (let i = 0; i < slidesFr.length; i++) {
        const slideFr = slidesFr[i]
        const slideEn = slidesEn[i]
        const slideDe = slidesDe[i]

        const slideData = {
            title: {
                fr: slideFr.title,
                en: slideEn.title,
                de: slideDe.title,
            },
            subtitle: {
                fr: slideFr.sub,
                en: slideEn.sub,
                de: slideDe.sub,
            },
            features: {
                fr: slideFr.features,
                en: slideEn.features,
                de: slideDe.features,
            },
            buttonText: {
                fr: slideFr.buttonText,
                en: slideEn.buttonText,
                de: slideDe.buttonText,
            },
            buttonLink: slideFr.buttonLink,
            order: i + 1,
            // Images must be uploaded manually
        }

        // Create a deterministic ID based on order to avoid duplicates if run multiple times
        const docId = `heroSlide-${i + 1}`
        await createDocument('heroSlide', slideData, docId)
    }
}

// 2. Migrate Stats
async function migrateStats() {
    console.log('\n📊 Migrating Stats...')

    const statsFr = getStats('fr')
    const statsEn = getStats('en')
    const statsDe = getStats('de')

    for (let i = 0; i < statsFr.length; i++) {
        const statFr = statsFr[i]
        const statEn = statsEn[i]
        const statDe = statsDe[i]

        // Lucide icon name handling
        let iconName = 'Zap' // Default
        if (statFr.icon) {
            // If it's a function/component, try to get displayName or name
            if (typeof statFr.icon === 'function') {
                iconName = (statFr.icon as any).displayName || (statFr.icon as any).name || 'Zap'
            }
            // If it's an object with name property (unlikely for Lucide but possible in some contexts)
            else if (typeof statFr.icon === 'object' && (statFr.icon as any).name) {
                iconName = (statFr.icon as any).name
            }
        }

        const statData = {
            value: statFr.value,
            text: {
                fr: statFr.text,
                en: statEn.text,
                de: statDe.text,
            },
            prefix: {
                fr: statFr.prefix,
                en: statEn.prefix,
                de: statDe.prefix,
            },
            suffix: {
                fr: statFr.suffix,
                en: statEn.suffix,
                de: statDe.suffix,
            },
            label: {
                fr: statFr.label,
                en: statEn.label,
                de: statDe.label,
            },
            icon: iconName,
            order: statFr.id,
        }

        const docId = `stat-${statFr.id}`
        await createDocument('stat', statData, docId)
    }
}

// 3. Migrate Why Choose Us
async function migrateWhyChooseUs() {
    console.log('\n❓ Migrating Why Choose Us...')

    const contentFr = getWhyChooseUsContent('fr')
    const contentEn = getWhyChooseUsContent('en')
    const contentDe = getWhyChooseUsContent('de')

    const reasons = contentFr.reasons.map((reasonFr, index) => {
        const reasonEn = contentEn.reasons[index]
        const reasonDe = contentDe.reasons[index]

        let iconName = 'Check'
        if (reasonFr.icon) {
            if (typeof reasonFr.icon === 'function') {
                iconName = (reasonFr.icon as any).displayName || (reasonFr.icon as any).name || 'Check'
            }
        }

        return {
            _key: `reason-${index}`,
            icon: iconName,
            title: {
                fr: reasonFr.title,
                en: reasonEn.title,
                de: reasonDe.title,
            },
            description: {
                fr: reasonFr.description,
                en: reasonEn.description,
                de: reasonDe.description,
            },
        }
    })

    const docData = {
        sectionLabel: {
            fr: contentFr.sectionLabel,
            en: contentEn.sectionLabel,
            de: contentDe.sectionLabel,
        },
        title: {
            fr: contentFr.title,
            en: contentEn.title,
            de: contentDe.title,
        },
        titleHighlight: {
            fr: contentFr.titleHighlight,
            en: contentEn.titleHighlight,
            de: contentDe.titleHighlight,
        },
        description: {
            fr: contentFr.description,
            en: contentEn.description,
            de: contentDe.description,
        },
        reasons: reasons,
    }

    await createDocument('whyChooseUs', docData, 'whyChooseUs')
}

// 4. Migrate About Page
async function migrateAboutPage() {
    console.log('\nℹ️ Migrating About Page...')

    const contentFr = getAboutContent('fr')
    const contentEn = getAboutContent('en')
    const contentDe = getAboutContent('de')

    const values = contentFr.values.map((valFr, index) => {
        const valEn = contentEn.values[index]
        const valDe = contentDe.values[index]

        return {
            _key: `value-${index}`,
            title: {
                fr: valFr.title,
                en: valEn.title,
                de: valDe.title,
            },
            subtitle: {
                fr: valFr.subtitle,
                en: valEn.subtitle,
                de: valDe.subtitle,
            },
        }
    })

    const docData = {
        sectionLabel: {
            fr: contentFr.sectionLabel,
            en: contentEn.sectionLabel,
            de: contentDe.sectionLabel,
        },
        title: {
            fr: contentFr.title,
            en: contentEn.title,
            de: contentDe.title,
        },
        paragraph1: {
            fr: contentFr.paragraph1,
            en: contentEn.paragraph1,
            de: contentDe.paragraph1,
        },
        paragraph2: {
            fr: contentFr.paragraph2,
            en: contentEn.paragraph2,
            de: contentDe.paragraph2,
        },
        values: values,
        ctaText: {
            fr: contentFr.ctaText,
            en: contentEn.ctaText,
            de: contentDe.ctaText,
        },
        ctaLink: contentFr.ctaLink,
        quote: {
            fr: contentFr.quote,
            en: contentEn.quote,
            de: contentDe.quote,
        },
        // Image to be uploaded manually
    }

    await createDocument('aboutPage', docData, 'aboutPage')
}

// 5. Migrate Client Types
async function migrateClientTypes() {
    console.log('\n👥 Migrating Client Types...')

    const clientsFr = getClientTypes('fr')
    const clientsEn = getClientTypes('en')
    const clientsDe = getClientTypes('de')

    for (let i = 0; i < clientsFr.length; i++) {
        const clientFr = clientsFr[i]
        const clientEn = clientsEn[i]
        const clientDe = clientsDe[i]

        const docData = {
            slug: clientFr.id,
            title: {
                fr: clientFr.title,
                en: clientEn.title,
                de: clientDe.title,
            },
            subtitle: {
                fr: clientFr.subtitle,
                en: clientEn.subtitle,
                de: clientDe.subtitle,
            },
            description: {
                fr: clientFr.description,
                en: clientEn.description,
                de: clientDe.description,
            },
            link: clientFr.link,
            order: i + 1,
            // Image to be uploaded manually
        }

        await createDocument('clientType', docData, `clientType-${clientFr.id}`)
    }
}

// 6. Migrate Page Contents
async function migratePageContents() {
    console.log('\n📄 Migrating Page Contents (Villa, Entreprise, Gerance, Communes)...')

    const pages = [
        { type: 'villa', getter: getVillaPageContent },
        { type: 'entreprise', getter: getEntreprisePageContent },
        { type: 'gerance', getter: getGerancePageContent }, // 'gerance' per pageType options
        { type: 'communes', getter: getCommunesPageContent },
    ]

    for (const page of pages) {
        const contentFr = page.getter('fr')
        const contentEn = page.getter('en')
        const contentDe = page.getter('de')

        const services = contentFr.services.map((svcFr, idx) => {
            const svcEn = contentEn.services[idx]
            const svcDe = contentDe.services[idx]

            return {
                _key: `service-${idx}`,
                title: {
                    fr: svcFr.title,
                    en: svcEn.title,
                    de: svcDe.title,
                },
                description: {
                    fr: svcFr.description,
                    en: svcEn.description,
                    de: svcDe.description,
                },
                features: {
                    fr: svcFr.features,
                    en: svcEn.features,
                    de: svcDe.features,
                },
                // Image to be uploaded manually
            }
        })

        const docData = {
            pageType: page.type,
            seo: {
                title: {
                    fr: contentFr.seo.title,
                    en: contentEn.seo.title,
                    de: contentDe.seo.title,
                },
                description: {
                    fr: contentFr.seo.description,
                    en: contentEn.seo.description,
                    de: contentDe.seo.description,
                },
                canonical: contentFr.seo.canonical,
            },
            backLink: {
                fr: contentFr.backLink,
                en: contentEn.backLink,
                de: contentDe.backLink,
            },
            sectionLabel: {
                fr: contentFr.sectionLabel,
                en: contentEn.sectionLabel,
                de: contentDe.sectionLabel,
            },
            title: {
                fr: contentFr.title,
                en: contentEn.title,
                de: contentDe.title,
            },
            description: {
                fr: contentFr.description,
                en: contentEn.description,
                de: contentDe.description,
            },
            buttonText: {
                fr: contentFr.buttonText,
                en: contentEn.buttonText,
                de: contentDe.buttonText,
            },
            buttonLink: contentFr.buttonLink,
            services: services,
            // Hero image to be uploaded manually
        }

        await createDocument('pageContent', docData, `pageContent-${page.type}`)
    }
}

// Main execution
async function main() {
    console.log('🚀 Starting complete content migration to Sanity...\n')

    try {
        await migrateHeroSlides()
        await migrateStats()
        await migrateWhyChooseUs()
        await migrateAboutPage()
        await migrateClientTypes()
        await migratePageContents()

        console.log('\n✨ All content migrated successfully!')
        console.log('\n⚠️  ACTION REQUIRED: You must upload images manually in Sanity Studio.')
        console.log('   Go to http://localhost:3333 to verify content and add images.')
    } catch (error) {
        console.error('\n❌ Migration failed:', error)
        process.exit(1)
    }
}

main()
