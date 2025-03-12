import { match } from '@lib/utils/match'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { TaskCadence } from '@product/entities/TaskFactory'
import { endOfISOWeek } from 'date-fns'
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
        endOfISOWeek(at).getTime() - convertDuration(2, 'd', 'ms')

      return Math.min(dayEndedAt, lastWorkdayEndedAt)
    },
    day: () => endOfDay(at).getTime(),
    week: () =>
      endOfISOWeek(at).getTime() -
      convertDuration(6 - (deadlineIndex ?? 0), 'd', 'ms'),
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
