import {Disc} from 'lucide-react'
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'record',
  title: 'Record',
  type: 'document',
  icon: Disc,
  fieldsets: [
    {
      name: 'rating',
      title: 'Rating',
      options: {columns: 2},
    },
  ],
  groups: [
    {
      name: 'details',
      title: 'Details',
    },
    {
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'tracks',
      title: 'Tracks',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      group: 'details',
    }),
    defineField({
      name: 'likes',
      type: 'number',
      readOnly: true,
      fieldset: 'rating',
    }),
    defineField({
      name: 'dislikes',
      type: 'number',
      readOnly: true,
      fieldset: 'rating',
    }),
    defineField({
      name: 'artist',
      type: 'reference',
      to: [{type: 'artist'}],
      group: 'details',
    }),
    defineField({
      name: 'genres',
      type: 'array',
      of: [{type: 'reference', to: {type: 'genre'}}],
      group: 'details',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
      group: 'editorial',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      group: 'editorial',
    }),
    defineField({
      name: 'tracks',
      type: 'array',
      of: [{type: 'track'}],
      group: 'tracks',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      artist: 'artist.title',
      media: 'image',
    },
    prepare({title, artist, media}) {
      return {
        title,
        subtitle: artist,
        media,
      }
    },
  },
})
