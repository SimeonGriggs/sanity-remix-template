import type {LoaderFunctionArgs, MetaFunction} from '@remix-run/node'
import {json} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'

import {Records} from '~/components/Records'
import type {Loader as RootLoader} from '~/root'
import {useQuery} from '~/sanity/loader'
import {loadQuery} from '~/sanity/loader.server'
import {isStegaEnabled} from '~/sanity/projectDetails'
import {RECORDS_QUERY} from '~/sanity/queries'
import type {RecordStub} from '~/types/record'
import {recordStubsZ} from '~/types/record'

export const meta: MetaFunction<
  typeof loader,
  {
    root: RootLoader
  }
> = ({matches}) => {
  const rootData = matches.find((match) => match.id === `root`)?.data
  const home = rootData ? rootData.initial.data : null
  const title = [home?.title, home?.siteTitle].filter(Boolean).join(' | ')

  return [{title}]
}

export const loader = async ({request}: LoaderFunctionArgs) => {
  const stegaEnabled = isStegaEnabled(request.url)
  const initial = await loadQuery<RecordStub[]>(
    RECORDS_QUERY,
    {},
    {
      perspective: stegaEnabled ? 'previewDrafts' : 'published',
    },
  ).then((res) => ({
    ...res,
    data: res.data ? recordStubsZ.parse(res.data) : null,
  }))

  if (!initial.data) {
    throw new Response('Not found', {status: 404})
  }

  return json({
    initial,
    query: RECORDS_QUERY,
    params: {},
  })
}

export default function Index() {
  const {initial, query, params} = useLoaderData<typeof loader>()
  const {data, loading} = useQuery<typeof initial.data>(query, params, {
    initial,
  })

  if (loading || !data) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:gap-12">
      <Records records={data} />
    </div>
  )
}
