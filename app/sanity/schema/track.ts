import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'track',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'duration',
      description: 'Duration in seconds',
      type: 'number',
    }),
  ],
})
