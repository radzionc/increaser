import { Interval } from '@lib/utils/interval/Interval'
import { useMemo } from 'react'
import { useWorkTimeReportStartedAt } from './useWorkTimeReportStartedAt'
import { useWorkTimeReportDaysCount } from './useWorkTimeReportDaysCount'
import { useUser } from '@increaser/ui/user/state/user'
import { range } from '@lib/utils/array/range'
import { startOfDay } from 'date-fns'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useWorkTimeReportLastDayStartedAt } from './useWorkTimeReportLastDayStartedAt'

export const useWorkTimeReportDays = () => {
  const startedAt = useWorkTimeReportStartedAt()
  const daysCount = useWorkTimeReportDaysCount()
  const lastDayStartedAt = useWorkTimeReportLastDayStartedAt()
  const { sets } = useUser()

  const days = useMemo(() => {
    const result: (Interval | null)[] = range(daysCount).map(() => null)

    sets.forEach((set) => {
      const dayStartedAt = startOfDay(set.start).getTime()
      if (dayStartedAt < startedAt || dayStartedAt > lastDayStartedAt) {
        return
      }

      const dayIndex = convertDuration(dayStartedAt - startedAt, 'ms', 'd')
      const day = result[dayIndex]
      const [start, end] = [set.start, set.end].map((timestamp) =>
        convertDuration(timestamp - dayStartedAt, 'ms', 'min'),
      )

      if (!day) {
        result[dayIndex] = {
          start: start,
          end: end,
        }
      } else {
        result[dayIndex] = {
          start: Math.min(day.start, start),
          end: Math.max(day.end, end),
        }
      }
    })

    return result
  }, [daysCount, lastDayStartedAt, sets, startedAt])

  return days
}
