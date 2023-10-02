import type {
  ActionFunction,
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {LiveQuery} from '@sanity/preview-kit/live-query'
import groq from 'groq'

import {Record} from '~/components/Record'
import {getPreviewToken} from '~/lib/getPreviewToken'
import {useRootLoaderData} from '~/lib/useRootLoaderData'
import type {Loader as RootLoader} from '~/root'
import {OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH} from '~/routes/resource.og'
import {client, getClient, writeClient} from '~/sanity/client'
import styles from '~/styles/app.css'
import {recordZ} from '~/types/record'

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}]
}

export const meta: MetaFunction<
  typeof loader,
  {
    root: RootLoader
  }
> = ({data, matches}) => {
  const rootData = matches.find((match) => match.id === `root`)?.data
  const home = rootData ? rootData.home : null
  const title = [data?.record?.title, home?.siteTitle]
    .filter(Boolean)
    .join(' | ')
  const ogImageUrl = data ? data.ogImageUrl : null

  return [
    {title},
    {property: 'twitter:card', content: 'summary_large_image'},
    {property: 'twitter:title', content: title},
    {property: 'og:title', content: title},
    {property: 'og:image:width', content: String(OG_IMAGE_WIDTH)},
    {property: 'og:image:height', content: String(OG_IMAGE_HEIGHT)},
    {property: 'og:image', content: ogImageUrl},
  ]
}

// Perform a `like` or `dislike` mutation on a `record` document
export const action: ActionFunction = async ({request}) => {
  if (request.method !== 'POST') {
    throw new Response('Method not allowed', {status: 405})
  }

  const {token, projectId} = writeClient.config()

  if (!token) {
    throw new Response(
      `Setup "SANITY_WRITE_TOKEN" with a token with "Editor" permissions to your environment variables. Create one at https://sanity.io/manage/project/${projectId}/api#tokens`,
      {status: 401}
    )
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
          .then(({likes, dislikes}) => ({
            likes: likes ?? 0,
            dislikes: dislikes ?? 0,
          }))
      case 'DISLIKE':
        return await writeClient
          .patch(id)
          .setIfMissing({dislikes: 0})
          .inc({dislikes: 1})
          .commit()
          .then(({likes, dislikes}) => ({
            likes: likes ?? 0,
            dislikes: dislikes ?? 0,
          }))
      default:
        return json({message: 'Invalid action'}, 400)
    }
  }

  return json({message: 'Bad request'}, 400)
}

// Load the `record` document with this slug
export const loader = async ({params, request}: LoaderFunctionArgs) => {
  const {preview} = await getPreviewToken(request)

  const query = groq`*[_type == "record" && slug.current == $slug][0]{
    _id,
    title,
    // GROQ can re-shape data in the request!
    "slug": slug.current,
    "artist": artist->title,
    // coalesce() returns the first value that is not null
    // so we can ensure we have at least a zero
    "likes": coalesce(likes, 0),
    "dislikes": coalesce(dislikes, 0),
    // for simplicity in this demo these are typed as "any"
    // we can make them type-safe with a little more work
    // https://www.simeongriggs.dev/type-safe-groq-queries-for-sanity-data-with-zod
    image,
    content,
    // this is how we extract values from arrays
    tracks[]{
      _key,
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

  // Create social share image url
  const {origin} = new URL(request.url)
  const ogImageUrl = `${origin}/resource/og?id=${record._id}`

  return json({
    record,
    ogImageUrl,
    query: preview ? query : ``,
    params: preview ? params : {},
  })
}

export default function RecordPage() {
  const {record, query, params} = useLoaderData<typeof loader>()
  const rootData = useRootLoaderData()

  return (
    <LiveQuery
      enabled={Boolean(rootData?.preview)}
      query={query}
      params={params}
      initialData={record}
    >
      <Record data={record} />
    </LiveQuery>
  )
}
