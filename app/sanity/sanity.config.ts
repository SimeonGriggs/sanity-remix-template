import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

import {projectDetails} from '~/sanity/projectDetails'
import schema from '~/sanity/schema'
import {structure, defaultDocumentNode} from '~/sanity/structure'

export const config = defineConfig({
  ...projectDetails(),
  name: 'sanity-remix',
  title: 'Sanity Remix',
  plugins: [deskTool({structure, defaultDocumentNode})],
  basePath: `/studio`,
  schema: {
    types: schema,
  },
})
