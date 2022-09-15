import type {LoaderFunction} from '@remix-run/node'
import {Link, useLoaderData} from '@remix-run/react'
import SanityClient from '@sanity/client'

const client = new SanityClient({
  projectId: '6h1mv88x',
  dataset: 'production',
  useCdn: true,
})

export const loader: LoaderFunction = async () => {
  const products = await client.fetch(`*[_type == "product"]`)

  return {products}
}

export default function Index() {
  const {products} = useLoaderData()

  return (
    <div className="bg-green-100 p-12 min-h-screen">
      <h1 className="text-2xl mb-6 font-bold">Welcome to Remix</h1>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <Link to={product?.slug?.current} className="text-green-600 underline">
                {product.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
