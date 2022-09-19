import SanityClient from '@sanity/client'

import {projectDetails} from './config'

export const client = new SanityClient({
  ...projectDetails,
  useCdn: true,
})
