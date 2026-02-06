import { createClient } from '@sanity/client'
import type { Article, Service, Settings, TeamMember } from './types'

type EnvValue = string | undefined

const getEnvVar = (name: string): EnvValue => {
  if (typeof process !== 'undefined' && process.env[name]) return process.env[name]

  const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env
  if (viteEnv && viteEnv[name]) return viteEnv[name]

  return undefined
}

const config = {
  projectId: getEnvVar('VITE_SANITY_PROJECT_ID') || 'btjdqrld',
  dataset: getEnvVar('VITE_SANITY_DATASET') || 'production',
  apiVersion: getEnvVar('VITE_SANITY_API_VERSION') || '2024-01-01',
  useCdn: true,
}

export const client = createClient(config)

export const writeClient = createClient({
  ...config,
  token: getEnvVar('SANITY_WRITE_TOKEN'),
  useCdn: false,
})

export async function getServices(): Promise<Service[]> {
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

export async function getTeamMembers(): Promise<TeamMember[]> {
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

export async function getArticles(): Promise<Article[]> {
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

export async function getArticleBySlug(slug: string): Promise<Article | null> {
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

export async function getSettings(): Promise<Settings | null> {
  return client.fetch(`
    *[_type == "settings"][0] {
      _id,
      siteTitle,
      siteDescription,
      footerInfo,
      contactInfo,
      socialMedia,
      socialLinks[] {
        platform,
        url
      },
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
