import type {
  LinksFunction,
  LoaderArgs,
  SerializeFrom,
  V2_MetaFunction,
} from '@remix-run/node'
import {json} from '@remix-run/node'
import type {RouteMatch} from '@remix-run/react'
import {useLoaderData, useRouteLoaderData} from '@remix-run/react'
import groq from 'groq'

import {PreviewWrapper} from '~/components/PreviewWrapper'
import {Records} from '~/components/Records'
import {Title} from '~/components/Title'
import {deduplicateDrafts} from '~/lib/deduplicateDrafts'
import {getPreviewToken} from '~/lib/getPreviewToken'
import type {loader as rootLoader} from '~/root'
import {getClient} from '~/sanity/client'
import tailwind from '~/tailwind.css'
import {recordStubsZ} from '~/types/record'

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

export const loader = async ({request}: LoaderArgs) => {
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

  const recordsDeduped =
    records?.length && preview
      ? recordStubsZ.parse(deduplicateDrafts(records))
      : records

  if (!records) {
    throw new Response('Not found', {status: 404})
  }

  return json({
    records: recordsDeduped,
    query: preview ? query : null,
    params: preview ? {} : null,
  })
}

export default function Index() {
  const {records = [], query, params} = useLoaderData<typeof loader>()
  const {
    home,
    query: homeQuery,
    params: homeParams,
  } = useRouteLoaderData(`root`) as SerializeFrom<typeof rootLoader>

  return (
    <div className="grid grid-cols-1 gap-6 md:gap-12">
      <PreviewWrapper
        render={(previewData) =>
          previewData?.title ? <Title>{previewData.title}</Title> : null
        }
        query={homeQuery}
        params={homeParams}
      >
        {home?.title ? <Title>{home.title}</Title> : null}
      </PreviewWrapper>
      <PreviewWrapper
        render={(previewData) => <Records records={previewData} />}
        query={query}
        params={params}
      >
        <Records records={records ?? []} />
      </PreviewWrapper>
    </div>
  )
}
