import type {ActionFunction, LinksFunction, LoaderArgs, MetaFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import groq from 'groq'
import {PreviewSuspense} from '@sanity/preview-kit'

import styles from '~/styles/app.css'
import Record, {PreviewRecord} from '~/components/Record'
import {getClient, writeClient} from '~/sanity/client'
import {recordZ} from '~/types/record'
import {getSession} from '~/sessions'

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}]
}

export const meta: MetaFunction = ({data}) => {
  return {
    title: data?.record?.title ?? `Untitled Record`,
  }
}

// Perform a `like` or `dislike` mutation on a `record` document
export const action: ActionFunction = async ({request}) => {
  if (request.method !== 'POST') {
    return json({message: 'Method not allowed'}, 405)
  }

  const body = await request.formData()
  const id = String(body.get('id'))
  const action = String(body.get('action'))

  if (id) {
    switch (action) {
      case 'LIKE':
        return await writeClient
          .patch(id)
          .setIfMissing({likes: 0})
          .inc({likes: 1})
          .commit()
          .then(({likes, dislikes}) => ({likes: likes ?? 0, dislikes: dislikes ?? 0}))
      case 'DISLIKE':
        return await writeClient
          .patch(id)
          .setIfMissing({dislikes: 0})
          .inc({dislikes: 1})
          .commit()
          .then(({likes, dislikes}) => ({likes: likes ?? 0, dislikes: dislikes ?? 0}))
      default:
        return json({message: 'Invalid action'}, 400)
    }
  }

  return json({message: 'Bad request'}, 400)
}

// Load the `record` document with this slug
export const loader = async ({params, request}: LoaderArgs) => {
  const session = await getSession(request.headers.get('Cookie'))
  const token = session.get('token')
  const preview = Boolean(token)

  const query = groq`*[_type == "record" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    "artist": artist->title,
    "likes": coalesce(likes, 0),
    "dislikes": coalesce(dislikes, 0),
    image,
    content,
    "tracks": tracks[]{
      title,
      duration
    }
  }`

  const record = await getClient(preview)
    // Params from the loader uses the filename
    // $slug.tsx has the params { slug: 'hello-world' }
    .fetch(query, params)
    // Parsed with Zod to validate data at runtime
    // and generate a Typescript type
    .then((res) => (res ? recordZ.parse(res) : null))

  if (!record) {
    throw new Response('Not found', {status: 404})
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

  if (preview && query && params && token) {
    return (
      <PreviewSuspense fallback={<Record {...record} />}>
        <PreviewRecord query={query} params={params} token={token} />
      </PreviewSuspense>
    )
  }

  return <Record {...record} />
}
