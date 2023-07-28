import { useMemo } from 'react'
import { getSetsSum } from 'sets/helpers/getSetsSum'
import { MS_IN_MIN } from 'utils/time'

import { useCurrentWeekSets } from './useCurrentWeekSets'

export const useCurrentWeekDoneMinutes = () => {
  const sets = useCurrentWeekSets()
  return useMemo(() => Math.round(getSetsSum(sets) / MS_IN_MIN), [sets])
}
