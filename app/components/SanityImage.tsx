import type {PortableTextComponentProps} from '@portabletext/react'
import type {SanityImageSource} from '@sanity/asset-utils'
import {getImageDimensions} from '@sanity/asset-utils'
import urlBuilder from '@sanity/image-url'

import {dataset, projectId} from '~/sanity/projectDetails'

type SanityImageAssetWithAlt = SanityImageSource & {alt?: string}

export function SanityImage(
  props: PortableTextComponentProps<SanityImageAssetWithAlt>,
) {
  const {value, isInline} = props

  if (!value) {
    return null
  }

  let image: SanityImageAssetWithAlt | null = null

  if (typeof value === 'string') {
    image = value
  } else if ('asset' in value) {
    image = value.asset
  }

  if (!image) {
    return null
  }

  const {width, height} = getImageDimensions(value)

  return (
    <img
      className="not-prose h-auto w-full"
      src={urlBuilder({projectId, dataset})
        .image(image)
        .width(isInline ? 100 : 800)
        .fit('max')
        .auto('format')
        .url()}
      alt={value.alt || ''}
      loading="lazy"
      style={{
        // Display alongside text if image appears inside a block text span
        display: isInline ? 'inline-block' : 'block',

        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: width / height,
      }}
    />
  )
}
