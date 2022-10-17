import React from 'react'
import {PortableText} from '@portabletext/react'
import SanityImage from './SanityImage'

type ContentProps = {
  value: any[]
}

const components = {
  types: {
    image: SanityImage,
  },
}

export default function SanityContent(props: ContentProps) {
  const {value} = props

  return (
    <div className="prose prose-a:text-green-600 md:prose-xl">
      <PortableText value={value} components={components} />
    </div>
  )
}
