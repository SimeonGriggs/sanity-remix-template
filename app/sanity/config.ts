import {createConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

import schema from './schema'

export const projectDetails = {
  projectId: process.env.SANITY_PROJECT_ID ?? ``,
  dataset: process.env.SANITY_DATASET ?? ``,
  apiVersion: process.env.SANITY_API_VERSION,
}

export const config = createConfig({
  ...projectDetails,
  plugins: [deskTool()],
  basePath: `/studio`,
  schema: {
    types: schema,
  },
})
