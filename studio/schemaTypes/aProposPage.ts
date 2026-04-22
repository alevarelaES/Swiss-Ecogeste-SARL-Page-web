import { defineField, defineType } from 'sanity'

export const aProposPage = defineType({
  name: 'aProposPage',
  title: 'Page A Propos',
  type: 'document',
  groups: [
    { name: 'hero', title: 'En-tete' },
    { name: 'mission', title: 'Mission & Presence' },
    { name: 'stats', title: 'Chiffres entreprise' },
    { name: 'quality', title: 'Processus qualite' },
    { name: 'photo', title: 'Photo de groupe' },
  ],
  fields: [
    defineField({
      name: 'heroLabel',
      title: 'Badge au-dessus du titre',
      group: 'hero',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Francais' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'heroTitle',
      title: 'Titre H1',
      group: 'hero',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Francais' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'heroIntro',
      title: "Paragraphe d'introduction",
      group: 'hero',
      type: 'object',
      fields: [
        { name: 'fr', type: 'text', title: 'Francais' },
        { name: 'en', type: 'text', title: 'English' },
        { name: 'de', type: 'text', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'missionTitle',
      title: 'Titre Mission',
      group: 'mission',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Francais' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'missionText',
      title: 'Texte Mission (paragraphe 1)',
      group: 'mission',
      type: 'object',
      fields: [
        { name: 'fr', type: 'text', title: 'Francais' },
        { name: 'en', type: 'text', title: 'English' },
        { name: 'de', type: 'text', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'missionText2',
      title: 'Texte Mission (paragraphe 2)',
      group: 'mission',
      type: 'object',
      fields: [
        { name: 'fr', type: 'text', title: 'Francais' },
        { name: 'en', type: 'text', title: 'English' },
        { name: 'de', type: 'text', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'presenceTitle',
      title: 'Titre Presence',
      group: 'mission',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Francais' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'presenceText',
      title: 'Texte Presence geographique',
      group: 'mission',
      type: 'object',
      fields: [
        { name: 'fr', type: 'text', title: 'Francais' },
        { name: 'en', type: 'text', title: 'English' },
        { name: 'de', type: 'text', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'companyStats',
      title: "Chiffres de l'entreprise (4 max)",
      group: 'stats',
      type: 'array',
      validation: (rule) => rule.max(4),
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Valeur (ex: 5, 100%)', type: 'string' }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'object',
              fields: [
                { name: 'fr', type: 'string', title: 'Francais' },
                { name: 'en', type: 'string', title: 'English' },
                { name: 'de', type: 'string', title: 'Deutsch' },
              ],
            }),
          ],
          preview: { select: { title: 'value', subtitle: 'label.fr' } },
        },
      ],
    }),
    defineField({
      name: 'qualityTitle',
      title: 'Titre section Qualite',
      group: 'quality',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Francais' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'qualityText',
      title: 'Description Qualite',
      group: 'quality',
      type: 'object',
      fields: [
        { name: 'fr', type: 'text', title: 'Francais' },
        { name: 'en', type: 'text', title: 'English' },
        { name: 'de', type: 'text', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'qualitySteps',
      title: 'Etapes qualite (badges)',
      description: 'Liste des etapes affichees comme badges (ex: Analyse, Audit, Recommandation...)',
      group: 'quality',
      type: 'object',
      fields: [
        { name: 'fr', type: 'array', title: 'Francais', of: [{ type: 'string' }] },
        { name: 'en', type: 'array', title: 'English', of: [{ type: 'string' }] },
        { name: 'de', type: 'array', title: 'Deutsch', of: [{ type: 'string' }] },
      ],
    }),
    defineField({
      name: 'groupPhoto',
      title: "Photo de groupe de l'equipe",
      group: 'photo',
      type: 'image',
      description: 'Photo affichee au-dessus de la section Equipe',
      options: { hotspot: true },
    }),
    defineField({
      name: 'photoTitle',
      title: 'Titre sur la photo',
      group: 'photo',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Francais' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'photoSubtitle',
      title: 'Sous-titre sur la photo',
      group: 'photo',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Francais' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Page A Propos' }
    },
  },
})
