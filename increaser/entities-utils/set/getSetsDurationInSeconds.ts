import { Set } from '@increaser/entities/User'
import { getSetsDuration } from './getSetsDuration'
import { MS_IN_SEC } from '@lib/utils/time'

export const getSetsDurationInSeconds = (sets: Set[]) =>
  Math.round(getSetsDuration(sets) / MS_IN_SEC)
