import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structures'

export default defineConfig({
  name: 'default',
  title: 'nono-sanity',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  typegen: {
    // Use relative paths (studio process cwd) instead of importing node:path which gets bundled into the browser
    schema: './schema.json',
    output: '../../../packages/sanity-types/src/generated.ts',
    paths: [
      '../../../packages/sanity-utils/src',
      '../../../packages/sanity-utils/src/groq',
      '../../../packages/sanity-utils/src/groq/course',
      '../../../packages/sanity-utils/src/groq/lessons',
      '../../../packages/sanity-utils/src/groq/student',
      '../../../packages/sanity-utils/src/lib',
    ],
  },
})
