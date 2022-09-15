import type {LoaderFunction} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import SanityClient from '@sanity/client'

const client = new SanityClient({
  projectId: '6h1mv88x',
  dataset: 'production',
  useCdn: true,
})

export const loader: LoaderFunction = async ({params}) => {
  const {slug} = params
  const product = await client.fetch(`*[_type == "product" && slug.current == $slug][0]`, {slug})

  return {product}
}

export default function Product() {
  const {product} = useLoaderData()

  return (
    <div className="bg-green-100 p-12 min-h-screen">
      <h1 className="text-2xl mb-6 font-bold">{product.title}</h1>
    </div>
  )
}
