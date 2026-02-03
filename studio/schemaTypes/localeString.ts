import { defineType } from 'sanity'

export const localeString = defineType({
    name: 'localeString',
    title: 'Localized String',
    type: 'object',
    fields: [
        {
            name: 'fr',
            title: 'Français',
            type: 'string',
        },
        {
            name: 'en',
            title: 'English',
            type: 'string',
        },
        {
            name: 'de',
            title: 'Deutsch',
            type: 'string',
        },
    ],
})
