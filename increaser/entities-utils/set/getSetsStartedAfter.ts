import { Set } from '@increaser/entities/User'

export const getSetsStartedAfter = (sets: Set[], timestamp: number) =>
  sets.filter((set) => set.start > timestamp)
