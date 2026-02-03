import { defineField, defineType } from 'sanity'

export const teamPage = defineType({
    name: 'teamPage',
    title: 'Page Équipe',
    type: 'document',
    groups: [
        { name: 'hero', title: 'Hero' },
        { name: 'members', title: 'Membres' },
        { name: 'recruitment', title: 'Recrutement' },
        { name: 'seo', title: 'SEO' }
    ],
    fields: [
        // --- SEO ---
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'object',
            group: 'seo',
            fields: [
                defineField({ name: 'title', title: 'Titre SEO', type: 'localeString' }),
                defineField({ name: 'description', title: 'Description SEO', type: 'localeText' }),
            ]
        }),

        // --- HERO ---
        defineField({
            name: 'hero',
            title: 'Haut de Page (Hero)',
            type: 'object',
            group: 'hero',
            fields: [
                defineField({ name: 'label', title: 'Étiquette', type: 'localeString' }),
                defineField({ name: 'title', title: 'Titre', type: 'localeString' }),
                defineField({ name: 'intro', title: 'Introduction', type: 'localeText' }),
                defineField({ name: 'image', title: 'Image de fond', type: 'image', options: { hotspot: true } }),
            ],
        }),

        // --- MEMBERS SECTION ---
        defineField({
            name: 'membersSection',
            title: 'Section Membres',
            type: 'object',
            group: 'members',
            fields: [
                defineField({ name: 'title', title: 'Titre de Section', type: 'localeString' }),
                defineField({ name: 'description', title: 'Description', type: 'localeText' }),
                defineField({
                    name: 'membersList',
                    title: 'Liste des Membres',
                    type: 'array',
                    of: [{ type: 'reference', to: [{ type: 'teamMember' }] }],
                    description: 'Ajoutez et ordonnez les membres de l\'équipe.'
                }),
            ],
        }),

        // --- RECRUITMENT SECTION ---
        defineField({
            name: 'recruitmentSection',
            title: 'Section Recrutement',
            type: 'object',
            group: 'recruitment',
            fields: [
                defineField({ name: 'title', title: 'Titre', type: 'localeString' }),
                defineField({ name: 'text', title: 'Texte', type: 'localeText' }),
                defineField({ name: 'ctaText', title: 'Texte Bouton', type: 'localeString' }),
                defineField({ name: 'ctaLink', title: 'Lien Bouton', type: 'string' }),
                defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            ]
        })
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
