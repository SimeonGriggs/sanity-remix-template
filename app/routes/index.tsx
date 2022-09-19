import type {LoaderFunction} from '@remix-run/node'
import {Link, useLoaderData} from '@remix-run/react'
import groq from 'groq'

import Layout from '~/components/Layout'
import {client} from '~/sanity/client'
import type {ProductDocument} from '~/sanity/types/Product'

export const loader: LoaderFunction = async () => {
  const products = await client.fetch(groq`*[_type == "product"]{ _id, title, slug }`)

  return {products}
}

export default function Index() {
  const {products} = useLoaderData<{products: ProductDocument[]}>()

  return (
    <Layout>
      <h1 className="mb-6 text-2xl font-bold">Welcome to Remix with Sanity Studio v3</h1>
      {products.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6">
          {products.map((product) => (
            <li key={product._id} className="rounded bg-white p-6 shadow md:p-12">
              {product?.slug?.current ? (
                <Link
                  prefetch="render"
                  to={product?.slug?.current}
                  className="text-xl font-bold text-green-600 underline hover:text-green-400"
                >
                  {product.title}
                </Link>
              ) : (
                <span className="text-xl font-bold">{product.title}</span>
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </Layout>
  )
}
