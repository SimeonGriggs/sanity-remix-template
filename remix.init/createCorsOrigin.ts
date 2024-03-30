import {getCliClient} from 'sanity/cli'

const client = getCliClient()
const {projectId} = client.config()
const pathname = `projects/${projectId}/cors`
const corsOrigin = 'http://localhost:3000'

type CorsResponse = {
  id: number
  origin: string
  allowCredentials: boolean
  createdAt: string
  updatedAt: string
  projectId: string
}

async function create() {
  const currentCors = await client.request<CorsResponse[]>({
    uri: pathname,
    method: 'get',
  })

  if (
    currentCors.length > 0 &&
    currentCors.find((c) => c.origin === corsOrigin)
  ) {
    console.log('CORS origins already exist')
    return
  }

  await client.request({
    uri: pathname,
    method: 'post',
    body: {
      origin: corsOrigin,
      allowCredentials: 'true',
    },
  })
}

create()
