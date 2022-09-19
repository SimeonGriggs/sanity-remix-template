import {Link} from '@remix-run/react'
import type {PropsWithChildren} from 'react'

export default function Layout(props: PropsWithChildren) {
  const {children} = props

  return (
    <div className="container mx-auto p-6 md:p-12">
      {children}
      <footer className="mt-6 rounded bg-green-100 p-6 text-center shadow-inner md:mt-12 md:p-12">
        <Link to="/studio" className="font-medium text-green-600 underline">
          Log in to Sanity Studio v3
        </Link>
      </footer>
    </div>
  )
}
