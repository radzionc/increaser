import { Set } from '@increaser/app/sets/Set'
import { sum } from '@lib/utils/array/sum'

import { getSetDuration } from './getSetDuration'

export const getSetsSum = (sets: Set[]) => sum(sets.map(getSetDuration))
