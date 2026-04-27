import { createClient } from '@sanity/client'

// Configuration du client Sanity
const config = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'btjdqrld',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'dev',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
}

export const client = createClient(config)

// Client avec token d'écriture pour la migration
export const writeClient = createClient({
  ...config,
  token: import.meta.env.VITE_SANITY_WRITE_TOKEN,
  useCdn: false,
})

// ─────────────────────────────────────────────
// Équipe
// ─────────────────────────────────────────────

export async function getTeamMembers() {
  return client.fetch(`
    *[_type == "teamMember"] | order(order asc) {
      _id,
      name,
      role,
      initials,
      photo {
        asset->{ _id, url }
      },
      color,
      items,
      email,
      phone,
      order
    }
  `)
}

// ─────────────────────────────────────────────
// Hero Slides
// ─────────────────────────────────────────────

export async function getHeroSlides(lang: string = 'fr') {
  return client.fetch(`
    *[_type == "heroSlide"] | order(order asc) {
      _id,
      isMain,
      "label": label.${lang},
      "title": title.${lang},
      "sub": subtitle.${lang},
      "description": description.${lang},
      "featuresLabel": featuresLabel.${lang},
      "features": features.${lang},
      "buttonText": buttonText.${lang},
      buttonLink,
      "secondButtonText": secondButtonText.${lang},
      secondButtonLink,
      "img": image.asset->url,
      order
    }
  `)
}

// ─────────────────────────────────────────────
// Statistiques
// ─────────────────────────────────────────────

export async function getSanityStats(lang: string = 'fr') {
  return client.fetch(`
    *[_type == "stat"] | order(order asc) {
      _id,
      value,
      "text": text.${lang},
      "prefix": prefix.${lang},
      "suffix": suffix.${lang},
      "label": label.${lang},
      icon,
      order
    }
  `)
}

export async function getSanityStatsContent(lang: string = 'fr') {
  return client.fetch(`
    *[_type == "homePage"][0] {
      "label": statsSection.label.${lang},
      "title": statsSection.title.${lang},
      "description": statsSection.description.${lang}
    }
  `)
}

// ─────────────────────────────────────────────
// Types de clients (cartes solutions accueil)
// ─────────────────────────────────────────────

export async function getSanityClientTypes(lang: string = 'fr') {
  return client.fetch(`
    *[_type == "clientType"] | order(order asc) {
      _id,
      slug,
      "title": title.${lang},
      "subtitle": subtitle.${lang},
      "description": description.${lang},
      link,
      "imageUrl": image.asset->url,
      order
    }
  `)
}

// ─────────────────────────────────────────────
// Section À Propos (accueil)
// ─────────────────────────────────────────────

export async function getSanityAboutContent(lang: string = 'fr') {
  return client.fetch(`
    *[_type == "aboutPage"][0] {
      "sectionLabel": sectionLabel.${lang},
      "title": title.${lang},
      "paragraph1": paragraph1.${lang},
      "paragraph2": paragraph2.${lang},
      "values": values[] {
        "title": title.${lang},
        "subtitle": subtitle.${lang}
      },
      "ctaText": cta.text.${lang},
      "ctaLink": cta.link,
      "quote": quote.${lang},
      "quoteAuthor": quoteAuthor.${lang},
      "imageUrl": image.asset->url
    }
  `)
}

// ─────────────────────────────────────────────
// Pourquoi nous choisir
// ─────────────────────────────────────────────

export async function getSanityWhyChooseUs(lang: string = 'fr') {
  return client.fetch(`
    *[_type == "whyChooseUs"][0] {
      "sectionLabel": sectionLabel.${lang},
      "title": title.${lang},
      "titleHighlight": titleHighlight.${lang},
      "description": description.${lang},
      "reasons": reasons[] {
        icon,
        "title": title.${lang},
        "description": description.${lang}
      }
    }
  `)
}

// ─────────────────────────────────────────────
// Pages de service (villa, gérance, entreprise, communes)
// ─────────────────────────────────────────────

export async function getSanityServicePage(pageSlug: string, lang: string = 'fr') {
  return client.fetch(`
    *[_type == "servicePage" && pageSlug == $pageSlug][0] {
      pageSlug,
      "seo": {
        "title": seo.title.${lang},
        "description": seo.description.${lang},
        "canonical": seo.canonical
      },
      "sectionLabel": sectionLabel.${lang},
      "title": title.${lang},
      "description": description.${lang},
      "heroImage": heroImage.asset->url,
      "buttonText": buttonText.${lang},
      buttonLink,
      "backLink": backLink.${lang},
      "services": services[] {
        "title": title.${lang},
        "description": description.${lang},
        "image": image.asset->url,
        "features": features.${lang},
        "note": note.${lang}
      }
    }
  `, { pageSlug })
}

