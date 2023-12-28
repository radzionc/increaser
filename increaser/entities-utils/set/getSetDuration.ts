import { Set } from '@increaser/entities/User'

export const getSetDuration = (set: Set) => Math.abs(set.end - set.start)
