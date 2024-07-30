import { areSameSets } from '@increaser/app/sets/helpers/areSameSets'
import { Set } from '@increaser/entities/User'
import { order } from '@lib/utils/array/order'
import { withoutDuplicates } from '@lib/utils/array/withoutDuplicates'

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
