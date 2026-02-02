import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const pageContent = defineType({
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'Villa', value: 'villa' },
          { title: 'Entreprise', value: 'entreprise' },
          { title: 'Gérance', value: 'gerance' },
          { title: 'Communes', value: 'communes' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'SEO Title',
          type: 'object',
          fields: [
            { name: 'fr', type: 'string', title: 'Français' },
            { name: 'en', type: 'string', title: 'English' },
            { name: 'de', type: 'string', title: 'Deutsch' },
          ],
        }),
        defineField({
          name: 'description',
          title: 'SEO Description',
          type: 'object',
          fields: [
            { name: 'fr', type: 'text', title: 'Français' },
            { name: 'en', type: 'text', title: 'English' },
            { name: 'de', type: 'text', title: 'Deutsch' },
          ],
        }),
        defineField({
          name: 'canonical',
          title: 'Canonical URL',
          type: 'string',
          description: 'e.g., /services/villa',
        }),
      ],
    }),
    defineField({
      name: 'backLink',
      title: 'Back Link Text',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
    }),
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
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      description: 'Internal path (e.g., /contact)',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
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
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
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
          ],
          preview: {
            select: {
              title: 'title.fr',
              subtitle: 'description.fr',
              media: 'image',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title.fr',
      pageType: 'pageType',
    },
    prepare({ title, pageType }) {
      return {
        title: title || 'Page Content',
        subtitle: pageType ? pageType.charAt(0).toUpperCase() + pageType.slice(1) : 'No page type',
      }
    },
  },
})
