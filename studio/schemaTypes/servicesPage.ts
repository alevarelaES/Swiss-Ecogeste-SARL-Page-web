import { defineField, defineType } from 'sanity'

export const servicesPage = defineType({
    name: 'servicesPage',
    title: 'Page Services (Liste)',
    type: 'document',
    groups: [
        { name: 'hero', title: 'Hero' },
        { name: 'list', title: 'Liste des Services' },
        { name: 'seo', title: 'SEO' }
    ],
    fields: [
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'object',
            group: 'seo',
            fields: [
                defineField({ name: 'title', title: 'Titre SEO', type: 'localeString' }),
                defineField({ name: 'description', title: 'Description SEO', type: 'localeText' }),
            ],
        }),
        defineField({
            name: 'hero',
            title: 'Haut de Page',
            type: 'object',
            group: 'hero',
            fields: [
                defineField({ name: 'title', title: 'Titre', type: 'localeString' }),
                defineField({ name: 'description', title: 'Description', type: 'localeText' }),
                defineField({ name: 'image', title: 'Image de fond', type: 'image', options: { hotspot: true } }),
            ]
        }),
        defineField({
            name: 'servicesList',
            title: 'Services affichés',
            type: 'array',
            group: 'list',
            description: 'Sélectionnez et ordonnez les services à afficher sur la page.',
            of: [{ type: 'reference', to: [{ type: 'service' }] }]
        })
    ],
    preview: {
        prepare() { return { title: 'Page Services' } }
    }
})
