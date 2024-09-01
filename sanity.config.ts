import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {defineLocations, presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'

import {STUDIO_BASEPATH} from '~/sanity/constants'
import {projectDetails} from '~/sanity/projectDetails'
import schema from '~/sanity/schemaTypes'
import {defaultDocumentNode, structure} from '~/sanity/structure'

export default defineConfig({
  ...projectDetails(),
  name: 'sanity-remix',
  title: 'Sanity Remix',
  plugins: [
    structureTool({structure, defaultDocumentNode}),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: '/resource/preview',
        },
      },
      resolve: {
        locations: {
          record: defineLocations({
            select: {
              title: 'title',
              slug: 'slug.current',
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled',
                  href: `/records/${doc?.slug}`,
                },
                {title: 'Home', href: `/`},
              ],
            }),
          }),
        },
      },
    }),
    visionTool(),
  ],
  basePath: STUDIO_BASEPATH,
  schema: {
    types: schema,
  },
})
