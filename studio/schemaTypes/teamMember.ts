import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Membre de l\'équipe',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nom complet',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rôle',
      type: 'object',
      fields: [
        defineField({ name: 'fr', title: 'Français', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'en', title: 'English', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'de', title: 'Deutsch', type: 'string', validation: (r) => r.required() }),
      ],
    }),
    defineField({
      name: 'initials',
      title: 'Initiales',
      type: 'string',
      validation: (rule) => rule.required().max(3),
      description: 'Initiales pour l\'avatar (ex: MS, RA, TC)',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
          validation: (rule) => rule.required(),
        }),
      ],
      description: 'Photo du membre de l\'équipe (optionnel, sinon les initiales seront affichées)',
    }),
    defineField({
      name: 'color',
      title: 'Couleur du gradient',
      type: 'string',
      description: 'Classes Tailwind pour le gradient (ex: from-[var(--primary)] to-emerald-600)',
      initialValue: 'from-[var(--primary)] to-emerald-600',
    }),
    defineField({
      name: 'items',
      title: 'Compétences / Certifications',
      type: 'object',
      fields: [
        defineField({
          name: 'fr',
          title: 'Français',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (r) => r.required().min(1),
        }),
        defineField({
          name: 'en',
          title: 'English',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (r) => r.required().min(1),
        }),
        defineField({
          name: 'de',
          title: 'Deutsch',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (r) => r.required().min(1),
        }),
      ],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.email(),
      description: 'Email professionnel (optionnel)',
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
      description: 'Numéro de téléphone (optionnel)',
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Ordre d\'affichage dans la liste (1, 2, 3, etc.)',
      initialValue: 1,
    }),
  ],
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role.fr',
      media: 'photo',
    },
  },
})
