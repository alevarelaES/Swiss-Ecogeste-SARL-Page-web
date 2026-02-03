import { defineField, defineType } from 'sanity'

export const contactPage = defineType({
    name: 'contactPage',
    title: 'Page Contact',
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
                    name: 'title',
                    title: 'Titre',
                    type: 'localeString',
                }),
                defineField({
                    name: 'description',
                    title: 'Description',
                    type: 'localeText',
                }),
            ],
        }),
        defineField({
            name: 'formSection',
            title: 'Section Formulaire',
            type: 'object',
            fields: [
                defineField({
                    name: 'tag',
                    title: 'Étiquette (Tag)',
                    type: 'localeString',
                }),
                defineField({
                    name: 'title',
                    title: 'Titre',
                    type: 'localeString',
                }),
                defineField({
                    name: 'subtitle',
                    title: 'Sous-titre',
                    type: 'localeText',
                }),
                defineField({
                    name: 'image',
                    title: 'Image Latérale',
                    type: 'image',
                    options: { hotspot: true },
                }),
                defineField({
                    name: 'quote',
                    title: 'Citation',
                    type: 'localeText',
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'hero.title.fr',
        },
        prepare({ title }) {
            return {
                title: title || 'Page Contact',
            }
        }
    }
})
