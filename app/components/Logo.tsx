import {Link} from '@remix-run/react'

import {useRootLoaderData} from '~/lib/useRootLoaderData'

export function Logo() {
  const rootData = useRootLoaderData()
  const siteTitle = rootData?.home?.siteTitle ?? `Sanity Remix`

  if (!siteTitle && typeof document !== `undefined`) {
    console.info(
      `Create and publish "home" document in Sanity Studio at ${window.origin}/studio/desk/home`
    )
  }

  return (
    <p className="text-lg font-bold tracking-tighter text-black dark:text-white lg:text-2xl">
      <Link to="/">{siteTitle ?? `Sanity Remix`}</Link>
    </p>
  )
}
