import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'object',
      fields: [
        { name: 'fr', type: 'text', title: 'Français' },
        { name: 'en', type: 'text', title: 'English' },
        { name: 'de', type: 'text', title: 'Deutsch' },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'object',
      fields: [
        {
          name: 'fr',
          type: 'array',
          title: 'Français',
          of: [{ type: 'string' }],
        },
        {
          name: 'en',
          type: 'array',
          title: 'English',
          of: [{ type: 'string' }],
        },
        {
          name: 'de',
          type: 'array',
          title: 'Deutsch',
          of: [{ type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      description: 'Internal path (e.g., /services/villa)',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order of the slide',
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title.fr',
      subtitle: 'subtitle.fr',
      media: 'image',
    },
  },
})
