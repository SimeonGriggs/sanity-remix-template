import {createConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

import schema from './schema'

export const config = createConfig({
  projectId: `6h1mv88x`,
  dataset: `production`,
  plugins: [deskTool()],
  basePath: `/studio`,
  schema: {
    types: schema,
  },
})
