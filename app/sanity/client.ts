import {createClient} from '@sanity/client/stega'

import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
} from '~/sanity/projectDetails'

// Because this is the Stega client, it should never be used in production.
// Any client component that imports this should conditionally lazy load it
export const stegaClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    enabled: true,
    studioUrl,
  },
})
