import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { useCurrentProject } from '../components/ProjectView/CurrentProjectProvider'
import { useMemo } from 'react'
import { range } from '@lib/utils/array/range'
import { areSameWeek, toWeek } from '@lib/utils/time/Week'
import { convertDuration } from '@lib/utils/time/convertDuration'

export const useCurrentProjectPrevWeeks = (maxWeeks: number) => {
  const { weeks } = useCurrentProject()

  const currentWeekStartedAt = useStartOfWeek()

  return useMemo(() => {
    return range(maxWeeks)
      .map((i) => {
        const weekStartedAt =
          currentWeekStartedAt - convertDuration(i + 1, 'w', 'ms')
        const week = toWeek(weekStartedAt)
        const seconds = weeks.find((w) => areSameWeek(w, week))?.seconds || 0

        return {
          ...week,
          seconds,
        }
      })
      .reverse()
  }, [maxWeeks, currentWeekStartedAt, weeks])
}
