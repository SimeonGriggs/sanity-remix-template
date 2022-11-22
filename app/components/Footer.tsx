import {Link} from '@remix-run/react'
import {useRouteData} from 'remix-utils'

import type {HomeDocument} from '~/types/home'

export default function Footer() {
  const {home} = useRouteData(`root`) as {home: HomeDocument}

  return (
    <header className="border-t border-gray-100">
      <div className="container mx-auto flex items-center justify-between p-4 lg:px-12">
        <h1 className="text-lg font-bold tracking-tighter text-black lg:text-2xl">
          <Link to="/">{home.siteTitle}</Link>
        </h1>
        <div className="flex flex-1 flex-col items-end justify-end gap-2 text-sm md:flex-row md:items-center md:gap-5">
          <a className="hover:text-cyan-600" href="/studio">
            Log in to Sanity Studio v3
          </a>
          <a className="hover:text-cyan-600" href="https://sanity.io">
            Sign up for free at Sanity.io
          </a>
        </div>
      </div>
    </header>
  )
}
