import type {LinksFunction} from '@remix-run/node'
import {ClientOnly} from 'remix-utils'
import {Studio, createConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

import {projectDetails} from '~/sanity/projectDetails'
import schema from '~/sanity/schema'

import styles from '~/styles/studio.css'

const config = createConfig({
  ...projectDetails(),
  plugins: [deskTool()],
  basePath: `/studio`,
  schema: {
    types: schema,
  },
})

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}]
}

export default function StudioPage() {
  return <ClientOnly>{() => <Studio config={config} />}</ClientOnly>
}
