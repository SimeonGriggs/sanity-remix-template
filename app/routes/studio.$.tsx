import type {LinksFunction, MetaFunction} from '@remix-run/node'
import {Studio} from 'sanity'

import {Hydrated} from '~/components/Hydrated'
import studio from '~/styles/studio.css?url'

import config from '../../sanity.config'

export const meta: MetaFunction = () => [
  {title: 'Sanity Studio'},
  {name: 'robots', content: 'noindex'},
]

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: studio}]
}

export default function StudioPage() {
  return (
    <Hydrated>
      <Studio
        config={config}
        // To enable guests view-only access to your Studio,
        // uncomment this line!
        // unstable_noAuthBoundary
      />
    </Hydrated>
  )
}
