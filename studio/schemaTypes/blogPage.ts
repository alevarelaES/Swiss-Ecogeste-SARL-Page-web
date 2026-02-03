import { defineField, defineType } from 'sanity'

export const blogPage = defineType({
    name: 'blogPage',
    title: 'Page Conseils (Blog)',
    type: 'document',
    fields: [
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    title: 'Titre SEO',
                    type: 'localeString',
                }),
                defineField({
                    name: 'description',
                    title: 'Description SEO',
                    type: 'localeText',
                }),
            ],
        }),
        defineField({
            name: 'hero',
            title: 'Haut de Page (Hero)',
            type: 'object',
            fields: [
                defineField({
                    name: 'h1',
                    title: 'Titre H1',
                    type: 'localeString',
                }),
                defineField({
                    name: 'intro',
                    title: 'Introduction',
                    type: 'localeText',
                }),
                defineField({
                    name: 'bannerImage',
                    title: 'Image de Bannière',
                    type: 'image',
                    options: { hotspot: true }
                }),
            ],
        }),
        defineField({
            name: 'categories',
            title: 'Catégories',
            description: 'Liste des catégories affichées pour le filtrage',
            type: 'array',
            of: [{ type: 'string' }], // Keeping it simple as strings for now, or could be references if complex
            options: {
                layout: 'tags'
            }
        })
    ],
    preview: {
        select: {
            title: 'hero.h1.fr',
        },
        prepare({ title }) {
            return {
                title: title || 'Page Blog'
            }
        }
    }
})
