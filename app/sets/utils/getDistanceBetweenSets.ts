import { Set } from 'sets/Set'

export const getDistanceBetweenSets = (prevSet: Set, set: Set) =>
  set.start - prevSet.end
