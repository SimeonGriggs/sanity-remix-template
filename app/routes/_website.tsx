import type {LoaderFunctionArgs} from '@remix-run/node'
import {
  json,
  Outlet,
  useLoaderData,
  useLocation,
  useOutletContext,
} from '@remix-run/react'
import {useQuery} from '@sanity/react-loader'
import {VisualEditing} from '@sanity/visual-editing/remix'

import {ExitPreview} from '~/components/ExitPreview'
import {Footer} from '~/components/Footer'
import {Header} from '~/components/Header'
import {Title} from '~/components/Title'
import {loadQuery} from '~/sanity/loader.server'
import {loadQueryOptions} from '~/sanity/loadQueryOptions.server'
import {HOME_QUERY} from '~/sanity/queries'
import type {HomeDocument} from '~/types/home'
import {homeZ} from '~/types/home'
import type {ThemePreference} from '~/types/themePreference'

export const loader = async ({request}: LoaderFunctionArgs) => {
  const {preview, options} = await loadQueryOptions(request.headers)
  console.log({preview, options})

  // Sanity content reused throughout the site
  const query = HOME_QUERY
  const params = {}
  const initial = await loadQuery<HomeDocument>(query, params, options).then(
    (res) => ({
      ...res,
      data: res.data ? homeZ.parse(res.data) : undefined,
    }),
  )

  return json({
    initial,
    query,
    params,
    sanity: {preview},
  })
}

export default function Website() {
  const {initial, query, params, sanity} = useLoaderData<typeof loader>()
  const {data: home} = useQuery<typeof initial.data>(query, params, {
    // There's a TS issue with how initial comes over the wire
    // @ts-expect-error
    initial,
  })
  const {pathname} = useLocation()
  const {theme} = useOutletContext<{theme: ThemePreference}>()

  return (
    <>
      <Header home={home} theme={theme} />
      <div className="container mx-auto p-4 lg:p-12 grid grid-cols-1 gap-4 lg:gap-12">
        {home?.title && pathname === '/' ? <Title>{home?.title}</Title> : null}
        <Outlet />
      </div>
      <Footer home={home} />
      {sanity.preview ? (
        <>
          <VisualEditing />
          <ExitPreview />
        </>
      ) : null}
    </>
  )
}
