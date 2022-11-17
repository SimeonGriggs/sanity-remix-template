import {defineField, defineType} from 'sanity'
import {secondsToMinutes} from '~/lib/secondsToMinutes'

export default defineType({
  name: 'track',
  title: 'Track',
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
  preview: {
    select: {
      title: 'title',
      duration: 'duration',
    },
    prepare({title, duration}) {
      return {
        title,
        subtitle: secondsToMinutes(duration),
      }
    },
  },
})
