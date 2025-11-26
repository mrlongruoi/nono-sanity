import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structures'
import {presentationTool} from 'sanity/presentation'

const apiVersion = process.env.SANITY_API_VERSION || '2024-11-24'

export default defineConfig({
  name: 'default',
  title: 'nono-sanity',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [
    structureTool({
      structure,
    }),
    visionTool({defaultApiVersion: apiVersion}),
    presentationTool({
      previewUrl: {
        origin: 'http://localhost:3000',
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
    }),
  ],

  beta: {
    create: {
      startInCreateEnabled: true,
      fallbackStudioOrigin: 'app-lms.sanity.studio',
    },
  },

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
