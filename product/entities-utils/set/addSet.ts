import { order } from '@lib/utils/array/order'
import { withoutDuplicates } from '@lib/utils/array/withoutDuplicates'
import { Set } from '@product/entities/User'

import { areSameSets } from './areSameSets'

type AddSetInput = {
  sets: Set[]
  value: Set
}

export const addSet = ({ sets, value }: AddSetInput) =>
  order(
    withoutDuplicates([...sets, value], areSameSets),
    (set) => set.start,
    'asc',
  )
