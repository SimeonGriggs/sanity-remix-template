import type {LoaderFunction} from '@remix-run/node'
import {Link, useLoaderData} from '@remix-run/react'
import SanityClient from '@sanity/client'

import Layout from '~/components/Layout'

const client = new SanityClient({
  projectId: '6h1mv88x',
  dataset: 'production',
  apiVersion: `2022-09-19`,
  useCdn: true,
})

export const loader: LoaderFunction = async () => {
  const products = await client.fetch(`*[_type == "product"]`)

  return {products}
}

export default function Index() {
  const {products} = useLoaderData()

  return (
    <Layout>
      <h1 className="mb-6 text-2xl font-bold">Welcome to Remix</h1>
      {products.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6">
          {products.map((product) => (
            <li key={product._id} className="rounded bg-white p-6 shadow md:p-12">
              <Link
                to={product?.slug?.current}
                className="text-xl font-bold text-green-600 underline hover:text-green-400"
              >
                {product.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </Layout>
  )
}
