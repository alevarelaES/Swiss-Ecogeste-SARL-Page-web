import { createImageUrlBuilder as imageUrlBuilder } from '@sanity/image-url'
import { client } from './client'
import type { SanityImage } from './types'

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImage) {
  return builder.image(source)
}

export function getImageUrl(source: SanityImage | undefined, width = 800, height?: number) {
  if (!source?.asset) return ''
  const b = urlFor(source).width(width)
  return (height ? b.height(height) : b).url()
}

/** 600×600 square crop biased toward the upper quarter — optimised for portrait headshots. */
export function getTeamMemberImageUrl(source: SanityImage): string {
  if (!source?.asset) return ''
  return urlFor(source)
    .width(600)
    .height(600)
    .fit('crop')
    .crop('focalpoint')
    .focalPoint(0.5, 0.25)
    .auto('format')
    .quality(85)
    .url()
}
