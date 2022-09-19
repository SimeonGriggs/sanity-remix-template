import type {LoaderFunction} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import SanityClient from '@sanity/client'
import groq from 'groq'
import Layout from '~/components/Layout'

import SanityContent from '~/components/SanityContent'

const client = new SanityClient({
  projectId: '6h1mv88x',
  dataset: 'production',
  useCdn: true,
})

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
  const {product} = useLoaderData()
  console.log(product)

  return (
    <Layout>
      <h1 className="mb-6 text-2xl font-bold text-green-700 md:mb-12 md:text-4xl">
        {product.title}
      </h1>
      {product?.content?.length > 0 ? <SanityContent value={product.content} /> : null}
    </Layout>
  )
}
