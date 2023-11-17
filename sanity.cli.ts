import {defineCliConfig} from 'sanity/cli'

import {dataset, projectId} from '~/sanity/projectDetails'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
})
