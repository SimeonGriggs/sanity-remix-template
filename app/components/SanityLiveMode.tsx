import {useLiveMode} from '@sanity/react-loader'

import {client} from '~/sanity/client'
import {STUDIO_BASEPATH} from '~/sanity/constants'

// Default export required for lazy loading
// eslint-disable-next-line import/no-default-export
export default function SanityLiveMode() {
  useLiveMode({
    client: client.withConfig({
      stega: {
        enabled: true,
        studioUrl: STUDIO_BASEPATH,
      },
    }),
  })

  return null
}
