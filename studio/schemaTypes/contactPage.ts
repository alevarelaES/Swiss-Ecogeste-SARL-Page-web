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
                defineField({
                    name: 'youAreLabel',
                    title: 'Label "Vous êtes"',
                    type: 'localeString',
                }),
                defineField({
                    name: 'typeVilla',
                    title: 'Type : Villa',
                    type: 'localeString',
                }),
                defineField({
                    name: 'typeEntreprise',
                    title: 'Type : Entreprise',
                    type: 'localeString',
                }),
                defineField({
                    name: 'typeRegie',
                    title: 'Type : Gérance/Régie',
                    type: 'localeString',
                }),
                defineField({
                    name: 'typeProprio',
                    title: 'Type : Propriétaire',
                    type: 'localeString',
                }),
                defineField({
                    name: 'typeOther',
                    title: 'Type : Autre',
                    type: 'localeString',
                }),
                defineField({
                    name: 'nameLabel',
                    title: 'Label champ Nom',
                    type: 'localeString',
                }),
                defineField({
                    name: 'emailLabel',
                    title: 'Label champ Email',
                    type: 'localeString',
                }),
                defineField({
                    name: 'phoneLabel',
                    title: 'Label champ Téléphone',
                    type: 'localeString',
                }),
                defineField({
                    name: 'messageLabel',
                    title: 'Label champ Message',
                    type: 'localeString',
                }),
                defineField({
                    name: 'messagePlaceholder',
                    title: 'Placeholder Message',
                    type: 'localeString',
                }),
                defineField({
                    name: 'submitButton',
                    title: 'Bouton Envoyer',
                    type: 'localeString',
                }),
                defineField({
                    name: 'sendingButton',
                    title: 'Bouton Envoi en cours',
                    type: 'localeString',
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
