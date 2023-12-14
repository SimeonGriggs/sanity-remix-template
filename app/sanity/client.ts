import {createClient} from '@sanity/client/stega'

import {
  apiVersion,
  dataset,
  projectId,
  stegaEnabled,
  studioUrl,
} from '~/sanity/projectDetails'

// Do not import this into client-side components unless lazy-loaded
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    enabled: stegaEnabled,
    studioUrl,
  },
})
