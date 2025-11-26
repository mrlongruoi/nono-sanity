import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'module',
  title: 'Module',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Module Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lessons',
      title: 'Lessons',
      type: 'array',
      of: [{type: 'reference', to: {type: 'lesson'}}],
    }),
    defineField({
      name: 'course',
      title: 'Parent Course',
      type: 'reference',
      to: [{ type: 'course' }],
      description: 'The course this module belongs to',
      validation: (rule) => rule.required(),
    }),
  ],
})
