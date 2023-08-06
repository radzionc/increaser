import { Set } from '@increaser/entities/User'
import { sum } from '@increaser/ui/shared/utils/sum'
import { getSetDuration } from './getSetDuration'

export const getSetsDuration = (sets: Set[]) => sum(sets.map(getSetDuration))
