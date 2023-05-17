import type {SanityImageObjectStub} from '@sanity/asset-utils'
import urlBuilder from '@sanity/image-url'
import React from 'react'

import {projectDetails} from '~/sanity/projectDetails'

type RecordCoverProps = {
  title?: string | null
  image?: SanityImageObjectStub
}

export function RecordCover(props: RecordCoverProps) {
  const {title, image} = props

  return (
    <div className="aspect-square bg-gray-50">
      {image ? (
        <img
          className="h-auto w-full object-cover shadow-black transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-cyan-200"
          src={urlBuilder(projectDetails())
            // @ts-ignore
            .image(image.asset._ref)
            .height(800)
            .width(800)
            .fit('max')
            .auto('format')
            .url()}
          alt={String(title) ?? ``}
          loading="lazy"
        />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center bg-gray-100 text-gray-500">
          {title ?? `Missing Record art`}
        </div>
      )}
    </div>
  )
}
