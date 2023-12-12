import {stegaClient} from '~/sanity/client'
import {loadQuery, setServerClient} from '~/sanity/loader'

setServerClient(stegaClient)

export {loadQuery}
