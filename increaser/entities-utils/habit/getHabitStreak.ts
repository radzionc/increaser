import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'
import { Habit } from '@increaser/entities/Habit'
import { range } from '@lib/utils/array/range'
import { convertDuration } from '@lib/utils/time/convertDuration'

type GetHabitStreakInput = {
  at: number
  habit: Habit
}

export const getHabitStreak = ({
  habit: { successes, startedAt },
  at,
}: GetHabitStreakInput) => {
  const successesSet = new Set(successes)

  const hasSuccessToday = successesSet.has(toHabitDate(at))

  const passedDayEndedAt = hasSuccessToday
    ? at + convertDuration(1, 'd', 'ms')
    : at

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
