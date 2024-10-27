import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'
import { ActiveHabit } from '@increaser/entities/Habit'
import { range } from '@lib/utils/array/range'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { endOfDay, subDays } from 'date-fns'

type GetHabitStreakInput = {
  at: number
  habit: ActiveHabit
}

export const getHabitStreak = ({
  habit: { successes, startedAt },
  at,
}: GetHabitStreakInput) => {
  const successesSet = new Set(successes)

  const hasSuccessAtDate = successesSet.has(toHabitDate(at))

  const passedDayEndedAt = hasSuccessAtDate
    ? endOfDay(at).getTime()
    : endOfDay(subDays(at, 1)).getTime()

  const daysCount = Math.max(
    Math.ceil(convertDuration(passedDayEndedAt - startedAt, 'ms', 'd')),
    0,
  )

  const passedDays = range(daysCount)
    .map((index) => passedDayEndedAt - convertDuration(index + 1, 'ms', 'd'))
    .filter(
      (timestamp) => timestamp > startedAt - convertDuration(1, 'd', 'ms'),
    )

  const index = passedDays.findIndex(
    (day) => !successesSet.has(toHabitDate(day)),
  )

  if (index === -1) {
    return passedDays.length
  }

  return index
}
