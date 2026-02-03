import { defineType } from 'sanity'

export const localeText = defineType({
    name: 'localeText',
    title: 'Localized Text',
    type: 'object',
    fields: [
        {
            name: 'fr',
            title: 'Français',
            type: 'text',
            rows: 3,
        },
        {
            name: 'en',
            title: 'English',
            type: 'text',
            rows: 3,
        },
        {
            name: 'de',
            title: 'Deutsch',
            type: 'text',
            rows: 3,
        },
    ],
})
