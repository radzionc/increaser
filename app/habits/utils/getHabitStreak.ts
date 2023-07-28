import { toHabitDate } from './toHabitDate'

export const getHabitStreak = (
  successesSet: Set<string>,
  passedDays: number[],
) => {
  const index = passedDays.findIndex(
    (day) => !successesSet.has(toHabitDate(new Date(day))),
  )

  if (index === -1) {
    return passedDays.length
  }

  return index
}
