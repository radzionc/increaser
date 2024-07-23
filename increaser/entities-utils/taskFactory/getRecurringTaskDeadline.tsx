import { TaskCadence } from '@increaser/entities/TaskFactory'
import { match } from '@lib/utils/match'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { getWeekEndedAt } from '@lib/utils/time/getWeekEndedAt'
import { endOfDay, getDaysInMonth, endOfMonth } from 'date-fns'

type Input = {
  cadence: TaskCadence
  deadlineIndex?: number | null
  at: number
}

export const getRecurringTaskDeadline = ({
  cadence,
  deadlineIndex,
  at,
}: Input) =>
  match(cadence, {
    workday: () => {
      const dayEndedAt = endOfDay(at).getTime()
      const lastWorkdayEndedAt =
        getWeekEndedAt(at) - convertDuration(2, 'd', 'ms')

      return Math.min(dayEndedAt, lastWorkdayEndedAt)
    },
    day: () => endOfDay(at).getTime(),
    week: () =>
      getWeekEndedAt(at) - convertDuration(6 - (deadlineIndex ?? 0), 'd', 'ms'),
    month: () => {
      const daysInMonth = getDaysInMonth(at)
      return (
        endOfMonth(at).getTime() -
        convertDuration(
          daysInMonth - 1 - Math.min(deadlineIndex ?? 0, daysInMonth - 1),
          'd',
          'ms',
        )
      )
    },
  })
