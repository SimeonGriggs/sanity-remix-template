import {VisualEditing} from '@sanity/visual-editing/remix'
import {useMemo} from 'react'

import {client} from '~/sanity/client'
import {useLiveMode} from '~/sanity/loader'

type VisualEditingProps = {
  studioUrl: string
}

// Default export required for React Lazy loading
// eslint-disable-next-line import/no-default-export
export default function LiveVisualEditing({studioUrl}: VisualEditingProps) {
  const stegaClient = useMemo(
    () => client.withConfig({stega: {enabled: true, studioUrl}}),
    [studioUrl],
  )
  useLiveMode({client: stegaClient})

  return <VisualEditing />
}
