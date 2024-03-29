import {Home} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const homeType = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: Home,
  fields: [
    defineField({
      name: 'title',
      description: 'Heading on the home page',
      type: 'string',
    }),
    defineField({
      name: 'siteTitle',
      description: 'Displayed in header, footer and in meta tags',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      artist: 'siteTitle',
    },
  },
})
