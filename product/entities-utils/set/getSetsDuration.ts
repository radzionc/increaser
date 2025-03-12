import { sum } from '@lib/utils/array/sum'
import { Set } from '@product/entities/User'

import { getSetDuration } from './getSetDuration'

export const getSetsDuration = (sets: Set[]) => sum(sets.map(getSetDuration))
