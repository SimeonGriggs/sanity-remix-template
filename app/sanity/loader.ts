import {createQueryStore} from '@sanity/react-loader'

export const {
  // Used only server side
  loadQuery,
  setServerClient,
  // Used only client side
  useQuery,
  useLiveMode,
} = createQueryStore({client: false, ssr: true})
