import { defineField, defineType } from 'sanity'

export const homePage = defineType({
    name: 'homePage',
    title: 'Page d\'Accueil',
    type: 'document',
    fields: [
        // --- SECTION: HERO ---
        defineField({
            name: 'heroSection',
            title: 'Haut de Page (Carrousel)',
            type: 'object',
            description: 'Géré via la liste séparée "Hero Slides" pour plus de flexibilité, ou peut être intégré ici si demandé.',
            fields: [
                defineField({
                    name: 'note',
                    type: 'string',
                    title: 'Note',
                    readOnly: true,
                    initialValue: 'Le carrousel est géré via la collection "Hero Slides" dans le menu principal.'
                })
            ]
        }),

        // --- SECTION: STATS ---
        defineField({
            name: 'statsSection',
            title: 'Section Statistiques',
            type: 'object',
            fields: [
                defineField({
                    name: 'items',
                    title: 'Liste des Statistiques',
                    type: 'array',
                    validation: Rule => Rule.max(4),
                    of: [
                        {
                            type: 'object',
                            name: 'statItem',
                            title: 'Statistique',
                            fields: [
                                defineField({
                                    name: 'value',
                                    title: 'Valeur (ex: 20)',
                                    type: 'string',
                                }),
                                defineField({
                                    name: 'label',
                                    title: 'Libellé (ex: Années d\'expérience)',
                                    type: 'localeString',
                                }),
                                defineField({
                                    name: 'suffix',
                                    title: 'Suffixe (ex: +)',
                                    type: 'string',
                                }),
                            ],
                            preview: {
                                select: {
                                    title: 'label.fr',
                                    subtitle: 'value'
                                },
                                prepare({ title, subtitle }) {
                                    return {
                                        title: title || 'Statistique',
                                        subtitle: subtitle
                                    }
                                }
                            }
                        }
                    ]
                }),
            ],
        }),

        // --- SECTION: SOLUTIONS ---
        defineField({
            name: 'solutionsSection',
            title: 'Section Nos Solutions',
            type: 'object',
            fields: [
                defineField({
                    name: 'label',
                    title: 'Étiquette',
                    type: 'localeString',
                }),
                defineField({
                    name: 'title',
                    title: 'Titre Principal',
                    type: 'localeString',
                }),
                defineField({
                    name: 'description',
                    title: 'Description',
                    type: 'localeText',
                }),
                defineField({
                    name: 'solutionsList',
                    title: 'Liste des Solutions',
                    type: 'array',
                    of: [{ type: 'reference', to: [{ type: 'clientType' }] }]
                })
            ],
        }),

        // --- SECTION: BLOG ---
        defineField({
            name: 'blogSection',
            title: 'Section Actualités & Blog',
            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    title: 'Titre de la section',
                    type: 'localeString',
                }),
                defineField({
                    name: 'viewAllText',
                    title: 'Texte Bouton "Voir tout"',
                    type: 'localeString',
                }),
                defineField({
                    name: 'featuredArticles',
                    title: 'Articles à la une (Optionnel)',
                    description: 'Si vide, affichera les derniers articles automatiquement.',
                    type: 'array',
                    of: [{ type: 'reference', to: [{ type: 'article' }] }]
                })
            ],
        }),

        // --- SECTION: PARTENAIRES ---
        defineField({
            name: 'partnersSection',
            title: 'Section Partenaires',
            type: 'object',
            fields: [
                defineField({
                    name: 'title',
                    title: 'Titre de la section',
                    type: 'localeString',
                }),
                defineField({
                    name: 'list',
                    title: 'Logos Partenaires',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            name: 'partner',
                            title: 'Partenaire',
                            fields: [
                                defineField({ name: 'name', title: 'Nom', type: 'string' }),
                                defineField({ name: 'logo', title: 'Logo', type: 'image' }),
                            ],
                            preview: {
                                select: {
                                    title: 'name',
                                    media: 'logo'
                                }
                            }
                        },
                    ],
                }),
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Contenu Page d\'Accueil'
            }
        }
    }
})
