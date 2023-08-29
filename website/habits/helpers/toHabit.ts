import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'
import { Habit, HabitResponse } from 'habits/Habit'
import { getHabitStreak } from 'habits/utils/getHabitStreak'
import { range } from '@increaser/utils/array/range'
import { DefaultTheme } from 'styled-components'
import { MS_IN_DAY, MS_IN_SEC } from '@increaser/utils/time'

export const toHabit = (
  habitResponse: HabitResponse,
  todayStartedAt: number,
  theme: DefaultTheme,
): Habit => {
  const successesSet = new Set(habitResponse.successes)

  const hasSuccessToday = successesSet.has(
    toHabitDate(new Date(todayStartedAt)),
  )
  const passedDayEndedAt = hasSuccessToday
    ? todayStartedAt + MS_IN_DAY
    : todayStartedAt

  const daysCount = Math.max(
    Math.ceil(
      (passedDayEndedAt - habitResponse.startedAt * MS_IN_SEC) / MS_IN_DAY,
    ),
    0,
  )

  const passedDays = range(daysCount)
    .map((index) => passedDayEndedAt - (index + 1) * MS_IN_DAY)
    .filter(
      (timestamp) =>
        timestamp > habitResponse.startedAt * MS_IN_SEC - MS_IN_DAY,
    )

  return {
    ...habitResponse,
    successesSet,
    passedDays,
    hslaColor: theme.colors.getLabelColor(habitResponse.color),
    streak: getHabitStreak(successesSet, passedDays),
  }
}
