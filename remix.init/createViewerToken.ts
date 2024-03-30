import {getCliClient} from 'sanity/cli'

const client = getCliClient()
const {projectId} = client.config()
const pathname = `projects/${projectId}/tokens`

async function create() {
  // Get from arguments passed to script
  const rootDirectory = process.argv
    .find((arg) => arg.startsWith('root='))
    ?.split('=')[1]

  if (!rootDirectory) {
    throw new Error('rootDirectory not found')
  }

  const {key: token} = await client.request<{key: string}>({
    uri: pathname,
    method: 'post',
    body: {
      label: 'Preview',
      roleName: 'viewer',
    },
  })

  if (!token) {
    throw new Error('No token in response')
  }

  // Write key to .env
  const envPath = `${rootDirectory}/.env`
  const env = require('fs').readFileSync(envPath, 'utf8')
  require('fs').writeFileSync(envPath, `${env}SANITY_READ_TOKEN="${token}"\n`)
}

create()
