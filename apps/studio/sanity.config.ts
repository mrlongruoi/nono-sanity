import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structures'
import {presentationTool, defineLocations, defineDocuments} from 'sanity/presentation'

const apiVersion = process.env.SANITY_API_VERSION || '2024-11-24'

const lmsUrl = process.env.SANITY_STUDIO_PREVIEW_LMS_URL || 'http://localhost:3000'
const redditUrl = process.env.SANITY_STUDIO_PREVIEW_REDDIT_URL || 'http://localhost:3001'

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
        initial: lmsUrl,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      allowOrigins: [
        lmsUrl,
        redditUrl,
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:3333',
      ],
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: '/courses/:slug',
            filter: `_type == "course" && slug.current == $slug`,
          },
          {
            route: '/lessons/:slug',
            filter: `_type == "lesson" && slug.current == $slug`,
          },
          {
            route: '/post/:slug',
            filter: `_type == "post" && slug.current == $slug`,
          },
          {
            route: '/community/:slug',
            filter: `_type == "subreddit" && slug.current == $slug`,
          },
        ]),
        locations: {
          course: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: `${lmsUrl}/courses/${doc?.slug}`,
                },
              ],
            }),
          }),
          lesson: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: `${lmsUrl}/lessons/${doc?.slug}`,
                },
              ],
            }),
          }),
          post: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: `${redditUrl}/post/${doc?.slug}`,
                },
              ],
            }),
          }),
          subreddit: defineLocations({
            select: {
              name: 'name',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.name || 'Untitled',
                  href: `${redditUrl}/community/${doc?.slug}`,
                },
              ],
            }),
          }),
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
      // '../../../packages/sanity-utils/src/groq/comment',
      // '../../../packages/sanity-utils/src/groq/post',
      // '../../../packages/sanity-utils/src/groq/subreddit',
      // '../../../packages/sanity-utils/src/groq/user',
      // '../../../packages/sanity-utils/src/groq/vote',
      '../../../packages/sanity-utils/src/lib',
    ],
  },
})