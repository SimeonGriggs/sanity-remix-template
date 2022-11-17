import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

import {projectDetails} from '~/sanity/projectDetails'
import schema from '~/sanity/schema'
import {fakeRecords} from './plugins/fakeRecords'
import {structure, defaultDocumentNode} from './structure'

export const config = defineConfig({
  ...projectDetails(),
  name: 'sanity-remix',
  title: 'Sanity Remix',
  plugins: [deskTool({structure, defaultDocumentNode}), fakeRecords()],
  basePath: `/studio`,
  schema: {
    types: schema,
  },
})
