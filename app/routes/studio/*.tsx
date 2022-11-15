import type {LinksFunction, MetaFunction} from '@remix-run/node'
import {ClientOnly} from 'remix-utils'
import {Studio, defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'

import {projectDetails} from '~/sanity/projectDetails'
import schema from '~/sanity/schema'

import styles from '~/styles/studio.css'

export const meta: MetaFunction = () => ({
  title: 'Sanity Studio',
  robots: 'noindex',
})

const config = defineConfig({
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
