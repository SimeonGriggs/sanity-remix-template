import * as queryStore from '@sanity/react-loader'

import {client} from '~/sanity/client'
// import {STUDIO_BASEPATH} from '~/sanity/constants'

// In a perfect world, these could be dynamic based on the Request
// But because middleware hasn't landed in Remix
// And server.ts's context is messy to configure (except in Hydrogen!)
// So we're only configuring a token here
// and the stega/perspective options are configured in each loader
const clientWithToken = client.withConfig({
  // Token required for when previewDrafts perspective is set in a loader
  token: process.env.SANITY_READ_TOKEN,
  // There is a bug in the current React Loader where loadQuery does not respect these options
  // So they're disabled by default, which means no server-side Stega
  // But the <LiveMode /> component will do the job for us client-side
  // You do not want this enabled in production
  // stega: {
  //   enabled: true,
  //   studioUrl: STUDIO_BASEPATH,
  // },
})

queryStore.setServerClient(clientWithToken)

export const {loadQuery} = queryStore
