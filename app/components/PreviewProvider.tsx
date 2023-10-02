import {createClient} from '@sanity/client'
import {LiveQueryProvider} from '@sanity/preview-kit'
import type {PropsWithChildren} from 'react'

import {ExitPreview} from '~/components/ExitPreview'
import {useRootLoaderData} from '~/lib/useRootLoaderData'
import {projectDetails} from '~/sanity/projectDetails'

export function PreviewProvider(props: PropsWithChildren) {
  const rootData = useRootLoaderData()
  if (!rootData.token) throw new TypeError('Missing token')

  return rootData.token ? (
    <LiveQueryProvider
      // Importing `client` here pulled in server variables too
      client={createClient(projectDetails())}
      token={rootData.token}
    >
      {props.children}
      <ExitPreview />
    </LiveQueryProvider>
  ) : (
    props.children
  )
}
