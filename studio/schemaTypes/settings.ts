import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const settings = defineType({
  name: 'settings',
  title: 'Paramètres du site',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre du document',
      type: 'string',
      description: 'Ce champ est utilisé uniquement pour identifier le document dans Sanity Studio',
      initialValue: 'Paramètres du site',
      readOnly: true,
    }),
    defineField({
      name: 'siteName',
      title: 'Nom du site',
      type: 'object',
      fields: [
        defineField({ name: 'fr', title: 'Français', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'en', title: 'English', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'de', title: 'Deutsch', type: 'string', validation: (r) => r.required() }),
      ],
    }),
    defineField({
      name: 'siteDescription',
      title: 'Description du site',
      type: 'object',
      fields: [
        defineField({ name: 'fr', title: 'Français', type: 'text', validation: (r) => r.required() }),
        defineField({ name: 'en', title: 'English', type: 'text', validation: (r) => r.required() }),
        defineField({ name: 'de', title: 'Deutsch', type: 'text', validation: (r) => r.required() }),
      ],
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'object',
      fields: [
        defineField({
          name: 'street',
          title: 'Rue',
          type: 'string',
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'postalCode',
          title: 'Code postal',
          type: 'string',
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'city',
          title: 'Ville',
          type: 'string',
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'country',
          title: 'Pays',
          type: 'string',
          validation: (r) => r.required(),
        }),
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Réseaux sociaux',
      type: 'object',
      fields: [
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
          description: 'URL complète du profil LinkedIn',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter / X',
          type: 'url',
          description: 'URL complète du profil Twitter/X',
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
          description: 'URL complète de la page Facebook',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
          description: 'URL complète du profil Instagram',
        }),
      ],
    }),
    defineField({
      name: 'businessHours',
      title: 'Horaires d\'ouverture',
      type: 'object',
      fields: [
        defineField({
          name: 'fr',
          title: 'Français',
          type: 'text',
          rows: 3,
          description: 'Exemple: Lun-Ven: 8h00-17h00',
        }),
        defineField({
          name: 'en',
          title: 'English',
          type: 'text',
          rows: 3,
          description: 'Example: Mon-Fri: 8am-5pm',
        }),
        defineField({
          name: 'de',
          title: 'Deutsch',
          type: 'text',
          rows: 3,
          description: 'Beispiel: Mo-Fr: 8:00-17:00',
        }),
      ],
    }),
    defineField({
      name: 'logo',
      title: 'Logo du site',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
        }),
      ],
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Icône qui apparaît dans l\'onglet du navigateur (recommandé: 32x32px ou 64x64px)',
    }),
  ],
  preview: {
    select: {
      title: 'siteName.fr',
      subtitle: 'email',
    },
  },
})
