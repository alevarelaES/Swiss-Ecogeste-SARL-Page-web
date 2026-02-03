import { defineField, defineType } from 'sanity'

export const footer = defineType({
    name: 'footer',
    title: 'Pied de Page (Footer)',
    type: 'document',
    fields: [
        defineField({
            name: 'companyInfo',
            title: 'Informations Entreprise',
            type: 'object',
            fields: [
                defineField({ name: 'logo', title: 'Logo Footer', type: 'image' }),
                defineField({ name: 'description', title: 'Description / Slogan', type: 'localeText' }),
            ]
        }),
        defineField({
            name: 'contactDetails',
            title: 'Coordonnées',
            type: 'object',
            fields: [
                defineField({ name: 'address', title: 'Adresse', type: 'string' }),
                defineField({ name: 'phone', title: 'Téléphone', type: 'string' }),
                defineField({ name: 'email', title: 'Email', type: 'string' }),
            ]
        }),
        defineField({
            name: 'socialLinks',
            title: 'Réseaux Sociaux',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'platform', title: 'Plateforme', type: 'string' }),
                        defineField({ name: 'url', title: 'Lien', type: 'url' }),
                    ]
                }
            ]
        }),
        defineField({
            name: 'copyright',
            title: 'Texte Copyright',
            type: 'localeString',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Pied de Page'
            }
        }
    }
})
