import type {SerializeFrom} from '@remix-run/node'
import {Link, useRouteLoaderData} from '@remix-run/react'
import type {loader as rootLoader} from '~/root'

export default function Logo() {
  const {home} = useRouteLoaderData(`root`) as SerializeFrom<typeof rootLoader>

  if (!home?.siteTitle && typeof document !== `undefined`) {
    console.info(
      `Create and publish "home" document in Sanity Studio at ${window.origin}/studio/desk/home`
    )
  }

  return (
    <p className="text-lg font-bold tracking-tighter text-black dark:text-white lg:text-2xl">
      <Link to="/">{home?.siteTitle ?? `Sanity Remix`}</Link>
    </p>
  )
}
