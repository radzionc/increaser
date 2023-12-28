import { Set } from '@increaser/entities/User'

export const splitSetsByTimestamp = (sets: Set[], timestamp: number) => {
  const beforeTimestamp = []
  const afterTimestamp = []

  for (const set of sets) {
    if (set.end < timestamp) {
      beforeTimestamp.push(set)
    } else {
      afterTimestamp.push(set)
    }
  }

  return { beforeTimestamp, afterTimestamp }
}