// ─────────────────────────────────────────────
// Articles
// ─────────────────────────────────────────────

export async function getArticles(lang: string = 'fr') {
  return client.fetch(`
    *[_type == "article"] | order(publishedAt desc) [0...3] {
      _id,
      "title": title.${lang},
      "excerpt": excerpt.${lang},
      "category": category.${lang},
      publishedAt,
      readTime,
      "imageUrl": image.asset->url,
      "slug": slug.current,
      featured,
    }
  `)
}

export async function getArticleBySlug(slug: string, lang: string = 'fr') {
  return client.fetch(
    `
    *[_type == "article" && slug.current == $slug][0] {
      _id,
      "title": title.${lang},
      "slug": slug.current,
      "excerpt": excerpt.${lang},
      "category": category.${lang},
      publishedAt,
      readTime,
      "imageUrl": image.asset->url,
      "imageAlt": image.alt,
      "content": content.${lang},
      featured,
      tags
    }
  `,
    { slug }
  )
}

// ─────────────────────────────────────────────
// Pages Resultats & A Propos
// ─────────────────────────────────────────────

export async function getSanityResultatsPage(lang: string = 'fr') {
  return client.fetch(`
    *[_type == "resultatsPage"][0] {
      "seo": {
        "title": seo.title.${lang},
        "description": seo.description.${lang}
      },
      "heroTitle": heroTitle.${lang},
      "heroSubtitle": heroSubtitle.${lang},
      "impactStats": impactStats[] {
        value,
        suffix,
        prefix,
        "label": label.${lang}
      },
      "cases": cases[] {
        "sector": sector.${lang},
        "title": title.${lang},
        mainMetric,
        mainMetricSuffix,
        "mainMetricLabel": mainMetricLabel.${lang},
        "kpis": kpis[] {
          value,
          unit,
          "label": label.${lang}
        },
        "beforeItems": beforeItems.${lang},
        "afterItems": afterItems.${lang}
      }
    }
  `)
}

export async function getSanityAProposPage(lang: string = 'fr') {
  return client.fetch(`
    *[_type == "aProposPage"][0] {
      "heroLabel": heroLabel.${lang},
      "heroTitle": heroTitle.${lang},
      "heroIntro": heroIntro.${lang},
      "missionTitle": missionTitle.${lang},
      "missionText": missionText.${lang},
      "missionText2": missionText2.${lang},
      "presenceTitle": presenceTitle.${lang},
      "presenceText": presenceText.${lang},
      "companyStats": companyStats[] {
        value,
        "label": label.${lang}
      },
      "qualityTitle": qualityTitle.${lang},
      "qualityText": qualityText.${lang},
      "qualitySteps": qualitySteps.${lang},
      "groupPhotoUrl": groupPhoto.asset->url,
      "photoTitle": photoTitle.${lang},
      "photoSubtitle": photoSubtitle.${lang}
    }
  `)
}

// ─────────────────────────────────────────────
// Page Contact
// ─────────────────────────────────────────────

export async function getContactPage() {
  return client.fetch(`
    *[_type == "contactPage"][0] {
      formSection {
        image {
          asset->{ _id, url },
          hotspot,
          crop
        }
      }
    }
  `)
}

// ─────────────────────────────────────────────
// Partenaires
// ─────────────────────────────────────────────

export async function getPartners() {
  return client.fetch(`
    *[_type == "partner"] | order(order asc) {
      _id,
      name,
      logo {
        asset->{ _id, url }
      },
      url,
      order
    }
  `)
}

// ─────────────────────────────────────────────
// Étapes du processus
// ─────────────────────────────────────────────

export async function getProcessSteps(lang: string = 'fr') {
  return client.fetch(`
    *[_type == "processStep"] | order(stepNumber asc) {
      _id,
      stepNumber,
      "title": title.${lang},
      "description": description.${lang}
    }
  `)
}

// ─────────────────────────────────────────────
// Paramètres du site
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// Pages légales
// ─────────────────────────────────────────────

export async function getLegalPage(pageType: string, lang: string = 'fr') {
  return client.fetch(`
    *[_type == "legalPage" && pageType == $pageType][0] {
      pageType,
      "seoTitle": seo.title.${lang},
      "seoDescription": seo.description.${lang},
      "title": title.${lang},
      lastUpdated,
      "sections": sections[] {
        "title": title.${lang},
        "content": content.${lang}
      }
    }
  `, { pageType })
}

export async function getSettings() {
  return client.fetch(`
    *[_type == "settings"][0] {
      _id,
      "siteName": siteTitle.fr,
      "siteDescription": siteDescription.fr,
      socialMedia,
      footerInfo,
      contactInfo,
      logo {
        asset->{ _id, url },
        alt
      },
      favicon {
        asset->{ _id, url }
      }
    }
  `)
}
