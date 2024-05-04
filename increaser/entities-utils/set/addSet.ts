import { Set } from '@increaser/entities/User'
import { order } from '@lib/utils/array/order'

type AddSetInput = {
  sets: Set[]
  value: Set
}

export const addSet = ({ sets, value }: AddSetInput) =>
  order([...sets, value], (set) => set.start, 'asc')
