import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import LiveQuery from '@sanity/preview-kit/live-query'
import groq from 'groq'

import {Records} from '~/components/Records'
import {Title} from '~/components/Title'
import {getPreviewToken} from '~/lib/getPreviewToken'
import {useRootLoaderData} from '~/lib/useRootLoaderData'
import type {Loader as RootLoader} from '~/root'
import {getClient} from '~/sanity/client'
import tailwind from '~/tailwind.css'
import {recordStubsZ} from '~/types/record'

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: tailwind}]
}

export const meta: MetaFunction<
  typeof loader,
  {
    root: RootLoader
  }
> = ({data, matches}) => {
  const rootData = matches.find((match) => match.id === `root`)?.data
  const home = rootData ? rootData.home : null
  const title = [home?.title, home?.siteTitle].filter(Boolean).join(' | ')

  return [{title}]
}

export const loader = async ({request}: LoaderFunctionArgs) => {
  const {preview} = await getPreviewToken(request)
  const query = groq`*[_type == "record"][0...12]|order(title asc){
    _id,
    _type,
    title,
    "slug": slug.current,
    "artist": artist->title,
    image
  }`

  const records = await getClient(preview)
    .fetch(query)
    .then((res) => (res ? recordStubsZ.parse(res) : null))

  if (!records) {
    throw new Response('Not found', {status: 404})
  }

  return json({
    records,
    query: preview ? query : ``,
    params: preview ? {} : {},
  })
}

export default function Index() {
  const {records = [], query, params} = useLoaderData<typeof loader>()
  const rootData = useRootLoaderData()

  return (
    <div className="grid grid-cols-1 gap-6 md:gap-12">
      <LiveQuery
        enabled={Boolean(rootData.preview)}
        query={rootData.query}
        params={rootData.params}
        initialData={rootData.home}
      >
        <Title data={rootData.home} />
      </LiveQuery>

      {/* <PreviewWrapper
        data={records}
        render={(data) => <Records records={data ?? []} />}
        query={query}
        params={params}
      /> */}
    </div>
  )
}
