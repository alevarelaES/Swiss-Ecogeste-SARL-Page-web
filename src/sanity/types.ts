// Types TypeScript pour les données Sanity

export interface LocalizedString {
  fr: string
  en: string
}

export interface LocalizedText {
  fr: string
  en: string
}

export interface LocalizedArray {
  fr: string[]
  en: string[]
}

export interface LocalizedPortableText {
  fr: any[]
  en: any[]
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
  siteName: LocalizedString
  siteDescription: LocalizedText
  phone: string
  email: string
  address: {
    street: string
    postalCode: string
    city: string
    country: string
  }
  socialMedia: {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }
  businessHours: LocalizedText
  logo?: SanityImage
  favicon?: {
    asset: {
      _id: string
      url: string
    }
  }
}
