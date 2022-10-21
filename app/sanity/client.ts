import SanityClient from '@sanity/client'

import {projectDetails} from './projectDetails'

export const client = new SanityClient({
  ...projectDetails(),
  useCdn: true,
})
