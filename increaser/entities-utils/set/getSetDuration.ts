import { Set } from '@increaser/entities/User'

export const getSetDuration = (set: Pick<Set, 'start' | 'end'>) =>
  Math.abs(set.end - set.start)
