import {createClient} from '@sanity/client/stega'

import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  useStega,
} from './projectDetails'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    enabled: useStega,
    studioUrl,
  },
})
