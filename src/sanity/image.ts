import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'
import type { SanityImage } from './types'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImage) {
  return builder.image(source)
}

// Helper pour obtenir une URL d'image optimisee
export function getImageUrl(source: SanityImage | undefined, width = 800, height?: number) {
  if (!source?.asset) return ''

  const imageBuilder = urlFor(source).width(width)

  if (height) {
    imageBuilder.height(height)
  }

  return imageBuilder.url()
}
