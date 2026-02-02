import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'object',
      fields: [
        defineField({ name: 'fr', title: 'Français', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'en', title: 'English', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'de', title: 'Deutsch', type: 'string', validation: (r) => r.required() }),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.fr',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Résumé',
      type: 'object',
      fields: [
        defineField({
          name: 'fr',
          title: 'Français',
          type: 'text',
          rows: 3,
          validation: (r) => r.required().max(200),
        }),
        defineField({
          name: 'en',
          title: 'English',
          type: 'text',
          rows: 3,
          validation: (r) => r.required().max(200),
        }),
        defineField({
          name: 'de',
          title: 'Deutsch',
          type: 'text',
          rows: 3,
          validation: (r) => r.required().max(200),
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'object',
      fields: [
        defineField({ name: 'fr', title: 'Français', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'en', title: 'English', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'de', title: 'Deutsch', type: 'string', validation: (r) => r.required() }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Temps de lecture',
      type: 'string',
      description: 'Exemple: "5 min", "8 min"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image principale',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
          validation: (rule) => rule.required().warning('Le texte alternatif est important pour le SEO'),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'object',
      fields: [
        defineField({
          name: 'fr',
          title: 'Français',
          type: 'array',
          of: [
            { type: 'block' },
            {
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Texte alternatif',
                },
                {
                  name: 'caption',
                  type: 'string',
                  title: 'Légende',
                },
              ],
            },
          ],
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'en',
          title: 'English',
          type: 'array',
          of: [
            { type: 'block' },
            {
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                },
                {
                  name: 'caption',
                  type: 'string',
                  title: 'Caption',
                },
              ],
            },
          ],
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'de',
          title: 'Deutsch',
          type: 'array',
          of: [
            { type: 'block' },
            {
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternativtext',
                },
                {
                  name: 'caption',
                  type: 'string',
                  title: 'Bildunterschrift',
                },
              ],
            },
          ],
          validation: (r) => r.required(),
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Article en vedette',
      type: 'boolean',
      description: 'Afficher cet article en haut de la liste',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Mots-clés',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
  orderings: [
    {
      title: 'Date de publication, plus récent en premier',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Titre A-Z',
      name: 'titleAsc',
      by: [{ field: 'title.fr', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title.fr',
      subtitle: 'category.fr',
      media: 'image',
      date: 'publishedAt',
    },
    prepare(selection) {
      const { title, subtitle, media, date } = selection
      return {
        title,
        subtitle: `${subtitle} • ${new Date(date).toLocaleDateString('fr-CH')}`,
        media,
      }
    },
  },
})
