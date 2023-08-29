import { useMemo } from 'react'
import { getDaySets } from 'sets/helpers/getDaySets'
import { Set } from 'sets/Set'
import { useStartOfWeek } from 'shared/hooks/useStartOfWeek'
import { range } from '@increaser/utils/array/range'
import { D_IN_WEEK, MS_IN_DAY } from '@increaser/utils/time'

import { useCurrentWeekSets } from './useCurrentWeekSets'

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
