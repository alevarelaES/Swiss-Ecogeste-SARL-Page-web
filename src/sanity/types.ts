import type { PortableTextBlock } from '@portabletext/types'

export interface LocalizedString {
  fr: string
  en: string
  de: string
}

export interface LocalizedText {
  fr: string
  en: string
  de: string
}

export interface LocalizedArray {
  fr: string[]
  en: string[]
  de: string[]
}

export interface LocalizedPortableText {
  fr: PortableTextBlock[]
  en: PortableTextBlock[]
  de: PortableTextBlock[]
}

export interface SanityImage {
  asset: {
    _id: string
    url: string
  }
  alt?: string
}

export interface Service {
  _id: string
  id: string
  number: string
  icon: string
  title: LocalizedString
  subtitle: LocalizedString
  description: LocalizedText
  fullDescription: LocalizedPortableText
  features: LocalizedArray
  image: SanityImage
  link?: string
  delay: number
}

export interface TeamMember {
  _id: string
  name: string
  role: LocalizedString
  initials: string
  photo?: SanityImage
  color: string
  items: LocalizedArray
  email?: string
  phone?: string
  order: number
}

export interface Article {
  _id: string
  title: LocalizedString
  slug: {
    current: string
  }
  excerpt: LocalizedText
  category: LocalizedString
  publishedAt: string
  readTime: string
  image: SanityImage
  content: LocalizedPortableText
  featured: boolean
  tags?: string[]
}

export interface Settings {
  _id: string
  siteTitle?: LocalizedString
  siteDescription: LocalizedText
  footerInfo?: {
    slogan?: LocalizedText
    copyright?: LocalizedString
  }
  contactInfo?: {
    address?: string
    email?: string
    phone?: string
  }
  socialMedia?: {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }
  socialLinks?: Array<{
    platform?: string
    url?: string
  }>
  logo?: SanityImage
  favicon?: {
    asset: {
      _id: string
      url: string
    }
  }
}
