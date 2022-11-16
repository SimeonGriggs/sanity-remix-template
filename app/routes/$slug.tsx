import type {LinksFunction, LoaderArgs} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import groq from 'groq'
import {PreviewSuspense} from '@sanity/preview-kit'

import styles from '~/styles/app.css'
import Product, {PreviewProduct} from '~/components/Product'
import {client} from '~/sanity/client'
import {productZ} from '~/types/product'
import {getSession} from '~/sessions'

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}]
}

export const loader = async ({params, request}: LoaderArgs) => {
  // If the URL contained a 'secret' query param and it matches the one on the server
  const session = await getSession(request.headers.get('Cookie'))
  const token = session.get('secret') ? process.env.SANITY_READ_TOKEN : false
  const preview = Boolean(token)

  const query = groq`*[_type == "product" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    images,
    content
  }`

  const product = await client
    // Params from the loader uses the filename
    // $slug.tsx has the params { slug: 'hello-world' }
    .fetch(query, params)
    // Parsed with Zod to validate data at runtime
    // and generate a Typescript type
    .then((res) => productZ.parse(res))

  if (!product) {
    return new Response('Not found', {status: 404})
  }

  return json({
    product,
    preview,
    query: preview ? query : null,
    params: preview ? params : null,
    // Note: This makes the token available to the client if they have an active session
    // This is useful to show live preview to unauthenticated users
    // If you would rather not, replace token with `null` and it will rely on your Studio auth
    token: preview ? token : null,
  })
}

export default function ProductPage() {
  // TODO: Solve for why type inference isn't working here
  const {product, preview, query, params, token} = useLoaderData<typeof loader>()

  if (preview) {
    return (
      <PreviewSuspense fallback={<Product {...product} />}>
        <PreviewProduct query={query} params={params} token={token} />
      </PreviewSuspense>
    )
  }

  return <Product {...product} />
}
