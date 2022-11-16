import React from 'react'
import {definePreview} from '@sanity/preview-kit'

import Layout from '~/components/Layout'
import SanityContent from '~/components/SanityContent'
import {projectDetails} from '~/sanity/projectDetails'
import type {Product as ProductDocument} from '~/types/product'

export default function Product(props: ProductDocument) {
  const {title, content} = props

  return (
    <Layout>
      {title ? (
        <h1 className="mb-6 text-2xl font-bold text-green-700 md:mb-12 md:text-4xl">{title}</h1>
      ) : null}
      {content && content?.length > 0 ? <SanityContent value={content} /> : null}
    </Layout>
  )
}

type PreviewProductProps = {
  query: string
  params: {[key: string]: string}
  token: string
}

const {projectId, dataset} = projectDetails()
const usePreview = definePreview({projectId, dataset})

export function PreviewProduct(props: PreviewProductProps) {
  const {query, params, token} = props
  console.log(props)

  const data = usePreview(token ? token : null, query, params)

  return <Product {...data} />
}
