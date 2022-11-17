import type {LinksFunction, LoaderArgs} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import groq from 'groq'
import {PreviewSuspense} from '@sanity/preview-kit'

import styles from '~/styles/app.css'
import Record, {PreviewRecord} from '~/components/Record'
import {client} from '~/sanity/client'
import {recordZ} from '~/types/record'
import {getSession} from '~/sessions'

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}]
}

export const loader = async ({params, request}: LoaderArgs) => {
  // If the URL contained a 'secret' query param and it matches the one on the server
  const session = await getSession(request.headers.get('Cookie'))
  const token = session.get('secret') ? process.env.SANITY_READ_TOKEN : false
  const preview = Boolean(token)

  const query = groq`*[_type == "record" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    "artist": artist->title,
    image,
    content,
    "tracks": tracks[]{
      title,
      duration
    }
  }`

  const record = await client
    // Params from the loader uses the filename
    // $slug.tsx has the params { slug: 'hello-world' }
    .fetch(query, params)
    // Parsed with Zod to validate data at runtime
    // and generate a Typescript type
    .then((res) => recordZ.parse(res))

  if (!record) {
    return new Response('Not found', {status: 404})
  }

  return json({
    record,
    preview,
    query: preview ? query : null,
    params: preview ? params : null,
    // Note: This makes the token available to the client if they have an active session
    // This is useful to show live preview to unauthenticated users
    // If you would rather not, replace token with `null` and it will rely on your Studio auth
    token: preview ? token : null,
  })
}

export default function RecordPage() {
  // TODO: Solve for why type inference isn't working here
  const {record, preview, query, params, token} = useLoaderData<typeof loader>()

  if (preview) {
    return (
      <PreviewSuspense fallback={<Record {...record} />}>
        <PreviewRecord query={query} params={params} token={token} />
      </PreviewSuspense>
    )
  }

  return <Record {...record} />
}
