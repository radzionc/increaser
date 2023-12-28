import { Set } from '@increaser/entities/User'
import { MS_IN_SEC } from '@lib/utils/time'

export const getSetDurationInSeconds = (set: Set) =>
  Math.round(Math.abs(set.end - set.start) / MS_IN_SEC)
