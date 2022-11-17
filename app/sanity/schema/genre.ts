import {Tags} from 'lucide-react'
import {defineType, defineField} from 'sanity'

export default defineType({
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
