import type {LinksFunction, LoaderArgs} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import groq from 'groq'
import {PreviewSuspense} from '@sanity/preview-kit'

import Product, {PreviewProduct} from '~/components/Product'
import {client} from '~/sanity/client'
import type {ProductDocument} from '~/sanity/types/Product'

import styles from '~/styles/app.css'

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}]
}

export const loader = async ({params}: LoaderArgs) => {
  const preview = true
  const query = groq`*[_type == "product" && slug.current == $slug][0]`
  const product: ProductDocument | null = await client.fetch(query, params)

  if (!product) {
    return new Response('Not found', {status: 404})
  }

  return json({
    product,
    preview,
    query: preview ? query : null,
    params: preview ? params : null,
  })
}

export default function ProductPage() {
  const {product, preview, query, params} = useLoaderData<typeof loader>()

  if (preview) {
    return (
      <PreviewSuspense fallback="Loading...">
        <PreviewProduct
          product={product}
          query={query}
          params={params}
          // TODO: REMOVE THIS BEFORE DEPLOYING
          token="asdf"
        />
      </PreviewSuspense>
    )
  }

  return <Product {...product} />
}
