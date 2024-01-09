import { useMemo } from 'react'
import { getDaySets } from '@increaser/app/sets/helpers/getDaySets'
import { Set } from '@increaser/app/sets/Set'
import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { range } from '@lib/utils/array/range'
import { D_IN_WEEK, MS_IN_DAY } from '@lib/utils/time'
import { useCurrentWeekSets } from '@increaser/ui/sets/hooks/useCurrentWeekSets'

export interface Day {
  startsAt: number
  sets: Set[]
}

export const useGroupedByDayCurrentWeekSets = () => {
  const currentWeekStartedAt = useStartOfWeek()
  const sets = useCurrentWeekSets()

  const days: Day[] = useMemo(() => {
    return range(D_IN_WEEK).map((weekday) => {
      const startsAt = currentWeekStartedAt + weekday * MS_IN_DAY

      return {
        sets: getDaySets(sets, startsAt),
        startsAt,
      }
    })
  }, [currentWeekStartedAt, sets])

  return days
}
