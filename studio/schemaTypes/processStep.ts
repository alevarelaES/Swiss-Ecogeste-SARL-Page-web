import { defineField, defineType } from 'sanity'
import { OlistIcon } from '@sanity/icons'

export const processStep = defineType({
  name: 'processStep',
  title: 'Étape du processus',
  type: 'document',
  icon: OlistIcon,
  fields: [
    defineField({
      name: 'stepNumber',
      title: 'Numéro de l\'étape',
      type: 'number',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeString',
    }),
  ],
  preview: {
    select: {
      title: 'title.fr',
      stepNumber: 'stepNumber',
    },
    prepare({ title, stepNumber }) {
      return { title: `${stepNumber}. ${title}` }
    },
  },
  orderings: [
    {
      title: 'Ordre',
      name: 'stepNumberAsc',
      by: [{ field: 'stepNumber', direction: 'asc' }],
    },
  ],
})
