import type {Params} from '@sanity/preview-kit'
import {definePreview, PreviewSuspense} from '@sanity/preview-kit'
import type {PropsWithChildren} from 'react'
import React, {isValidElement} from 'react'

import {Loading} from '~/components/Loading'
import {projectDetails} from '~/sanity/projectDetails'

const {projectId, dataset} = projectDetails()
const usePreview = definePreview({projectId, dataset})

type PreviewWrapperProps = PropsWithChildren & {
  render: (previewData: any) => React.ReactNode
  query: string
  params: Params
  token: string | null
  fallback?: React.ReactNode
}

// Suspense boundary prevents usePreview from running on the server
export function PreviewWrapper(props: PreviewWrapperProps) {
  const {fallback = <Loading />, ...rest} = props

  return (
    <PreviewSuspense fallback={fallback}>
      <PreviewSuspended {...rest} />
    </PreviewSuspense>
  )
}

type PreviewSuspendedProps = Omit<PreviewWrapperProps, 'fallback'>

// Browser-only preview component
function PreviewSuspended(props: PreviewSuspendedProps) {
  const {query, params = {}, token = null, render} = props
  const previewData = usePreview(token, query, params)
  const Component = render(previewData)

  return Component && isValidElement(Component) ? Component : null
}
