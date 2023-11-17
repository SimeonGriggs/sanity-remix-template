const {execSync} = require('child_process')

const main = ({rootDirectory}) => {
  console.log(`Preparing Sanity Studio in ${rootDirectory}`)

  execSync('npx sanity@latest init --env', {
    cwd: rootDirectory,
    stdio: 'inherit',
  })

  console.log(
    `Complete your ".env" file with values from ".env.template" to setup live preview and mutations.`,
  )
  console.log(
    `Visit /studio in your application to load Sanity Studio and begin creating content`,
  )
}

module.exports = main
