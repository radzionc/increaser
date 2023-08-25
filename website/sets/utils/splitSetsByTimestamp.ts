import { Set } from '../Set'

export const splitSetsByTimestamp = (sets: Set[], timestamp: number) => {
  const beforeTimestamp = [] as Set[]
  const afterTimestamp = [] as Set[]

  for (const set of sets) {
    if (set.end < timestamp) {
      beforeTimestamp.push(set)
    } else {
      afterTimestamp.push(set)
    }
  }

  return [beforeTimestamp, afterTimestamp]
}
