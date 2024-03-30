const {execSync} = require('child_process')

const main = ({rootDirectory}) => {
  console.log(`Preparing Sanity Studio in ${rootDirectory}`)

  execSync('npx sanity@latest init --env', {
    cwd: rootDirectory,
    stdio: 'inherit',
  })

  // Write session secret to .env
  const envPath = `${rootDirectory}/.env`
  const env = require('fs').readFileSync(envPath, 'utf8')
  const sessionSecret = require('crypto').randomBytes(32).toString('hex')
  require('fs').writeFileSync(
    envPath,
    `${env}SANITY_SESSION_SECRET="${sessionSecret}"\n`,
  )

  console.log(`\nWrote SANITY_SESSION_SECRET to ${envPath}`)

  // Create CORS origin for http://localhost:3000
  execSync(
    'npx sanity@latest exec ./remix.init/createCorsOrigin.ts --with-user-token',
    {
      cwd: rootDirectory,
      stdio: 'inherit',
    },
  )

  console.log(`\nAdded http://localhost:3000 to CORS origins`)

  // Create viewer token for live preview
  execSync(
    `npx sanity@latest exec ./remix.init/createViewerToken.ts --with-user-token -- --root=${rootDirectory}`,
    {
      cwd: rootDirectory,
      stdio: 'inherit',
    },
  )

  console.log(`\nCreated viewer token for live preview`)

  console.log(
    `\nComplete your ".env" file to match ".env.template" with Sanity API tokens to setup live preview and mutations.`,
  )
  console.log(
    `\nVisit /studio in your application to load Sanity Studio and begin creating content`,
  )
}

module.exports = main
