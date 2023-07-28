import { sum } from 'shared/utils/sum'
import { MS_IN_SEC } from 'utils/time'

import { getSetDuration } from '../helpers/getSetDuration'
import { Set } from '../Set'

export const getSetsTotalInSeconds = (sets: Set[]) => {
  return sum(sets.map((set) => getSetDuration(set) / MS_IN_SEC))
}
