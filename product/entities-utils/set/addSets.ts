import { order } from '@lib/utils/array/order'
import { withoutDuplicates } from '@lib/utils/array/withoutDuplicates'
import { Set } from '@product/entities/User'

import { areSameSets } from './areSameSets'

type AddSetsInput = {
  prev: Set[]
  value: Set[]
}

export const addSets = ({ prev, value }: AddSetsInput) =>
  order(
    withoutDuplicates([...prev, ...value], areSameSets),
    (set) => set.start,
    'asc',
  )
