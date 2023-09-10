import { useMemo } from 'react'
import { getSetsSum } from 'sets/helpers/getSetsSum'
import { useStartOfWeek } from '@increaser/ui/hooks/useStartOfWeek'
import { range } from '@increaser/utils/array/range'
import { D_IN_WEEK, MS_IN_DAY } from '@increaser/utils/time'

import { useCurrentWeekSets } from './useCurrentWeekSets'

export const useGroupedByWeekdaySetsTotal = () => {
  const sets = useCurrentWeekSets()

  const startOfWeek = useStartOfWeek()

  return useMemo(() => {
    return range(D_IN_WEEK).map((index) => {
      const dayStartsAt = startOfWeek + MS_IN_DAY * index
      const dayEndsAt = dayStartsAt + MS_IN_DAY
      const daySets = sets.filter(
        (set) => set.end < dayEndsAt && set.start > dayStartsAt,
      )
      return getSetsSum(daySets)
    })
  }, [sets, startOfWeek])
}
