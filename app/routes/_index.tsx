import type {LinksFunction, MetaFunction, SerializeFrom, V2_MetaFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {Link, RouteMatch, useLoaderData, useRouteLoaderData} from '@remix-run/react'
import groq from 'groq'
import type {loader as rootLoader} from '~/root'
import AlbumCover from '~/components/RecordCover'
import Title from '~/components/Title'
import {getClient} from '~/sanity/client'
import tailwind from '~/tailwind.css'
import {recordStubsZ} from '~/types/record'
import type {HomeDocument} from '~/types/home'

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: tailwind}]
}

export const meta: V2_MetaFunction = ({matches}) => {
  const rootData = matches.find((match: RouteMatch) => match.id === `root`) as
    | {data: SerializeFrom<typeof rootLoader>}
    | undefined

  const home = rootData ? rootData.data.home : null
  const title = [home?.title, home?.siteTitle].filter(Boolean).join(' | ')

  return [{title}]
}

export const loader = async () => {
  const query = groq`*[_type == "record"][0...12]{
    _id,
    title,
    "slug": slug.current,
    "artist": artist->title,
    image
  }`

  const records = await getClient()
    .fetch(query)
    .then((res) => (res ? recordStubsZ.parse(res) : null))

  if (!records) {
    throw new Response('Not found', {status: 404})
  }

  return json({records})
}

export default function Index() {
  const {records} = useLoaderData<typeof loader>()
<<<<<<< HEAD:app/routes/index.tsx
  const {home} = useRouteLoaderData(`root`) as SerializeFrom<typeof rootLoader>

  return (
    <div className="grid grid-cols-1 gap-6 md:gap-12">
      {home?.title ? <Title>{home.title}</Title> : null}
      {records.length > 0 ? (
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-12 lg:grid-cols-4">
          {records.map((record) => (
            <li key={record._id} className="group relative flex flex-col">
              <div className="relative overflow-hidden transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:opacity-90">
                <div className="absolute z-0 h-48 w-[200%] translate-x-20 translate-y-20 -rotate-45 bg-gradient-to-b from-white to-transparent opacity-25 mix-blend-overlay transition-transform duration-500 ease-in-out group-hover:translate-y-10 group-hover:translate-x-10 group-hover:opacity-75" />
                <AlbumCover image={record.image} title={record.title} />
              </div>
              <div className="flex flex-col">
                {record?.slug ? (
                  <Link
                    prefetch="intent"
                    to={record?.slug}
                    className="text-bold pt-4 text-xl font-bold tracking-tighter transition-colors duration-100 ease-in-out hover:bg-cyan-400 hover:text-white md:text-3xl"
                  >
                    {record.title}
                    {/* Makes this entire block clickable */}
                    <span className="absolute inset-0" />
                  </Link>
                ) : (
                  <span className="pt-4 text-xl font-bold tracking-tighter">{record.title}</span>
                )}
                {record?.artist ? (
                  <span className="bg-black font-bold leading-none tracking-tighter text-white">
                    {record.artist}
                  </span>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="prose prose-xl mx-auto bg-green-50 p-4">
          <p>No records found, yet!</p>
          <p>
            <a href="/studio">Log in to your Sanity Studio</a> and start creating content!
          </p>
        </div>
      )}
    </div>
=======
  const {home} = useRouteLoaderData(`root`) as {home: HomeDocument}

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-6 md:gap-12">
        {home.title ? <Title>{home.title}</Title> : null}
        {records.length > 0 ? (
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-12 lg:grid-cols-4">
            {records.map((record) => (
              <li key={record._id} className="group relative flex flex-col">
                <div className="relative overflow-hidden transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:opacity-90">
                  <div className="absolute z-0 h-48 w-[200%] translate-x-20 translate-y-20 -rotate-45 bg-gradient-to-b from-white to-transparent opacity-25 mix-blend-overlay transition-transform duration-500 ease-in-out group-hover:translate-x-10 group-hover:translate-y-10 group-hover:opacity-75" />
                  <AlbumCover image={record.image} title={record.title} />
                </div>
                <div className="flex flex-col">
                  {record?.slug ? (
                    <Link
                      prefetch="intent"
                      to={record?.slug}
                      className="text-bold pt-4 text-xl font-bold tracking-tighter transition-colors duration-100 ease-in-out hover:bg-cyan-400 hover:text-white md:text-3xl"
                    >
                      {record.title}
                      {/* Makes this entire block clickable */}
                      <span className="absolute inset-0" />
                    </Link>
                  ) : (
                    <span className="pt-4 text-xl font-bold">{record.title}</span>
                  )}
                  {record?.artist ? (
                    <span className="bg-black font-bold leading-none tracking-tighter text-white">
                      {record.artist}
                    </span>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No records found</p>
        )}
      </div>
    </Layout>
>>>>>>> 5d7ecf1c938238aca88c02841e8aa7a67325bbfa:app/routes/_index.tsx
  )
}
