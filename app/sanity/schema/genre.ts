import {Tags} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const genreType = defineType({
  name: 'genre',
  title: 'Genre',
  type: 'document',
  icon: Tags,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
  ],
})
