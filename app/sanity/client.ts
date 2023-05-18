import {createClient} from '@sanity/client'

import {projectDetails} from '~/sanity/projectDetails'

export const client = createClient({
  ...projectDetails(),
  useCdn: true,
})

export const previewClient = createClient({
  ...projectDetails(),
  useCdn: false,
  token: process.env.SANITY_READ_TOKEN,
})

export const getClient = (previewMode = false) =>
  previewMode ? previewClient : client

export const writeClient = createClient({
  ...projectDetails(),
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})
