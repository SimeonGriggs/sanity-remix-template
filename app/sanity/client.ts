import {createClient} from '@sanity/client'

import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
} from '~/sanity/projectDetails'

// Do not import this into client-side components unless lazy-loaded
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  stega: {
    enabled: false,
    studioUrl,
  },
})
