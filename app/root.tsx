import type {LinksFunction, LoaderFunctionArgs} from '@remix-run/node'
import {json} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import {lazy, Suspense} from 'react'
import {z} from 'zod'

import {Layout} from '~/components/Layout'
import {themePreferenceCookie} from '~/cookies'
import {getBodyClassNames} from '~/lib/getBodyClassNames'
import {useQuery} from '~/sanity/loader'
import {loadQuery} from '~/sanity/loader.server'
import {HOME_QUERY} from '~/sanity/queries'
import styles from '~/tailwind.css'
import type {HomeDocument} from '~/types/home'
import {homeZ} from '~/types/home'

const VisualEditing = lazy(() => import('~/components/VisualEditing'))

export const links: LinksFunction = () => {
  return [
    {rel: 'stylesheet', href: styles},
    {rel: 'preconnect', href: 'https://cdn.sanity.io'},
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
      crossOrigin: 'anonymous',
    },
    {
      href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;700&family=Inter:wght@500;700;800&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap',
      rel: 'stylesheet',
    },
  ]
}

export type Loader = typeof loader

export const loader = async ({request}: LoaderFunctionArgs) => {
  // Dark/light mode
  const cookieHeader = request.headers.get('Cookie')
  const cookie = (await themePreferenceCookie.parse(cookieHeader)) || {}
  const themePreference = z
    .union([z.literal('dark'), z.literal('light')])
    .optional()
    .parse(cookie.themePreference)

  const isStudioRoute = new URL(request.url).pathname.startsWith('/studio')
  const bodyClassNames = getBodyClassNames(themePreference)

  // Sanity content reused throughout the site
  const initial = await loadQuery<HomeDocument>(HOME_QUERY).then((res) => ({
    ...res,
    data: res.data ? homeZ.parse(res.data) : null,
  }))

  return json({
    initial,
    query: HOME_QUERY,
    params: {},
    bodyClassNames,
    isStudioRoute,
    ENV: {
      SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
      SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
      SANITY_STUDIO_API_VERSION: process.env.SANITY_STUDIO_API_VERSION,
      SANITY_STUDIO_URL: process.env.SANITY_STUDIO_URL,
      SANITY_STUDIO_USE_STEGA: process.env.SANITY_STUDIO_USE_STEGA,
    },
  })
}

export default function App() {
  const {initial, query, params, bodyClassNames, isStudioRoute, ENV} =
    useLoaderData<typeof loader>()
  const {data, loading} = useQuery<typeof initial.data>(query, params, {
    initial,
  })

  return (
    <html lang="en">
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="https://fav.farm/🤘" />
        <Links />
      </head>
      <body className={bodyClassNames}>
        {isStudioRoute ? (
          <Outlet />
        ) : (
          <Layout home={loading || !data ? null : data}>
            <Outlet />
          </Layout>
        )}
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        {ENV.SANITY_STUDIO_USE_STEGA ? (
          <Suspense>
            <VisualEditing />
          </Suspense>
        ) : null}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
