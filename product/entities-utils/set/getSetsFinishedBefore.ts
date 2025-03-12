import { Set } from '@product/entities/User'

export const getSetsFinishedBefore = (sets: Set[], timestamp: number) =>
  sets.filter((set) => set.end < timestamp)
