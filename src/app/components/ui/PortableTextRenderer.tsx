import React from 'react'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { getImageUrl } from '../../sanity/image'

// Configuration des composants Portable Text
const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mt-4 mb-2">{children}</h3>,
    normal: ({ children }) => <p className="mb-4 leading-relaxed text-gray-700">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-gray-600">
        {children}
      </blockquote>
    ),
  },
  
  marks: {
    strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a
          href={value.href}
          rel={rel}
          className="text-primary hover:text-primary/80 underline transition-colors"
          target={value.blank ? '_blank' : undefined}
        >
          {children}
        </a>
      )
    },
  },

  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      
      return (
        <figure className="my-8">
          <img
            src={getImageUrl(value, 1200, 800)}
            alt={value.alt || ''}
            className="rounded-lg w-full"
          />
          {value.caption && (
            <figcaption className="text-sm text-gray-600 mt-2 text-center italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },

  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>,
  },
}

interface PortableTextRendererProps {
  value: any[]
  className?: string
}

export function PortableTextRenderer({ value, className = '' }: PortableTextRendererProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <PortableText value={value} components={portableTextComponents} />
    </div>
  )
}
