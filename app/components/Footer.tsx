import {Link} from '@remix-run/react'
import React from 'react'

export default function Footer() {
  return (
    <header className="border-t border-gray-100">
      <div className="container mx-auto flex items-center justify-between p-4 lg:px-12">
        <h1 className="text-lg font-bold tracking-tighter text-black lg:text-2xl">
          <Link to="/">Rock.</Link>
        </h1>
        <a href="/studio">Log in to Sanity Studio v3</a>
      </div>
    </header>
  )
}
