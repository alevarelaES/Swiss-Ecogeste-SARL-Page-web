import { defineField, defineType } from 'sanity'
import { PlugIcon } from '@sanity/icons'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: PlugIcon,
  fields: [
    // --- LISTE / CARTE ---
    defineField({
      name: 'cardInfo',
      title: 'Info Carte (Liste des Services)',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Titre court',
          type: 'localeString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Résumé',
          type: 'localeText',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'icon',
          title: 'Icône (Lucide)',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: { source: 'cardInfo.title.fr' },
          validation: (rule) => rule.required(),
        }),
      ]
    }),

    // --- PAGE DETAIL ---
    defineField({
      name: 'detailPage',
      title: 'Contenu Page Détail',
      type: 'object',
      fields: [
        defineField({
          name: 'heroImage',
          title: 'Image Principale (Hero)',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'fullDescription',
          title: 'Description Complète',
          type: 'localeText',
        }),
        defineField({
          name: 'benefits',
          title: 'Bénéfices / Points Clés',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({ name: 'title', title: 'Titre', type: 'localeString' }),
                defineField({ name: 'description', title: 'Description', type: 'localeText' }),
              ],
              preview: {
                select: { title: 'title.fr' },
                prepare({ title }) { return { title: title || 'Point clé' } }
              }
            }
          ]
        }),
        defineField({
          name: 'ctaText',
          title: 'Texte Bouton Action',
          type: 'localeString'
        })
      ],
    }),
  ],
  preview: {
    select: {
      title: 'cardInfo.title.fr',
      subtitle: 'cardInfo.description.fr',
      media: 'detailPage.heroImage'
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Service sans titre',
        subtitle: subtitle,
        media: media
      }
    },
  },
})
