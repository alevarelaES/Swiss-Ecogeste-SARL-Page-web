import { defineField, defineType } from 'sanity'

// Ce document contient uniquement les textes d'introduction des sections de l'accueil.
// Les slides Hero, les stats, les solutions, les partenaires sont gérés
// dans leurs propres collections (Hero Slides, Statistiques, etc.).

export const homePage = defineType({
  name: 'homePage',
  title: "Page d'Accueil — Textes des sections",
  type: 'document',
  groups: [
    { name: 'stats', title: 'Section Statistiques' },
    { name: 'solutions', title: 'Section Solutions' },
    { name: 'partners', title: 'Section Partenaires' },
  ],
  fields: [
    // --- SECTION STATISTIQUES (en-tête uniquement) ---
    // Les chiffres eux-mêmes sont dans la collection "Statistiques Chiffres Clés"
    defineField({
      name: 'statsSection',
      title: 'En-tête de la section Statistiques',
      description: 'Les chiffres sont gérés dans "Statistiques Chiffres Clés"',
      type: 'object',
      group: 'stats',
      fields: [
        defineField({
          name: 'label',
          title: 'Étiquette (ex: Chiffres Clés)',
          type: 'object',
          fields: [
            { name: 'fr', type: 'string', title: 'Français' },
            { name: 'en', type: 'string', title: 'English' },
            { name: 'de', type: 'string', title: 'Deutsch' },
          ],
        }),
        defineField({
          name: 'title',
          title: 'Titre de la section',
          type: 'object',
          fields: [
            { name: 'fr', type: 'string', title: 'Français' },
            { name: 'en', type: 'string', title: 'English' },
            { name: 'de', type: 'string', title: 'Deutsch' },
          ],
        }),
        defineField({
          name: 'description',
          title: 'Description (texte à droite du titre)',
          type: 'object',
          fields: [
            { name: 'fr', type: 'text', title: 'Français' },
            { name: 'en', type: 'text', title: 'English' },
            { name: 'de', type: 'text', title: 'Deutsch' },
          ],
        }),
      ],
    }),

    // --- SECTION SOLUTIONS (en-tête uniquement) ---
    // Les cartes sont gérées dans la collection "Types de Clients / Solutions"
    defineField({
      name: 'solutionsSection',
      title: 'En-tête de la section Solutions',
      description: 'Les cartes solutions sont gérées dans "Types de Clients / Solutions"',
      type: 'object',
      group: 'solutions',
      fields: [
        defineField({
          name: 'label',
          title: 'Étiquette (ex: Nos Solutions)',
          type: 'object',
          fields: [
            { name: 'fr', type: 'string', title: 'Français' },
            { name: 'en', type: 'string', title: 'English' },
            { name: 'de', type: 'string', title: 'Deutsch' },
          ],
        }),
        defineField({
          name: 'title',
          title: 'Titre',
          type: 'object',
          fields: [
            { name: 'fr', type: 'string', title: 'Français' },
            { name: 'en', type: 'string', title: 'English' },
            { name: 'de', type: 'string', title: 'Deutsch' },
          ],
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'object',
          fields: [
            { name: 'fr', type: 'text', title: 'Français' },
            { name: 'en', type: 'text', title: 'English' },
            { name: 'de', type: 'text', title: 'Deutsch' },
          ],
        }),
      ],
    }),

    // --- SECTION PARTENAIRES (en-tête uniquement) ---
    // Les logos sont gérés dans la collection "Partenaires"
    defineField({
      name: 'partnersSection',
      title: 'En-tête de la section Partenaires',
      description: 'Les logos sont gérés dans la collection "Partenaires"',
      type: 'object',
      group: 'partners',
      fields: [
        defineField({
          name: 'title',
          title: 'Titre (ex: Ils nous font confiance)',
          type: 'object',
          fields: [
            { name: 'fr', type: 'string', title: 'Français' },
            { name: 'en', type: 'string', title: 'English' },
            { name: 'de', type: 'string', title: 'Deutsch' },
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Page d'Accueil — Textes des sections" }
    },
  },
})
