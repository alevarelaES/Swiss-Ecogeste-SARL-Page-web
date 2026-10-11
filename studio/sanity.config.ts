import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './src/structure'

export default defineConfig({
  name: 'default',
  title: 'Swiss Ecogestes',

  projectId: 'btjdqrld',
  // Même jeu de données que le site (src/sanity/client.ts)
  dataset: 'dev',

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
