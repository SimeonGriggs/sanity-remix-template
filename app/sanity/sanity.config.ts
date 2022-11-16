import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

import {projectDetails} from '~/sanity/projectDetails'
import schema from '~/sanity/schema'

export const config = defineConfig({
  ...projectDetails(),
  name: 'sanity-remix',
  title: 'Sanity Remix',
  plugins: [deskTool()],
  basePath: `/studio`,
  schema: {
    types: schema,
  },
})
