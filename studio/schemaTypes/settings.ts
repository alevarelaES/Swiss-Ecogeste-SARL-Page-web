import { defineField, defineType } from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Parametres & Footer',
  type: 'document',
  groups: [
    { name: 'general', title: 'General' },
    { name: 'footer', title: 'Pied de page' },
    { name: 'social', title: 'Reseaux sociaux' },
  ],
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Titre du site',
      type: 'localeString',
      group: 'general',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Description du site',
      type: 'localeText',
      group: 'general',
    }),
    defineField({
      name: 'logo',
      title: 'Logo principal',
      type: 'image',
      group: 'general',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'general',
    }),
    defineField({
      name: 'footerInfo',
      title: 'Contenu du pied de page',
      type: 'object',
      group: 'footer',
      fields: [
        defineField({ name: 'slogan', title: 'Slogan / Description', type: 'localeText' }),
        defineField({ name: 'copyright', title: 'Copyright', type: 'localeString' }),
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Coordonnees de contact',
      type: 'object',
      group: 'footer',
      fields: [
        defineField({ name: 'address', title: 'Adresse', type: 'string' }),
        defineField({ name: 'email', title: 'Email', type: 'string' }),
        defineField({ name: 'phone', title: 'Telephone', type: 'string' }),
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Liens sociaux',
      type: 'object',
      group: 'social',
      fields: [
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'twitter', title: 'X / Twitter', type: 'url' }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Liens sociaux (legacy)',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'platform', title: 'Plateforme', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Parametres & Footer' }
    },
  },
})
