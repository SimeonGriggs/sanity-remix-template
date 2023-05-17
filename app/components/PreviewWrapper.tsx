import type {SerializeFrom} from '@remix-run/node'
import {useRouteLoaderData} from '@remix-run/react'
import type {Params} from '@sanity/preview-kit'
import {definePreview, PreviewSuspense} from '@sanity/preview-kit'
import type {PropsWithChildren} from 'react'
import React, {isValidElement} from 'react'

import {Loading} from '~/components/Loading'
import type {loader as rootLoader} from '~/root'
import {projectDetails} from '~/sanity/projectDetails'

const {projectId, dataset} = projectDetails()
const usePreview = definePreview({projectId, dataset})

type PreviewWrapperProps = PropsWithChildren & {
  render: (previewData: any) => React.ReactNode
  query: string | null
  params: Params | null
  fallback?: React.ReactNode
}

// Suspense boundary prevents usePreview from running on the server
// Component just renders children if preview mode is not enabled
export function PreviewWrapper(props: PreviewWrapperProps) {
  const {
    fallback = <Loading />,
    children,
    render,
    query = null,
    params = {},
  } = props
  const {preview, token} = useRouteLoaderData(`root`) as SerializeFrom<
    typeof rootLoader
  >

  if (!preview || !query) {
    return isValidElement(children) ? children : null
  }

  return (
    <PreviewSuspense fallback={fallback}>
      <PreviewSuspended
        query={query}
        render={render}
        params={params ?? {}}
        token={token}
      />
    </PreviewSuspense>
  )
}

type PreviewSuspendedProps = {
  render: (previewData: any) => React.ReactNode
  query: string
  params: Params
  token: string | null
}

// Browser-only preview component
function PreviewSuspended(props: PreviewSuspendedProps) {
  const {query, params = {}, token = null, render} = props
  // A `null` token with rely on your Studio's auth in the same browser session
  const previewData = usePreview(token, query, params)
  const Component = render(previewData)

  return Component && isValidElement(Component) ? Component : null
}
