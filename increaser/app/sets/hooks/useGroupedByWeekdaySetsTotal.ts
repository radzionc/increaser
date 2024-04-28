import { useMemo } from 'react'
import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { range } from '@lib/utils/array/range'
import { D_IN_WEEK, MS_IN_DAY } from '@lib/utils/time'
import { useCurrentWeekSets } from '@increaser/ui/sets/hooks/useCurrentWeekSets'

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
      return getSetsDuration(daySets)
    })
  }, [sets, startOfWeek])
}
