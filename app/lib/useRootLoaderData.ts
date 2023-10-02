import {useRouteLoaderData} from '@remix-run/react'

import type {Loader as RootLoader} from '~/root'

export function useRootLoaderData() {
  const data = useRouteLoaderData<RootLoader>(`root`)

  return data!
}
