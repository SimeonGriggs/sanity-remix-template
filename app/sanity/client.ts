import SanityClient from '@sanity/client'

import {projectDetails} from './projectDetails'

export const client = new SanityClient({
  ...projectDetails(),
  useCdn: true,
})

export const previewClient = new SanityClient({
  ...projectDetails(),
  useCdn: false,
  token: process.env.SANITY_READ_TOKEN,
})

export const getClient = (previewMode = false) => (previewMode ? previewClient : client)

export const writeClient = new SanityClient({
  ...projectDetails(),
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})
