import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper pour obtenir une URL d'image optimisée
export function getImageUrl(source: any, width = 800, height?: number) {
  if (!source?.asset) return ''
  
  const imageBuilder = urlFor(source).width(width)
  
  if (height) {
    imageBuilder.height(height)
  }
  
  return imageBuilder.url()
}
