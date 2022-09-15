import type {LinksFunction} from '@remix-run/node'
import {Studio} from 'sanity'

import {config} from '~/sanity/config'

import styles from '~/styles/studio.css'

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}]
}

export default function StudioPage() {
  return <Studio config={config} />
}
