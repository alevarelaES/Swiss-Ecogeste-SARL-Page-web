import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Identifiant unique du service (gerance, villa, entreprise, commune)',
    }),
    defineField({
      name: 'number',
      title: 'Numéro',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Numéro d\'affichage (01, 02, 03, etc.)',
    }),
    defineField({
      name: 'icon',
      title: 'Nom de l\'icône',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Nom de l\'icône Lucide (ex: Calculator, Home, Building, Flame)',
    }),
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
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'object',
      fields: [
        defineField({ name: 'fr', title: 'Français', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'en', title: 'English', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'de', title: 'Deutsch', type: 'string', validation: (r) => r.required() }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'object',
      fields: [
        defineField({ name: 'fr', title: 'Français', type: 'text', validation: (r) => r.required() }),
        defineField({ name: 'en', title: 'English', type: 'text', validation: (r) => r.required() }),
        defineField({ name: 'de', title: 'Deutsch', type: 'text', validation: (r) => r.required() }),
      ],
    }),
    defineField({
      name: 'fullDescription',
      title: 'Description complète',
      type: 'object',
      fields: [
        defineField({
          name: 'fr',
          title: 'Français',
          type: 'array',
          of: [{ type: 'block' }],
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'en',
          title: 'English',
          type: 'array',
          of: [{ type: 'block' }],
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'de',
          title: 'Deutsch',
          type: 'array',
          of: [{ type: 'block' }],
          validation: (r) => r.required(),
        }),
      ],
    }),
    defineField({
      name: 'features',
      title: 'Fonctionnalités',
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
      name: 'image',
      title: 'Image',
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
      name: 'link',
      title: 'Lien de la page',
      type: 'string',
      description: 'URL de la page dédiée (ex: /services/gerance)',
    }),
    defineField({
      name: 'delay',
      title: 'Délai d\'animation',
      type: 'number',
      description: 'Délai pour l\'animation d\'apparition (0.1, 0.2, etc.)',
      initialValue: 0.1,
    }),
  ],
  preview: {
    select: {
      title: 'title.fr',
      subtitle: 'subtitle.fr',
      media: 'image',
    },
  },
})
