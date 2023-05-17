import {defineField, defineType} from 'sanity'

import {secondsToMinutes} from '~/lib/secondsToMinutes'
import Duration from '~/sanity/components/Duration'

export const trackType = defineType({
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
      description: 'Time in seconds',
      type: 'number',
      components: {
        input: Duration,
      },
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
