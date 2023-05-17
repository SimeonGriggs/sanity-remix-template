import type {SerializeFrom} from '@remix-run/node'
import {Link, useRouteLoaderData} from '@remix-run/react'

import {PreviewWrapper} from '~/components/PreviewWrapper'
import type {loader as rootLoader} from '~/root'

type LogoProps = {
  siteTitle?: string | null
}

export function Logo(props: LogoProps) {
  const {
    preview,
    token,
    query: homeQuery,
    params: homeParams,
  } = useRouteLoaderData(`root`) as SerializeFrom<typeof rootLoader>

  if (props.siteTitle && typeof document !== `undefined`) {
    console.info(
      `Create and publish "home" document in Sanity Studio at ${window.origin}/studio/desk/home`
    )
  }

  return (
    <p className="text-lg font-bold tracking-tighter text-black dark:text-white lg:text-2xl">
      <PreviewWrapper
        render={(previewData) => (
          <Link to="/">{previewData?.siteTitle ?? `Sanity Remix`}</Link>
        )}
        query={homeQuery}
        params={homeParams}
      >
        <Link to="/">{props.siteTitle ?? `Sanity Remix`}</Link>
      </PreviewWrapper>
    </p>
  )
}
