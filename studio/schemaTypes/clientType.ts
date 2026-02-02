import { defineType, defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons'

export const clientType = defineType({
  name: 'clientType',
  title: 'Client Type',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'string',
      description: 'Unique identifier (e.g., "villas", "regies")',
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug) return 'Required'
          if (!/^[a-z0-9-]+$/.test(slug)) {
            return 'Slug must be lowercase with hyphens only'
          }
          return true
        }),
    }),
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
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'fr', type: 'text', title: 'Français' },
        { name: 'en', type: 'text', title: 'English' },
        { name: 'de', type: 'text', title: 'Deutsch' },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
      description: 'Internal path (e.g., /services/villa)',
      validation: (rule) => rule.required(),
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
