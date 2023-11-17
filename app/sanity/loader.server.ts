import {client} from '~/sanity/client'
import {queryStore} from '~/sanity/loader'

export const {loadQuery} = queryStore

queryStore.setServerClient(client)
