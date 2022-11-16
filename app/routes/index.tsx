import type {LinksFunction, LoaderFunction} from '@remix-run/node'
import {Link, useLoaderData} from '@remix-run/react'
import urlBuilder from '@sanity/image-url'
import groq from 'groq'

import Layout from '~/components/Layout'
import {client} from '~/sanity/client'
import {projectDetails} from '~/sanity/projectDetails'
import type {ProductDocument} from '~/sanity/types/Product'

import styles from '~/styles/app.css'

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}]
}

export const loader: LoaderFunction = async () => {
  const products = await client.fetch(groq`*[_type == "product"][0...12]`)

  return {products}
}

export default function Index() {
  const {products} = useLoaderData<{products: ProductDocument[]}>()

  return (
    <Layout>
      <h1 className="mb-6 text-2xl font-bold md:mb-12">Welcome to Remix with Sanity Studio v3</h1>
      {products.length > 0 ? (
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-12">
          {products.map((product) => (
            <li key={product._id} className="flex flex-col gap-4">
              <div className="aspect-video rounded-lg bg-gray-50">
                {product?.images?.length > 0 ? (
                  <img
                    className="h-auto w-full rounded-lg"
                    src={urlBuilder(projectDetails())
                      .image(product.images[0].asset._ref)
                      .width(800)
                      .fit('max')
                      .auto('format')
                      .url()}
                    alt={product.title}
                    loading="lazy"
                  />
                ) : null}
              </div>
              {product?.slug?.current ? (
                <Link
                  prefetch="intent"
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
