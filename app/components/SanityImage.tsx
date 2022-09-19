import React from 'react'
import urlBuilder from '@sanity/image-url'
import {getImageDimensions} from '@sanity/asset-utils'
import type {SanityImageSource} from '@sanity/asset-utils'
import type {PortableTextComponentProps} from '@portabletext/react'
import {projectDetails} from '~/sanity/config'

type SanityImageAssetWithAlt = SanityImageSource & {alt?: string}

export default function SanityImage(props: PortableTextComponentProps<SanityImageAssetWithAlt>) {
  const {value, isInline} = props
  const {width, height} = getImageDimensions(value)

  return (
    <img
      className="not-prose h-auto w-full"
      src={urlBuilder(projectDetails)
        .image(value)
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
