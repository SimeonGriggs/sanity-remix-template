import type {SanityImageObjectStub} from '@sanity/asset-utils'
import urlBuilder from '@sanity/image-url'

import {dataset, projectId} from '~/sanity/projectDetails'

type RecordCoverProps = {
  image?: SanityImageObjectStub & {alt: string}
}

export function RecordCover(props: RecordCoverProps) {
  const {image} = props

  return (
    <div className="aspect-square bg-gray-50">
      {image ? (
        <img
          className="h-auto w-full object-cover shadow-black transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-cyan-200"
          src={urlBuilder({projectId, dataset})
            .image(image)
            .height(800)
            .width(800)
            .fit('max')
            .auto('format')
            .url()}
          alt={image?.alt ?? ``}
          loading="lazy"
        />
      ) : (
        <div className="flex aspect-square w-full items-center justify-center bg-gray-100 text-gray-500">
          Missing Record art
        </div>
      )}
    </div>
  )
}
