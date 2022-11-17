import SanityClient from '@sanity/client'

import {projectDetails} from './projectDetails'

export const client = new SanityClient({
  ...projectDetails(),
  useCdn: true,
})

export const writeClient = new SanityClient({
  ...projectDetails(),
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})
