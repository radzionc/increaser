import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'
import { ActiveHabit } from '@increaser/entities/Habit'
import { range } from '@lib/utils/array/range'
import { endOfDay, subDays, differenceInDays } from 'date-fns'

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

  const lastDayEndedAt = endOfDay(
    hasSuccessAtDate ? at : subDays(at, 1),
  ).getTime()

  const daysCount = differenceInDays(lastDayEndedAt, startedAt)

  const days = range(daysCount).map((index) =>
    subDays(lastDayEndedAt, index).getTime(),
  )

  const index = days.findIndex((day) => !successesSet.has(toHabitDate(day)))

  if (index === -1) {
    return days.length
  }

  return index
}
