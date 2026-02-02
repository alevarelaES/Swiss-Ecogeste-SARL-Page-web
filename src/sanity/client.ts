import { createClient } from '@sanity/client'

// Configuration du client Sanity
const config = {
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'btjdqrld',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: process.env.VITE_SANITY_API_VERSION || '2024-01-01',
  useCdn: true, // Set to false for fresh data
}

export const client = createClient(config)

// Client avec token d'écriture pour la migration
export const writeClient = createClient({
  ...config,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

// Helper pour récupérer les services
export async function getServices() {
  return client.fetch(`
    *[_type == "service"] | order(number asc) {
      _id,
      id,
      number,
      icon,
      title,
      subtitle,
      description,
      fullDescription,
      features,
      image {
        asset->{ _id, url },
        alt
      },
      link,
      delay
    }
  `)
}

// Helper pour récupérer les membres de l'équipe
export async function getTeamMembers() {
  return client.fetch(`
    *[_type == "teamMember"] | order(order asc) {
      _id,
      name,
      role,
      initials,
      photo {
        asset->{ _id, url },
        alt
      },
      color,
      items,
      email,
      phone,
      order
    }
  `)
}

// Helper pour récupérer les articles
export async function getArticles() {
  return client.fetch(`
    *[_type == "article"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      category,
      publishedAt,
      readTime,
      image {
        asset->{ _id, url },
        alt
      },
      content,
      featured,
      tags
    }
  `)
}

// Helper pour récupérer un article par slug
export async function getArticleBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "article" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      category,
      publishedAt,
      readTime,
      image {
        asset->{ _id, url },
        alt
      },
      content,
      featured,
      tags
    }
  `,
    { slug }
  )
}

// Helper pour récupérer les paramètres du site
export async function getSettings() {
  return client.fetch(`
    *[_type == "settings"][0] {
      _id,
      siteName,
      siteDescription,
      phone,
      email,
      address,
      socialMedia,
      businessHours,
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
