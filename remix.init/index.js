const {execSync} = require('child_process')

const main = ({rootDirectory}) => {
  console.log(`Preparing Sanity Studio in ${rootDirectory}`)

  execSync('npx sanity@latest init --env', {
    cwd: rootDirectory,
    stdio: 'inherit',
  })

  const envPath = `${rootDirectory}/.env`
  const env = require('fs').readFileSync(envPath, 'utf8')
  const sessionSecret = require('crypto').randomBytes(32).toString('hex')
  require('fs').writeFileSync(
    envPath,
    `${env}SANITY_SESSION_SECRET="${sessionSecret}"\n`,
  )

  console.log(`\nWrote SANITY_SESSION_SECRET to ${envPath}`)

  console.log(
    `\nComplete your ".env" file to match ".env.template" with Sanity API tokens to setup live preview and mutations.`,
  )
  console.log(
    `\nVisit /studio in your application to load Sanity Studio and begin creating content`,
  )
}

module.exports = main
