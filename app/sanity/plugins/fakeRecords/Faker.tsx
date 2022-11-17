import React from 'react'
import {Stack, Flex, Box, Text, Button} from '@sanity/ui'
import {useClient} from 'sanity'

import {projectDetails} from '~/sanity/projectDetails'

const {apiVersion} = projectDetails()

export default function Faker() {
  const client = useClient({apiVersion})
  const handleGenerate = React.useCallback(async () => {
    // Generate fake band names
    const bandNames = await fetch(`https://bandname.filiplundby.dk/api/v1/sentence/10`).then(
      (res) => res.json()
    )
    console.log(bandNames)
  }, [])
  return (
    <Stack padding={5}>
      <Button onClick={handleGenerate} text="Generate" />
    </Stack>
  )
}
