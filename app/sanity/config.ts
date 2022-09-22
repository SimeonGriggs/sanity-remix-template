import {createConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

import schema from './schema'

export const projectDetails = () => ({
  projectId:
    typeof document === 'undefined' ? process.env.SANITY_PROJECT_ID : window?.ENV?.projectId,
  dataset: typeof document === 'undefined' ? process.env.SANITY_DATASET : window?.ENV?.dataset,
  apiVersion:
    typeof document === 'undefined' ? process.env.SANITY_API_VERSION : window?.ENV?.apiVersion,
})

export const config = createConfig({
  ...projectDetails(),
  plugins: [deskTool()],
  basePath: `/studio`,
  schema: {
    types: schema,
  },
})
