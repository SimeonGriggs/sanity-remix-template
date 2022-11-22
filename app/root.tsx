import type {LoaderArgs, MetaFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from '@remix-run/react'
import groq from 'groq'
import {getClient} from './sanity/client'
import {homeZ} from './types/home'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Sanity Studio v3 in Remix 🤘',
  viewport: 'width=device-width,initial-scale=1',
})

export const loader = async (props: LoaderArgs) => {
  const query = groq`*[_id == "home"][0]{
    title,
    siteTitle
  }`
  const home = await getClient()
    .fetch(query)
    .then((res) => (res ? homeZ.parse(res) : null))

  return json({
    home,
    ENV: {
      SANITY_PUBLIC_PROJECT_ID: process.env.SANITY_PUBLIC_PROJECT_ID,
      SANITY_PUBLIC_DATASET: process.env.SANITY_PUBLIC_DATASET,
      SANITY_PUBLIC_API_VERSION: process.env.SANITY_PUBLIC_API_VERSION,
    },
  })
}

export default function App() {
  const {ENV} = useLoaderData<typeof loader>()

  const {pathname} = useLocation()
  const isStudioRoute = pathname.startsWith('/studio')

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {isStudioRoute && typeof document === 'undefined' ? '__STYLES__' : null}
        {isStudioRoute ? null : (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link
              href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;700&family=Inter:wght@500;700;800&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap"
              rel="stylesheet"
            />
          </>
        )}
      </head>
      <body className="min-h-screen bg-white">
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
