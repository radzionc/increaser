import { Set } from '@increaser/entities/User'
import { sum } from '@lib/utils/array/sum'
import { getSetDuration } from './getSetDuration'

export const getSetsDuration = (sets: Set[]) => sum(sets.map(getSetDuration))
