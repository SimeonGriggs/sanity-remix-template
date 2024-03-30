import {defineCliConfig} from 'sanity/cli'

// We can assume this file will only
// be read in a Node.js environment
// where process is defined
export default defineCliConfig({
  api: {
    projectId: process.env.VITE_SANITY_PROJECT_ID,
    dataset: process.env.VITE_SANITY_DATASET,
  },
})
