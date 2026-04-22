import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'isMain',
      title: 'Slide Principal',
      type: 'boolean',
      description: 'Activer si c\'est la slide principale (avec description complète et second bouton)',
      initialValue: false,
    }),
    defineField({
      name: 'label',
      title: 'Onglet Navigation',
      type: 'object',
      description: 'Texte affiché dans l\'onglet de navigation en bas du hero',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'object',
      fields: [
        { name: 'fr', type: 'text', title: 'Français' },
        { name: 'en', type: 'text', title: 'English' },
        { name: 'de', type: 'text', title: 'Deutsch' },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (slide principal uniquement)',
      type: 'object',
      description: 'Paragraphe supplémentaire visible uniquement sur la slide principale',
      fields: [
        { name: 'fr', type: 'text', title: 'Français' },
        { name: 'en', type: 'text', title: 'English' },
        { name: 'de', type: 'text', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'featuresLabel',
      title: 'Label des points clés',
      type: 'object',
      description: 'Texte italique au-dessus de la liste de points clés',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Points Clés',
      type: 'object',
      fields: [
        {
          name: 'fr',
          type: 'array',
          title: 'Français',
          of: [{ type: 'string' }],
        },
        {
          name: 'en',
          type: 'array',
          title: 'English',
          of: [{ type: 'string' }],
        },
        {
          name: 'de',
          type: 'array',
          title: 'Deutsch',
          of: [{ type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'buttonText',
      title: 'Texte Bouton Principal',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'buttonLink',
      title: 'Lien Bouton Principal',
      type: 'string',
      description: 'Chemin interne (ex: /services/villa)',
    }),
    defineField({
      name: 'secondButtonText',
      title: 'Texte Second Bouton',
      type: 'object',
      description: 'Bouton secondaire (slide principale uniquement)',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'secondButtonLink',
      title: 'Lien Second Bouton',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image de Fond',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Position dans le carrousel (1 = premier)',
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title.fr',
      subtitle: 'label.fr',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Slide sans titre',
        subtitle: subtitle ? `Onglet: ${subtitle}` : '',
        media,
      }
    },
  },
})
