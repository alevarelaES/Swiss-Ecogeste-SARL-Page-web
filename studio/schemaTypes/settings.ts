import { defineField, defineType } from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Paramètres & Footer',
  type: 'document',
  groups: [
    { name: 'general', title: 'Général' },
    { name: 'footer', title: 'Pied de Page' },
    { name: 'social', title: 'Réseaux Sociaux' }
  ],
  fields: [
    // --- GENERAL ---
    defineField({
      name: 'siteTitle',
      title: 'Titre du Site',
      type: 'localeString',
      group: 'general'
    }),

    // --- FOOTER INFO ---
    defineField({
      name: 'footerInfo',
      title: 'Contenu du Pied de Page',
      type: 'object',
      group: 'footer',
      fields: [
        defineField({ name: 'logo', title: 'Logo Footer', type: 'image' }),
        defineField({ name: 'slogan', title: 'Slogan / Description', type: 'localeText' }),
        defineField({ name: 'copyright', title: 'Copyright', type: 'localeString' }),
      ]
    }),

    // --- CONTACT ---
    defineField({
      name: 'contactInfo',
      title: 'Coordonnées de Contact',
      type: 'object',
      group: 'footer',
      fields: [
        defineField({ name: 'address', title: 'Adresse', type: 'string' }),
        defineField({ name: 'email', title: 'Email', type: 'string' }),
        defineField({ name: 'phone', title: 'Téléphone', type: 'string' }),
      ]
    }),

    // --- SOCIAL LABELS ---
    defineField({
      name: 'socialLinks',
      title: 'Réseaux Sociaux',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'platform', title: 'Plateforme', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
            defineField({ name: 'icon', title: 'Icône (Lucide)', type: 'string' }),
          ]
        }
      ]
    })
  ],
  preview: {
    prepare() { return { title: 'Paramètres & Footer' } }
  }
})
