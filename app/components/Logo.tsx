import {Link, useRouteLoaderData} from '@remix-run/react'

import type {HomeDocument} from '~/types/home'

export default function Logo() {
  const {home} = useRouteLoaderData(`root`) as {home: HomeDocument}

  if (!home) {
    return null
  }

  return (
    <p className="text-lg font-bold tracking-tighter text-black dark:text-white lg:text-2xl">
      <Link to="/">{home.siteTitle}</Link>
    </p>
  )
}
