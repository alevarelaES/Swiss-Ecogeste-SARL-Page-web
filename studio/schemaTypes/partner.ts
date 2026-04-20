import { defineField, defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export const partner = defineType({
  name: 'partner',
  title: 'Partenaire',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du partenaire',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: false },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Lien vers le site partenaire',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
