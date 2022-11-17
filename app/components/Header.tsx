import {Link} from '@remix-run/react'
import React from 'react'

export default function Header() {
  return (
    <header className="border-b border-gray-100">
      <div className="container mx-auto p-4 lg:px-12">
        <h1 className="text-lg font-bold tracking-tighter text-black lg:text-2xl">
          <Link to="/">Rock.</Link>
        </h1>
      </div>
    </header>
  )
}
