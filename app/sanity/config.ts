import {createConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

import schema from './schema'

export const projectDetails = {
  projectId: typeof process !== 'undefined' ? process.env.SANITY_PROJECT_ID ?? `` : ``,
  dataset: typeof process !== 'undefined' ? process.env.SANITY_DATASET ?? `` : ``,
  apiVersion: typeof process !== 'undefined' ? process.env.SANITY_API_VERSION ?? `2022-09-19` : ``,
}

const projectId = () => {
  return typeof window !== "undefined" ? window.ENV.projectId ?? `` : ``;
};
const dataset = () => {
  return typeof window !== "undefined" ? window.ENV.dataset ?? `` : ``;
};
const apiVersion = () => {
  return typeof window !== "undefined" ? window.ENV.apiVersion ?? `` : ``;
};

const projectDetailsBrowser = {
  projectId: projectId(),
  dataset: dataset(),
  apiVersion: apiVersion(),
};

export const config = createConfig({
  ...projectDetailsBrowser,
  plugins: [deskTool()],
  basePath: `/studio`,
  schema: {
    types: schema,
  },
})
