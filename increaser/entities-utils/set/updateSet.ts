import { Set } from '@increaser/entities/User'
import { Interval } from '@lib/utils/interval/Interval'
import { addSet } from './addSet'
import { deleteSet } from './deleteSet'

type UpdateSetInput = {
  sets: Set[]
  old: Interval
  new: Set
}

export const updateSet = (input: UpdateSetInput) => {
  return addSet({
    sets: deleteSet({ sets: input.sets, value: input.old }),
    value: input.new,
  })
}
