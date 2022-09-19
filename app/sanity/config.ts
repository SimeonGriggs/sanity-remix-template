import {createConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

import schema from './schema'

export const projectDetails = {
  projectId: typeof process !== 'undefined' ? process.env.SANITY_PROJECT_ID ?? `` : ``,
  dataset: typeof process !== 'undefined' ? process.env.SANITY_DATASET ?? `` : ``,
  apiVersion: typeof process !== 'undefined' ? process.env.SANITY_API_VERSION ?? `2022-09-19` : ``,
}

const projectDetailsBrowser = {
  projectId: typeof document !== 'undefined' ? window.ENV.projectId ?? `` : ``,
  dataset: typeof document !== 'undefined' ? window.ENV.dataset ?? `` : ``,
  apiVersion: typeof document !== 'undefined' ? window.ENV.apiVersion ?? `` : ``,
}

export const config = createConfig({
  ...projectDetailsBrowser,
  plugins: [deskTool()],
  basePath: `/studio`,
  schema: {
    types: schema,
  },
})
