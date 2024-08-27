import { TaskCadence } from '@increaser/entities/TaskFactory'
import { match } from '@lib/utils/match'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { startOfISOWeek } from 'date-fns'
import { startOfDay, startOfMonth } from 'date-fns'

type Input = {
  cadence: TaskCadence
  at: number
}

export const getCadencePeriodStart = ({ cadence, at }: Input) => {
  return match(cadence, {
    week: () => startOfISOWeek(at).getTime(),
    day: () => startOfDay(at).getTime(),
    workday: () => {
      const dayStartedAt = startOfDay(at).getTime()
      const lastWorkdayStartedAt =
        startOfISOWeek(at).getTime() + convertDuration(4, 'd', 'ms')

      return Math.min(dayStartedAt, lastWorkdayStartedAt)
    },
    month: () => startOfMonth(at).getTime(),
  })
}
