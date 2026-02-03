import { defineField, defineType } from 'sanity'

export const teamPage = defineType({
    name: 'teamPage',
    title: 'Page Équipe',
    type: 'document',
    fields: [
        defineField({
            name: 'hero',
            title: 'Haut de Page (Hero)',
            type: 'object',
            fields: [
                defineField({
                    name: 'label',
                    title: 'Étiquette (Petit titre)',
                    type: 'localeString',
                }),
                defineField({
                    name: 'title',
                    title: 'Titre Principal',
                    type: 'localeString',
                }),
                defineField({
                    name: 'intro',
                    title: 'Texte d\'Introduction',
                    type: 'localeText',
                }),
            ],
        }),
        defineField({
            name: 'values',
            title: 'Section Nos Valeurs',
            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    title: 'Titre de la Section',
                    type: 'localeString',
                }),
                defineField({
                    name: 'intro',
                    title: 'Introduction des Valeurs',
                    type: 'localeText',
                }),
                defineField({
                    name: 'list',
                    title: 'Liste des Valeurs',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                defineField({
                                    name: 'icon',
                                    title: 'Nom de l\'icône (Lucide)',
                                    type: 'string',
                                }),
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
                            preview: {
                                select: {
                                    title: 'title.fr',
                                    subtitle: 'description.fr',
                                    icon: 'icon',
                                },
                                prepare({ title, subtitle, icon }) {
                                    return {
                                        title: title || 'Valeur sans titre',
                                        subtitle: subtitle,
                                        media: icon // Using icon string might not show image, but text is fine
                                    }
                                }
                            }
                        },
                    ],
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
                title: title || 'Page Équipe',
            }
        }
    }
})
