import { defineField, defineType } from 'sanity'

export const servicePage = defineType({
  name: 'servicePage',
  title: 'Page Service',
  type: 'document',
  fields: [
    defineField({
      name: 'pageSlug',
      title: 'Identifiant de page',
      type: 'string',
      description: 'Identifie quelle page de service c\'est',
      options: {
        list: [
          { title: 'Villas & Maisons', value: 'villa' },
          { title: 'Régies & Immeubles', value: 'gerance' },
          { title: 'Entreprises', value: 'entreprise' },
          { title: 'Communes & GRD', value: 'communes' },
        ]
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
          title: 'Titre SEO',
          type: 'object',
          fields: [
            { name: 'fr', type: 'string', title: 'Français' },
            { name: 'en', type: 'string', title: 'English' },
            { name: 'de', type: 'string', title: 'Deutsch' },
          ]
        }),
        defineField({
          name: 'description',
          title: 'Description SEO',
          type: 'object',
          fields: [
            { name: 'fr', type: 'text', title: 'Français' },
            { name: 'en', type: 'text', title: 'English' },
            { name: 'de', type: 'text', title: 'Deutsch' },
          ]
        }),
        defineField({
          name: 'canonical',
          title: 'URL Canonique',
          type: 'string',
          description: 'Ex: /services/villa',
        }),
      ]
    }),
    defineField({
      name: 'sectionLabel',
      title: 'Label Section (H1)',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ]
    }),
    defineField({
      name: 'title',
      title: 'Sous-titre (sous le H1)',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ]
    }),
    defineField({
      name: 'description',
      title: 'Description intro',
      type: 'object',
      fields: [
        { name: 'fr', type: 'text', title: 'Français' },
        { name: 'en', type: 'text', title: 'English' },
        { name: 'de', type: 'text', title: 'Deutsch' },
      ]
    }),
    defineField({
      name: 'heroImage',
      title: 'Image Hero',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'buttonText',
      title: 'Texte du bouton CTA',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ]
    }),
    defineField({
      name: 'buttonLink',
      title: 'Lien du bouton CTA',
      type: 'string',
    }),
    defineField({
      name: 'backLink',
      title: 'Texte lien Retour',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ]
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Service',
          fields: [
            defineField({
              name: 'title',
              title: 'Titre du service',
              type: 'object',
              fields: [
                { name: 'fr', type: 'string', title: 'Français' },
                { name: 'en', type: 'string', title: 'English' },
                { name: 'de', type: 'string', title: 'Deutsch' },
              ]
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'object',
              fields: [
                { name: 'fr', type: 'text', title: 'Français' },
                { name: 'en', type: 'text', title: 'English' },
                { name: 'de', type: 'text', title: 'Deutsch' },
              ]
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true }
            }),
            defineField({
              name: 'features',
              title: 'Points clés',
              type: 'object',
              fields: [
                { name: 'fr', type: 'array', title: 'Français', of: [{ type: 'string' }] },
                { name: 'en', type: 'array', title: 'English', of: [{ type: 'string' }] },
                { name: 'de', type: 'array', title: 'Deutsch', of: [{ type: 'string' }] },
              ]
            }),
            defineField({
              name: 'note',
              title: 'Note (ex: * Sous conditions)',
              type: 'object',
              fields: [
                { name: 'fr', type: 'string', title: 'Français' },
                { name: 'en', type: 'string', title: 'English' },
                { name: 'de', type: 'string', title: 'Deutsch' },
              ]
            }),
          ],
          preview: {
            select: { title: 'title.fr' },
            prepare({ title }) { return { title: title || 'Service sans titre' } }
          }
        }
      ]
    }),
  ],
  preview: {
    select: { title: 'pageSlug' },
    prepare({ title }) { return { title: `Page Service: ${title}` } }
  }
})
