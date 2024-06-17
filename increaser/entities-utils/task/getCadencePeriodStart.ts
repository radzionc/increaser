import { TaskCadence } from '@increaser/entities/Task'
import { match } from '@lib/utils/match'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { getWeekStartedAt } from '@lib/utils/time/getWeekStartedAt'
import { startOfDay } from 'date-fns'

type Input = {
  cadence: TaskCadence
  timeZone: number
}

export const getCadencePeriodStart = ({ cadence }: Input) => {
  const now = Date.now()
  return match(cadence, {
    week: () => getWeekStartedAt(now),
    day: () => startOfDay(now).getTime(),
    workday: () => {
      const dayStartedAt = startOfDay(now).getTime()
      const lastWorkdayStartedAt =
        getWeekStartedAt(now) + convertDuration(4, 'd', 'ms')

      return Math.min(dayStartedAt, lastWorkdayStartedAt)
    },
  })
}
