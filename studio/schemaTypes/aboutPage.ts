import { defineField, defineType } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Page À Propos (Accueil)',
  // Note: The prompt implies aboutPage is a page. 
  // In `aboutContent.ts` it seems to be an "About Us" section ON the homepage or a separate page? 
  // User Prompt: "Réécris aboutPage.ts".
  // `aboutContent.ts` has `sectionLabel`, `title`, `paragraph1`...
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
      type: 'localeString',
      group: 'content'
    }),
    defineField({
      name: 'title',
      title: 'Titre Principal',
      type: 'localeString',
      group: 'content'
    }),
    defineField({
      name: 'paragraphs',
      title: 'Paragraphes',
      type: 'array',
      group: 'content',
      of: [{ type: 'localeText' }]
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
            defineField({ name: 'title', title: 'Titre', type: 'localeString' }),
            defineField({ name: 'subtitle', title: 'Sous-titre', type: 'localeString' }),
          ]
        }
      ]
    }),
    defineField({
      name: 'cta',
      title: 'Bouton d\'appel à l\'action',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'text', title: 'Texte', type: 'localeString' }),
        defineField({ name: 'link', title: 'Lien', type: 'string' }),
      ]
    }),
    defineField({
      name: 'quote',
      title: 'Citation',
      type: 'localeText',
      group: 'content'
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
