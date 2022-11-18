import {Disc} from 'lucide-react'
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'record',
  title: 'Record',
  type: 'document',
  icon: Disc,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'likes',
      type: 'number',
      readOnly: true,
    }),
    defineField({
      name: 'dislikes',
      type: 'number',
      readOnly: true,
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'artist',
      type: 'reference',
      to: [{type: 'artist'}],
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'genres',
      type: 'array',
      of: [{type: 'reference', to: {type: 'genre'}}],
    }),
    defineField({
      name: 'tracks',
      type: 'array',
      of: [{type: 'track'}],
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
