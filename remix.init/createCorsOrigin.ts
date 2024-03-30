import {getCliClient} from 'sanity/cli'

const client = getCliClient()
const {projectId} = client.config()
const pathname = `projects/${projectId}/cors`

async function create() {
  await client.request({
    uri: pathname,
    method: 'post',
    body: {
      origin: 'http://localhost:3000',
      allowCredentials: 'true',
    },
  })
}

create()
