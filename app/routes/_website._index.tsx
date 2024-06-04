import type {LoaderFunctionArgs, MetaFunction} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {useQuery} from '@sanity/react-loader'

import {Records} from '~/components/Records'
import type {loader as layoutLoader} from '~/routes/_website'
import {loadQuery} from '~/sanity/loader.server'
import {loadQueryOptions} from '~/sanity/loadQueryOptions.server'
import {RECORDS_QUERY} from '~/sanity/queries'
import type {RecordStub} from '~/types/record'
import {recordStubsZ} from '~/types/record'

export const meta: MetaFunction<
  typeof loader,
  {
    'routes/_website': typeof layoutLoader
  }
> = ({matches}) => {
  const layoutData = matches.find(
    (match) => match.id === `routes/_website`,
  )?.data
  const home = layoutData ? layoutData.initial.data : null
  const title = [home?.title, home?.siteTitle].filter(Boolean).join(' | ')

  return [{title}]
}

export const loader = async ({request}: LoaderFunctionArgs) => {
  const {options} = await loadQueryOptions(request.headers)
  const query = RECORDS_QUERY
  const params = {}
  const initial = await loadQuery<RecordStub[]>(query, params, options).then(
    (res) => ({
      ...res,
      data: res.data ? recordStubsZ.parse(res.data) : null,
    }),
  )

  if (!initial.data) {
    throw new Response('Not found', {status: 404})
  }

  return {initial, query, params}
}

export default function Index() {
  const {initial, query, params} = useLoaderData<typeof loader>()
  const {data} = useQuery<typeof initial.data>(query, params, {
    // There's a TS issue with how initial comes over the wire
    // @ts-expect-error
    initial,
  })

  return data ? <Records records={data} /> : null
}
