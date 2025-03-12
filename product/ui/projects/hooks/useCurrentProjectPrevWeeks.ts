import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { range } from '@lib/utils/array/range'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { toWeek, weekToString } from '@lib/utils/time/Week'
import { useUser } from '@product/ui/user/state/user'
import { useMemo } from 'react'

import { useCurrentProject } from '../CurrentProjectProvider'

export const useCurrentProjectPrevWeeks = (maxWeeks: number) => {
  const { weeks } = useUser()
  const { id } = useCurrentProject()

  const currentWeekStartedAt = useStartOfWeek()

  return useMemo(() => {
    return range(maxWeeks)
      .map((i) => {
        const weekStartedAt =
          currentWeekStartedAt - convertDuration(i + 1, 'w', 'ms')
        const week = toWeek(weekStartedAt)
        const weekKey = weekToString(week)
        const seconds = weeks[weekKey]?.[id] ?? 0

        return {
          ...week,
          seconds,
        }
      })
      .reverse()
  }, [currentWeekStartedAt, id, maxWeeks, weeks])
}
