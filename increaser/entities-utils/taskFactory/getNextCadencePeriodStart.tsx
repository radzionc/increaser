import { TaskCadence } from '@increaser/entities/TaskFactory'
import { match } from '@lib/utils/match'
import { addDays, addMonths, addWeeks, startOfISOWeek } from 'date-fns'
import { getCadencePeriodStart } from './getCadencePeriodStart'

type Input = {
  cadence: TaskCadence
  at: number
}

export const getNextCadencePeriodStart = ({ cadence, at }: Input) => {
  const currentPeriodStart = getCadencePeriodStart({ cadence, at })

  return match(cadence, {
    week: () => addWeeks(currentPeriodStart, 1).getTime(),
    day: () => addDays(currentPeriodStart, 1).getTime(),
    workday: () => addWeeks(startOfISOWeek(at), 1).getTime(),
    month: () => addMonths(currentPeriodStart, 1).getTime(),
  })
}
