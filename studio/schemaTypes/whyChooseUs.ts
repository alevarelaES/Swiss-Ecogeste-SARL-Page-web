import { defineType, defineField, defineArrayMember } from 'sanity'
import { HeartIcon } from '@sanity/icons'

export const whyChooseUs = defineType({
  name: 'whyChooseUs',
  title: 'Why Choose Us',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Section Label',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
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
      name: 'titleHighlight',
      title: 'Title Highlight',
      type: 'object',
      description: 'Highlighted part of the title',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
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
    }),
    defineField({
      name: 'reasons',
      title: 'Reasons',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Lucide icon name (e.g., "Landmark", "FileText")',
              validation: (rule) => rule.required(),
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
          ],
          preview: {
            select: {
              title: 'title.fr',
              subtitle: 'description.fr',
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1).max(6),
    }),
  ],
  preview: {
    select: {
      title: 'title.fr',
      subtitle: 'description.fr',
    },
  },
})
