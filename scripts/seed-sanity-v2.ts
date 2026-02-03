import 'dotenv/config'
import { writeClient } from '../src/sanity/client'
import { getHeroSlides } from '../src/app/data/heroSlides'
import { getStats, getStatsContent } from '../src/app/data/statsData'
import { getAboutContent } from '../src/app/data/aboutContent'
import { getServices } from '../src/app/data/services'
import { getTeamMembers } from '../src/app/data/teamMembers'

// --- MAPPINGS ---
// Create Document Helper
async function createOrReplace(type: string, id: string, data: any) {
    try {
        const doc = { _type: type, _id: id, ...data }
        await writeClient.createOrReplace(doc)
        console.log(`✅ ${type} : ${id} created/updated`)
        return { _type: 'reference', _ref: id }
    } catch (err: any) {
        console.error(`❌ Error ${type} ${id}:`, err.message)
    }
}

// 1. HOME PAGE
async function seedHomePage() {
    console.log('\n🏠 Seeding Home Page...')

    // Hero Slides (inline in homePage)
    const slidesFr = getHeroSlides('fr')
    const slidesEn = getHeroSlides('en')
    const slidesDe = getHeroSlides('de')

    const heroSlides = slidesFr.map((fr, i) => ({
        _key: `slide-${i}`,
        title: { fr: fr.title, en: slidesEn[i].title, de: slidesDe[i].title },
        subtitle: { fr: fr.sub, en: slidesEn[i].sub, de: slidesDe[i].sub },
        features: fr.features, // Using FR features as base string array for now
        buttonText: { fr: fr.buttonText, en: slidesEn[i].buttonText, de: slidesDe[i].buttonText },
        buttonLink: fr.buttonLink
    }))

    // Stats Section
    const statsFr = getStats('fr')
    const statsEn = getStats('en')
    const statsDe = getStats('de')
    const statsContentFr = getStatsContent('fr')

    const statsItems = statsFr.map((fr, i) => ({
        _key: `stat-${i}`,
        value: String(fr.value || 0),
        label: { fr: fr.label, en: statsEn[i].label, de: statsDe[i].label },
        prefix: fr.prefix,
        suffix: fr.suffix,
        icon: 'Zap' // Default, mapping would require lookup
    }))

    const homeData = {
        heroSlides: heroSlides,
        statsSection: {
            title: { fr: statsContentFr.title, en: getStatsContent('en').title, de: getStatsContent('de').title },
            items: statsItems
        },
        solutionsSection: {
            title: { fr: 'Nos Solutions', en: 'Our Solutions', de: 'Unsere Lösungen' },
            description: { fr: 'Découvrez nos offres', en: 'Discover our offers', de: 'Entdecken Sie unsere Angebote' },
            items: [] // To be filled with clientType or Service refs if available
        }
    }

    await createOrReplace('homePage', 'homePage', homeData)
}

// 2. SERVICES & SERVICES PAGE
async function seedServices() {
    console.log('\n🛠️ Seeding Services...')
    const servicesFr = getServices('fr')
    const servicesEn = getServices('en')
    const servicesDe = getServices('de')

    const serviceRefs = []

    for (let i = 0; i < servicesFr.length; i++) {
        const fr = servicesFr[i]
        const en = servicesEn[i]
        const de = servicesDe[i]
        const id = `service-${fr.id}`

        const serviceData = {
            cardInfo: {
                title: { fr: fr.title, en: en.title, de: de.title },
                subtitle: { fr: fr.subtitle, en: en.subtitle, de: de.subtitle },
                description: { fr: fr.description, en: en.description, de: de.description },
                slug: { current: fr.link.split('/').pop() }
            },
            detailPage: {
                title: { fr: fr.title, en: en.title, de: de.title },
                description: { fr: fr.fullDescription, en: en.fullDescription, de: de.fullDescription },
                benefits: { fr: fr.features, en: en.features, de: de.features }
            }
        }

        const ref = await createOrReplace('service', id, serviceData)
        if (ref) serviceRefs.push({ ...ref, _key: id })
    }

    // Services Page Document
    await createOrReplace('servicesPage', 'servicesPage', {
        hero: {
            title: { fr: 'Nos Services', en: 'Our Services', de: 'Unsere Dienstleistungen' },
            description: { fr: 'Solutions énergétiques durables', en: 'Sustainable energy solutions', de: 'Nachhaltige Energielösungen' }
        },
        servicesList: serviceRefs
    })
}

// 3. TEAM & TEAM PAGE
async function seedTeam() {
    console.log('\n👥 Seeding Team...')
    const teamFr = getTeamMembers('fr')
    const teamEn = getTeamMembers('en')
    const teamDe = getTeamMembers('de')

    const memberRefs = []

    for (let i = 0; i < teamFr.length; i++) {
        const fr = teamFr[i]
        const id = `teamMember-${i}`

        const memberData = {
            name: fr.name,
            role: { fr: fr.role, en: teamEn[i].role, de: teamDe[i].role },
            initials: fr.initials
        }

        const ref = await createOrReplace('teamMember', id, memberData)
        if (ref) memberRefs.push({ ...ref, _key: id })
    }

    // Team Page Document
    await createOrReplace('teamPage', 'teamPage', {
        hero: {
            title: { fr: 'Notre Équipe', en: 'Our Team', de: 'Unser Team' },
            intro: { fr: 'Rencontrez nos experts', en: 'Meet our experts', de: 'Treffen Sie unsere Experten' }
        },
        membersSection: {
            title: { fr: 'L\'équipe', en: 'The Team', de: 'Das Team' },
            membersList: memberRefs
        }
    })
}

// 4. ABOUT PAGE
async function seedAbout() {
    console.log('\nℹ️ Seeding About...')
    const aboutFr = getAboutContent('fr')
    const aboutEn = getAboutContent('en')
    const aboutDe = getAboutContent('de')

    const aboutData = {
        title: { fr: aboutFr.title, en: aboutEn.title, de: aboutDe.title },
        sectionLabel: { fr: aboutFr.sectionLabel, en: aboutEn.sectionLabel, de: aboutDe.sectionLabel },
        paragraphs: [
            { fr: aboutFr.paragraph1, en: aboutEn.paragraph1, de: aboutDe.paragraph1 },
            { fr: aboutFr.paragraph2, en: aboutEn.paragraph2, de: aboutDe.paragraph2 }
        ],
        cta: {
            text: { fr: aboutFr.ctaText, en: aboutEn.ctaText, de: aboutDe.ctaText },
            link: aboutFr.ctaLink
        }
    }

    await createOrReplace('aboutPage', 'aboutPage', aboutData)
}

async function main() {
    try {
        await seedHomePage()
        await seedServices()
        await seedTeam()
        await seedAbout()
        console.log('\n✨ Database populated according to new strict schema!')
    } catch (e) {
        console.error(e)
    }
}

main()
