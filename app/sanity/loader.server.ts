import * as queryStore from '@sanity/react-loader'

import {client} from '~/sanity/client'

const clientWithToken = client.withConfig({
  token: process.env.SANITY_READ_TOKEN,
})

// @ts-expect-error
if (!globalThis.hasSetServerClient) {
  // We need to set the client used by `loadQuery` here, it only affects the server and ensures the browser bundle isn't bloated
  queryStore.setServerClient(clientWithToken)
  // @ts-expect-error
  globalThis.hasSetServerClient = true
}

export const {loadQuery} = queryStore
