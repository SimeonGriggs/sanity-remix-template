import React from 'react'
import {definePreview} from '@sanity/preview-kit'

import Layout from '~/components/Layout'
import SanityContent from '~/components/SanityContent'
import type {ProductDocument} from '~/sanity/types/Product'
import {projectDetails} from '~/sanity/projectDetails'

export default function Product(props: ProductDocument) {
  const {title, content, token} = props
  const data = usePreview(token, `*[]`)

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
  product: ProductDocument
  query: string
  params: {[key: string]: string}
  token: string
}

const {projectId, dataset} = projectDetails()

const usePreview = definePreview({projectId, dataset})

export function PreviewProduct(props: PreviewProductProps) {
  const {product, query, params, token} = props
  console.log(`initial data`, product)

  const data = usePreview(token, query, params)

  return <Product {...data} />
}
