import { Set } from 'sets/Set'
import { sum } from '@increaser/utils/sum'

import { getSetDuration } from './getSetDuration'

export const getSetsSum = (sets: Set[]) => sum(sets.map(getSetDuration))
