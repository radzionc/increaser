import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { range } from '@lib/utils/array/range'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { getWeekday } from '@lib/utils/time/getWeekday'
import { getSetDuration } from '@product/entities-utils/set/getSetDuration'
import { useMemo } from 'react'

import { useCurrentWeekSets } from './useCurrentWeekSets'

export const useCurrentWeekMinutesWorkedByDay = () => {
  const sets = useCurrentWeekSets()
  const weekday = useWeekday()

  return useMemo(() => {
    const result = range(weekday + 1).map(() => 0)
    sets.forEach((set) => {
      const index = getWeekday(set.start)
      result[index] += getSetDuration(set)
    })

    return result.map((value) => convertDuration(value, 'ms', 'min'))
  }, [sets, weekday])
}
