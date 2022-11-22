import {Link} from '@remix-run/react'
import {useRouteData} from 'remix-utils'

import type {HomeDocument} from '~/types/home'

export default function Logo() {
  const {home} = useRouteData(`root`) as {home: HomeDocument}

  return (
    <p className="text-lg font-bold tracking-tighter text-black dark:text-white lg:text-2xl">
      <Link to="/">{home.siteTitle}</Link>
    </p>
  )
}
