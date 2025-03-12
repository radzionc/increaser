import { Set } from '@product/entities/User'

export const getDistanceBetweenSets = (prevSet: Set, set: Set) =>
  set.start - prevSet.end
