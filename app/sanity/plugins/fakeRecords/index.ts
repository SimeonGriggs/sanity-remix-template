import {definePlugin} from 'sanity'

import {fakeRecordsTool} from './tool'

export const fakeRecords = definePlugin(() => {
  return {
    name: 'fake-records',
    tools: [fakeRecordsTool()],
  }
})
