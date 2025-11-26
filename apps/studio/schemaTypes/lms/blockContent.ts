import {defineType} from 'sanity'

export default defineType({
  name: 'blockContent',
  title: 'Content',
  type: 'array',
  of: [{type: 'block'}],
})
