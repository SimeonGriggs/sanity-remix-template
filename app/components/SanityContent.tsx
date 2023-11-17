import {PortableText} from '@portabletext/react'

import {SanityImage} from '~/components/SanityImage'

type ContentProps = {
  value: any[]
}

const components = {
  types: {
    image: SanityImage,
  },
}

export function SanityContent(props: ContentProps) {
  const {value} = props

  return (
    <div className="prose font-serif dark:prose-invert lg:prose-2xl prose-a:text-cyan-600 dark:prose-a:text-cyan-200">
      <PortableText value={value} components={components} />
    </div>
  )
}
