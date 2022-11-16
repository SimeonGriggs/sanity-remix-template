import type {LinksFunction, LoaderArgs, ResponseInit} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import groq from 'groq'
import {PreviewSuspense} from '@sanity/preview-kit'

import styles from '~/styles/app.css'
import Product, {PreviewProduct} from '~/components/Product'
import {client} from '~/sanity/client'
import {productZ} from '~/types/product'

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}]
}

export const loader = async ({params, request}: LoaderArgs) => {
  // If the URL contained a 'secret' query param and it matches the one on the server
  const requestUrl = new URL(request.url)
  const preview = requestUrl.searchParams.get('secret') === process.env.SANITY_PREVIEW_SECRET
  const token = preview ? process.env.SANITY_READ_TOKEN : null

  // TODO: Create a 'session' to store preview authentication
  // TODO: Exit-preview route

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
    token: preview ? token : null,
  })
}

export default function ProductPage() {
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
