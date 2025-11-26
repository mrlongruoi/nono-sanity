import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'The URL for the video player (e.g. YouTube, Vimeo)',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true; // Allow empty value
          
          // Check if URL starts with protocol
          if (!value.startsWith('http://') && !value.startsWith('https://')) {
            return 'URL must start with https:// or http://';
          }
          
          return true;
        }),
    }),
    defineField({
      name: 'loomUrl',
      title: 'Loom Share URL',
      type: 'url',
      description: 'The full Loom share URL (e.g., https://www.loom.com/share/...)',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true // Allow empty value
          try {
            const url = new URL(value)
            if (!url.hostname.endsWith('loom.com')) {
              return 'URL must be from loom.com'
            }
            if (!url.pathname.startsWith('/share/')) {
              return 'Must be a Loom share URL'
            }
            const videoId = url.pathname.split('/share/')[1]
            // Accept Loom video IDs with dashes (UUID format: 8-4-4-4-12) or without (32 hex chars)
            const loomUuidPattern = /^[a-f0-9]{8}-?[a-f0-9]{4}-?[a-f0-9]{4}-?[a-f0-9]{4}-?[a-f0-9]{12}$/i
            if (!loomUuidPattern.test(videoId)) {
              return 'Invalid Loom video ID in URL'
            }
            return true
          } catch {
            return 'Please enter a valid URL'
          }
        }),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'module',
      title: 'Parent Module',
      type: 'reference',
      to: [{ type: 'module' }],
      description: 'The module this lesson belongs to (for navigation)',
      validation: (rule) => rule.required(),
    }),
  ],
})
