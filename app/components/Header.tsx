import {Link} from '@remix-run/react'
import {useRouteData} from 'remix-utils'

import type {HomeDocument} from '~/types/home'

export default function Header() {
  const {home} = useRouteData(`root`) as {home: HomeDocument}

  return (
    <header className="border-b border-gray-100">
      <div className="container mx-auto p-4 lg:px-12">
        <h1 className="text-lg font-bold tracking-tighter text-black lg:text-2xl">
          <Link to="/">{home.siteTitle}</Link>
        </h1>
      </div>
    </header>
  )
}
