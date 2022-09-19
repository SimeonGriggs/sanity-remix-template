import type {LoaderFunction} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import groq from 'groq'
import Layout from '~/components/Layout'

import SanityContent from '~/components/SanityContent'
import {client} from '~/sanity/client'
import type {ProductDocument} from '~/sanity/types/Product'

export const loader: LoaderFunction = async ({params}) => {
  const {slug} = params
  const product = await client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{ title, content }`,
    {slug}
  )

  if (!product) {
    return new Response('Not found', {status: 404})
  }

  return {product}
}

export default function Product() {
  const {product} = useLoaderData<{product: ProductDocument}>()

  return (
    <Layout>
      {product?.title ? (
        <h1 className="mb-6 text-2xl font-bold text-green-700 md:mb-12 md:text-4xl">
          {product.title}
        </h1>
      ) : null}
      {product?.content && product.content?.length > 0 ? (
        <SanityContent value={product.content} />
      ) : null}
    </Layout>
  )
}
