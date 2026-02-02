import { defineType, defineField } from 'sanity'
import { ChartUpwardIcon } from '@sanity/icons'

export const stat = defineType({
  name: 'stat',
  title: 'Statistic',
  type: 'document',
  icon: ChartUpwardIcon,
  fields: [
    defineField({
      name: 'value',
      title: 'Numeric Value',
      type: 'number',
      description: 'Leave empty if using text instead',
    }),
    defineField({
      name: 'text',
      title: 'Text Value',
      type: 'object',
      description: 'Use this if stat is not numeric',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'prefix',
      title: 'Prefix',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'suffix',
      title: 'Suffix',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'object',
      fields: [
        { name: 'fr', type: 'string', title: 'Français' },
        { name: 'en', type: 'string', title: 'English' },
        { name: 'de', type: 'string', title: 'Deutsch' },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name (e.g., "Zap", "Leaf", "Users")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'label.fr',
      value: 'value',
      text: 'text.fr',
    },
    prepare({ title, value, text }) {
      return {
        title: title,
        subtitle: value ? `${value}` : text || 'Text value',
      }
    },
  },
})
