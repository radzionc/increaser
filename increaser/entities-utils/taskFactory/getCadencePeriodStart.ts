import { TaskCadence } from '@increaser/entities/TaskFactory'
import { match } from '@lib/utils/match'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { getWeekStartedAt } from '@lib/utils/time/getWeekStartedAt'
import { startOfDay, startOfMonth } from 'date-fns'

type Input = {
  cadence: TaskCadence
  at: number
}

export const getCadencePeriodStart = ({ cadence, at }: Input) => {
  return match(cadence, {
    week: () => getWeekStartedAt(at),
    day: () => startOfDay(at).getTime(),
    workday: () => {
      const dayStartedAt = startOfDay(at).getTime()
      const lastWorkdayStartedAt =
        getWeekStartedAt(at) + convertDuration(4, 'd', 'ms')

      return Math.min(dayStartedAt, lastWorkdayStartedAt)
    },
    month: () => startOfMonth(at).getTime(),
  })
}
