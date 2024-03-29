import {ComposeIcon, MenuIcon, ThListIcon} from '@sanity/icons'
import {Disc} from 'lucide-react'
import {defineField, defineType} from 'sanity'

export const recordType = defineType({
  name: 'record',
  title: 'Record',
  type: 'document',
  icon: Disc,
  fieldsets: [
    {
      name: 'rating',
      title: 'Rating',
      description: 'These fields are written to from the Remix front end',
      options: {columns: 2},
    },
  ],
  groups: [
    {
      name: 'details',
      title: 'Details',
      icon: ThListIcon,
    },
    {
      name: 'editorial',
      title: 'Editorial',
      icon: ComposeIcon,
    },
    {
      name: 'tracks',
      title: 'Tracks',
      icon: MenuIcon,
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
      name: 'releaseDate',
      type: 'datetime',
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
      fields: [defineField({name: 'alt', type: 'string'})],
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
      artist: 'artist.name',
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
