import * as queryStore from '@sanity/react-loader'

import {client} from '~/sanity/client'

let hasSetServerClient = false
if (!hasSetServerClient) {
  if (!process.env.SANITY_READ_TOKEN) {
    throw new Error(
      `Setup "SANITY_READ_TOKEN" with a token with "Viewer" permissions to your environment variables. Create one at
      https://sanity.io/manage/project/${client.config().projectId}/api#tokens`,
    )
  }

  const clientWithToken = client.withConfig({
    token: process.env.SANITY_READ_TOKEN,
  })

  // We need to set the client used by `loadQuery` here, it only affects the server and ensures the browser bundle isn't bloated
  queryStore.setServerClient(clientWithToken)
  hasSetServerClient = true
}

export const {loadQuery} = queryStore
