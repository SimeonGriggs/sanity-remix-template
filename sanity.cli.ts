import {defineCliConfig} from 'sanity/cli'

import {projectDetails} from '~/sanity/projectDetails'

export default defineCliConfig({
  api: projectDetails(),
})
