import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Section À Propos (Accueil)',
  type: 'document',
  groups: [
    { name: 'content', title: 'Contenu' },
    { name: 'values', title: 'Valeurs' },
    { name: 'media', title: 'Média' }
  ],
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Label de Section',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ]
    }),
    defineField({
      name: 'title',
      title: 'Titre Principal',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ]
    }),
    defineField({
      name: 'paragraph1',
      title: 'Paragraphe 1 (accroche)',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'fr', type: 'text', title: 'Français' },
        { name: 'en', type: 'text', title: 'English' },
        { name: 'de', type: 'text', title: 'Deutsch' },
      ]
    }),
    defineField({
      name: 'paragraph2',
      title: 'Paragraphe 2 (développement)',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'fr', type: 'text', title: 'Français' },
        { name: 'en', type: 'text', title: 'English' },
        { name: 'de', type: 'text', title: 'Deutsch' },
      ]
    }),
    defineField({
      name: 'values',
      title: 'Valeurs Clés',
      type: 'array',
      group: 'values',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Titre',
              type: 'object',
              fields: [
                { name: 'fr', type: 'string', title: 'Français' },
                { name: 'en', type: 'string', title: 'English' },
                { name: 'de', type: 'string', title: 'Deutsch' },
              ]
            }),
            defineField({
              name: 'subtitle',
              title: 'Sous-titre',
              type: 'object',
              fields: [
                { name: 'fr', type: 'string', title: 'Français' },
                { name: 'en', type: 'string', title: 'English' },
                { name: 'de', type: 'string', title: 'Deutsch' },
              ]
            }),
          ],
          preview: {
            select: { title: 'title.fr', subtitle: 'subtitle.fr' }
          }
        }
      ]
    }),
    defineField({
      name: 'cta',
      title: 'Bouton d\'appel à l\'action',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'text',
          title: 'Texte',
          type: 'object',
          fields: [
            { name: 'fr', type: 'string', title: 'Français' },
            { name: 'en', type: 'string', title: 'English' },
            { name: 'de', type: 'string', title: 'Deutsch' },
          ]
        }),
        defineField({ name: 'link', title: 'Lien', type: 'string' }),
      ]
    }),
    defineField({
      name: 'quote',
      title: 'Citation',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'fr', type: 'text', title: 'Français' },
        { name: 'en', type: 'text', title: 'English' },
        { name: 'de', type: 'text', title: 'Deutsch' },
      ]
    }),
    defineField({
      name: 'quoteAuthor',
      title: 'Auteur de la Citation',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ]
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'media',
      options: { hotspot: true }
    })
  ],
  preview: {
    prepare() { return { title: 'Section À Propos' } }
  }
})
