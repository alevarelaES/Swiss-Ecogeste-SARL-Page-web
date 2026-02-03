import { defineField, defineType } from 'sanity'

export const homePage = defineType({
    name: 'homePage',
    title: 'Page d\'Accueil',
    type: 'document',
    groups: [
        { name: 'hero', title: 'Carrousel (Hero)' },
        { name: 'stats', title: 'Statistiques' },
        { name: 'solutions', title: 'Solutions' },
        { name: 'blog', title: 'Blog & Actu' },
        { name: 'partners', title: 'Partenaires' },
        { name: 'seo', title: 'SEO' }
    ],
    fields: [
        // --- HERO SECTION ---
        defineField({
            name: 'heroSlides',
            title: 'Slides du Carrousel',
            type: 'array',
            group: 'hero',
            of: [
                {
                    type: 'object',
                    title: 'Slide',
                    fields: [
                        defineField({ name: 'title', title: 'Titre', type: 'localeString' }),
                        defineField({ name: 'subtitle', title: 'Sous-titre', type: 'localeText' }),
                        defineField({
                            name: 'features',
                            title: 'Points Clés',
                            type: 'array',
                            of: [{ type: 'string' }] // Simple strings for features as per data
                        }),
                        defineField({ name: 'buttonText', title: 'Texte Bouton', type: 'localeString' }),
                        defineField({ name: 'buttonLink', title: 'Lien Bouton', type: 'string' }),
                        defineField({ name: 'image', title: 'Image de fond', type: 'image', options: { hotspot: true } }),
                    ],
                    preview: {
                        select: { title: 'title.fr', media: 'image' }
                    }
                }
            ]
        }),

        // --- STATS SECTION ---
        defineField({
            name: 'statsSection',
            title: 'Section Statistiques',
            type: 'object',
            group: 'stats',
            fields: [
                defineField({
                    name: 'title',
                    title: 'Titre de la section',
                    type: 'localeString'
                }),
                defineField({
                    name: 'items',
                    title: 'Liste des Statistiques (Max 4)',
                    type: 'array',
                    validation: Rule => Rule.max(4),
                    of: [
                        {
                            type: 'object',
                            fields: [
                                defineField({ name: 'value', title: 'Valeur (ex: 20)', type: 'string' }),
                                defineField({ name: 'label', title: 'Libellé', type: 'localeString' }),
                                defineField({ name: 'prefix', title: 'Préfixe (Optionnel)', type: 'string' }),
                                defineField({ name: 'suffix', title: 'Suffixe (Optionnel)', type: 'string' }),
                                defineField({ name: 'icon', title: 'Icône (Lucide Name)', type: 'string' }),
                            ],
                            preview: {
                                select: { title: 'label.fr', subtitle: 'value' },
                                prepare({ title, subtitle }) {
                                    return { title: title || 'Stat', subtitle: subtitle }
                                }
                            }
                        }
                    ]
                }),
            ],
        }),

        // --- SOLUTIONS SECTION ---
        defineField({
            name: 'solutionsSection',
            title: 'Section Nos Solutions',
            type: 'object',
            group: 'solutions',
            fields: [
                defineField({ name: 'label', title: 'Étiquette', type: 'localeString' }),
                defineField({ name: 'title', title: 'Titre', type: 'localeString' }),
                defineField({ name: 'description', title: 'Description', type: 'localeText' }),
                // Assuming solutions are linked to Services or Client Types. 
                // Prompt says "Section Solutions: Ajoute une section pour présenter les solutions".
                // Use a list of references to `clientType` if that's what represents solutions, or just text.
                // Prompt says "liste d'items". Previous impl used clientTypes.
                defineField({
                    name: 'items',
                    title: 'Types de Clients / Solutions',
                    type: 'array',
                    of: [{ type: 'reference', to: [{ type: 'clientType' }] }]
                })
            ],
        }),

        // --- BLOG SECTION ---
        defineField({
            name: 'blogSection',
            title: 'Section Blog',
            type: 'object',
            group: 'blog',
            fields: [
                defineField({ name: 'title', title: 'Titre', type: 'localeString' }),
                defineField({ name: 'viewAllText', title: 'Texte "Voir tout"', type: 'localeString' }),
                defineField({
                    name: 'featuredArticles',
                    title: 'Articles à la une',
                    type: 'array',
                    of: [{ type: 'reference', to: [{ type: 'article' }] }]
                })
            ],
        }),

        // --- PARTNERS SECTION ---
        defineField({
            name: 'partnersSection',
            title: 'Partenaires',
            type: 'object',
            group: 'partners',
            fields: [
                defineField({ name: 'title', title: 'Titre', type: 'localeString' }),
                defineField({
                    name: 'list',
                    title: 'Liste',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                defineField({ name: 'name', title: 'Nom', type: 'string' }),
                                defineField({ name: 'logo', title: 'Logo', type: 'image' }),
                            ]
                        }
                    ]
                }),
            ],
        }),
    ],
    preview: {
        prepare() { return { title: 'Page d\'Accueil' } }
    }
})
