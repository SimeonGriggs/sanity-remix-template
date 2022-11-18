import type {LinksFunction, LoaderFunction} from '@remix-run/node'
import {Link, useLoaderData} from '@remix-run/react'
import groq from 'groq'
import AlbumCover from '~/components/RecordCover'

import Layout from '~/components/Layout'
import Title from '~/components/Title'
import {client} from '~/sanity/client'

import styles from '~/styles/app.css'
import type {RecordDocument} from '~/types/record'

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}]
}

export const loader: LoaderFunction = async () => {
  const records = await client.fetch(groq`*[_type == "record"][0...12]{
    _id,
    title,
    "slug": slug.current,
    "artist": artist->title,
    image
  }`)

  return {records}
}

export default function Index() {
  const {records} = useLoaderData<{records: RecordDocument[]}>()

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-6 md:gap-12">
        <Title>Sanity Studio v3 with Remix 🤘</Title>
        {records.length > 0 ? (
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-12 lg:grid-cols-4">
            {records.map((record) => (
              <li key={record._id} className="group relative flex flex-col gap-4">
                <div className="transition-opacity duration-100 ease-in-out group-hover:opacity-90">
                  <AlbumCover image={record.image} title={record.title} />
                </div>
                {record?.slug ? (
                  <Link
                    prefetch="intent"
                    to={record?.slug}
                    className="text-bold bg-white text-xl font-bold tracking-tighter transition-colors duration-100 ease-in-out hover:bg-cyan-400 hover:text-white md:text-3xl"
                  >
                    {record.title}
                    <span className="absolute inset-0" />
                  </Link>
                ) : (
                  <span className="text-xl font-bold">{record.title}</span>
                )}
                {record?.artist ? (
                  <span className="bg-black font-bold leading-none tracking-tighter text-white">
                    {record.artist}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <p>No records found</p>
        )}
      </div>
    </Layout>
  )
}
