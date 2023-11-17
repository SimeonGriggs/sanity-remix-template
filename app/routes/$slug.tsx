import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'

import {Record} from '~/components/Record'
import type {Loader as RootLoader} from '~/root'
import {OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH} from '~/routes/resource.og'
import {writeClient} from '~/sanity/client.server'
import {useQuery} from '~/sanity/loader'
import {loadQuery} from '~/sanity/loader.server'
import {RECORD_QUERY} from '~/sanity/queries'
import type {RecordDocument} from '~/types/record'
import {recordZ} from '~/types/record'

export const meta: MetaFunction<
  typeof loader,
  {
    root: RootLoader
  }
> = ({data, matches}) => {
  const rootData = matches.find((match) => match.id === `root`)?.data
  const home = rootData ? rootData.data : null
  const title = [data?.data?.title, home?.siteTitle].filter(Boolean).join(' | ')
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
      {status: 401},
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
  // Params from the loader uses the filename
  // $slug.tsx has the params { slug: 'hello-world' }
  const initial = await loadQuery<RecordDocument>(RECORD_QUERY, params).then(
    (res) => ({...res, data: res.data ? recordZ.parse(res.data) : null}),
  )

  if (!initial.data) {
    throw new Response('Not found', {status: 404})
  }

  // Create social share image url
  const {origin} = new URL(request.url)
  const ogImageUrl = `${origin}/resource/og?id=${initial.data._id}`

  return json({
    initial,
    query: RECORD_QUERY,
    params,
    ogImageUrl,
  })
}

export default function RecordPage() {
  const {initial, query, params} = useLoaderData<typeof loader>()
  const {data, loading} = useQuery<typeof initial.data>(query, params, {
    initial,
  })

  if (loading || !data) {
    return <div>Loading...</div>
  }

  return <Record data={data} />
}
