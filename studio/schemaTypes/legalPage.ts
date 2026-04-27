import { defineField, defineType } from 'sanity'

const legalSection = {
  type: 'object' as const,
  name: 'legalSection',
  title: 'Section',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la section',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Contenu (paragraphes)',
      type: 'object',
      description: 'Chaque entrée = un paragraphe',
      fields: [
        { name: 'fr', type: 'array', title: 'Français', of: [{ type: 'text' }] },
        { name: 'en', type: 'array', title: 'English', of: [{ type: 'text' }] },
        { name: 'de', type: 'array', title: 'Deutsch', of: [{ type: 'text' }] },
      ],
    }),
  ],
  preview: {
    select: { title: 'title.fr' },
    prepare({ title }: { title?: string }) {
      return { title: title || 'Section sans titre' }
    },
  },
}

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Page Légale',
  type: 'document',
  fields: [
    defineField({
      name: 'pageType',
      title: 'Type de page',
      type: 'string',
      options: {
        list: [
          { title: 'Mentions Légales', value: 'mentions-legales' },
          { title: 'Confidentialité', value: 'confidentialite' },
          { title: 'Politique des Cookies', value: 'cookies' },
        ],
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
          ],
        }),
        defineField({
          name: 'description',
          title: 'Description SEO',
          type: 'object',
          fields: [
            { name: 'fr', type: 'text', title: 'Français' },
            { name: 'en', type: 'text', title: 'English' },
            { name: 'de', type: 'text', title: 'Deutsch' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'title',
      title: 'Titre de la page (H1)',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Français', validation: (r) => r.required() },
        { name: 'en', type: 'string', title: 'English', validation: (r) => r.required() },
        { name: 'de', type: 'string', title: 'Deutsch', validation: (r) => r.required() },
      ],
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Date de dernière mise à jour',
      type: 'date',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [legalSection],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'title.fr', type: 'pageType' },
    prepare({ title, type }: { title?: string; type?: string }) {
      const labels: Record<string, string> = {
        'mentions-legales': 'Mentions Légales',
        'confidentialite': 'Confidentialité',
        'cookies': 'Cookies',
      }
      return { title: title || labels[type ?? ''] || 'Page Légale' }
    },
  },
})
