import {Card, Code, Flex} from '@sanity/ui'
import React from 'react'

import {OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH} from '~/routes/resource.og'

export default function OGPreview({document, options}: any) {
  const {displayed} = document
  const url = React.useMemo(() => options.url(displayed), [displayed, options])

  return (
    <Flex
      height="fill"
      direction="column"
      align="flex-start"
      padding={5}
      gap={5}
    >
      <Card shadow={2}>
        <Flex>
          <img
            src={url}
            alt="OG Preview"
            width={OG_IMAGE_WIDTH}
            height={OG_IMAGE_HEIGHT}
            style={{width: `100%`, height: `auto`}}
          />
        </Flex>
      </Card>
      <Code size={0}>{url}</Code>
    </Flex>
  )
}
