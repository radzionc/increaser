import { range } from '@lib/utils/array/range'
import { without } from '@lib/utils/array/without'
import { D_IN_WEEK } from '@lib/utils/time'
import { getWeekday } from '@lib/utils/time/getWeekday'
import { startOfDay, addDays } from 'date-fns'

type Input = {
  weekends: number[]
  at: number
}

export const getNextWorkday = ({ weekends, at }: Input) => {
  const currentWeekday = getWeekday(at)

  const [firstWorkdayIndex] = without(range(D_IN_WEEK), ...weekends)

  return startOfDay(
    addDays(at, D_IN_WEEK - currentWeekday + firstWorkdayIndex),
  ).getTime()
}
