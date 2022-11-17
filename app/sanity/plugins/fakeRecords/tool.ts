import {DocumentsIcon} from '@sanity/icons'
import type {Tool} from 'sanity'

import Faker from './Faker'

export const fakeRecordsTool = (): Tool => ({
  name: 'faker',
  title: 'Faker',
  component: Faker,
  icon: DocumentsIcon,
})
