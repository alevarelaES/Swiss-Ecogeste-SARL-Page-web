import { defineField, defineType } from 'sanity'

export const resultatsPage = defineType({
  name: 'resultatsPage',
  title: 'Page Resultats & Impact',
  type: 'document',
  groups: [
    { name: 'hero', title: 'En-tete' },
    { name: 'stats', title: "Chiffres d'impact" },
    { name: 'cases', title: 'Etudes de cas' },
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Titre SEO',
          type: 'object',
          fields: [
            { name: 'fr', type: 'string', title: 'Francais' },
            { name: 'en', type: 'string', title: 'English' },
            { name: 'de', type: 'string', title: 'Deutsch' },
          ],
        }),
        defineField({
          name: 'description',
          title: 'Description SEO',
          type: 'object',
          fields: [
            { name: 'fr', type: 'text', title: 'Francais' },
            { name: 'en', type: 'text', title: 'English' },
            { name: 'de', type: 'text', title: 'Deutsch' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'heroTitle',
      title: 'Titre principal',
      group: 'hero',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Francais' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Sous-titre',
      group: 'hero',
      type: 'object',
      fields: [
        { name: 'fr', type: 'text', title: 'Francais' },
        { name: 'en', type: 'text', title: 'English' },
        { name: 'de', type: 'text', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'impactStats',
      title: "Chiffres cles d'impact",
      group: 'stats',
      type: 'array',
      validation: (rule) => rule.max(4),
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Valeur numerique', type: 'number' }),
            defineField({ name: 'suffix', title: 'Suffixe (ex: +, %)', type: 'string' }),
            defineField({ name: 'prefix', title: 'Prefixe (ex: ~)', type: 'string' }),
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
          preview: { select: { title: 'label.fr', subtitle: 'value' } },
        },
      ],
    }),
    defineField({
      name: 'cases',
      title: 'Etudes de cas',
      group: 'cases',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Etude de cas',
          fields: [
            defineField({
              name: 'sector',
              title: 'Secteur',
              type: 'object',
              fields: [
                { name: 'fr', type: 'string', title: 'Francais' },
                { name: 'en', type: 'string', title: 'English' },
                { name: 'de', type: 'string', title: 'Deutsch' },
              ],
            }),
            defineField({
              name: 'title',
              title: 'Titre du cas',
              type: 'object',
              fields: [
                { name: 'fr', type: 'string', title: 'Francais' },
                { name: 'en', type: 'string', title: 'English' },
                { name: 'de', type: 'string', title: 'Deutsch' },
              ],
            }),
            defineField({ name: 'mainMetric', title: 'Resultat principal (%)', type: 'number' }),
            defineField({
              name: 'mainMetricSuffix',
              title: 'Suffixe resultat (ex: %)',
              type: 'string',
              initialValue: '%',
            }),
            defineField({
              name: 'mainMetricLabel',
              title: 'Label resultat',
              type: 'object',
              fields: [
                { name: 'fr', type: 'string', title: 'Francais' },
                { name: 'en', type: 'string', title: 'English' },
                { name: 'de', type: 'string', title: 'Deutsch' },
              ],
            }),
            defineField({
              name: 'kpis',
              title: 'Indicateurs (KPIs)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'value', title: 'Valeur', type: 'string' }),
                    defineField({ name: 'unit', title: 'Unite', type: 'string' }),
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
                  preview: { select: { title: 'label.fr', subtitle: 'value' } },
                },
              ],
            }),
            defineField({
              name: 'beforeItems',
              title: 'Situation avant (liste)',
              type: 'object',
              fields: [
                { name: 'fr', type: 'array', title: 'Francais', of: [{ type: 'string' }] },
                { name: 'en', type: 'array', title: 'English', of: [{ type: 'string' }] },
                { name: 'de', type: 'array', title: 'Deutsch', of: [{ type: 'string' }] },
              ],
            }),
            defineField({
              name: 'afterItems',
              title: 'Actions realisees (liste)',
              type: 'object',
              fields: [
                { name: 'fr', type: 'array', title: 'Francais', of: [{ type: 'string' }] },
                { name: 'en', type: 'array', title: 'English', of: [{ type: 'string' }] },
                { name: 'de', type: 'array', title: 'Deutsch', of: [{ type: 'string' }] },
              ],
            }),
          ],
          preview: { select: { title: 'title.fr', subtitle: 'sector.fr' } },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Page Resultats & Impact' }
    },
  },
})
