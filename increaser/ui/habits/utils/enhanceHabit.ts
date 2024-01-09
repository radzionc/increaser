import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'
import { range } from '@lib/utils/array/range'
import { DefaultTheme } from 'styled-components'
import { MS_IN_DAY, MS_IN_SEC } from '@lib/utils/time'
import { Habit } from '@increaser/entities/Habit'
import { EnhancedHabit } from '../EnhancedHabit'
import { getHabitStreak } from '@increaser/entities-utils/habit/getHabitStreak'

export const enhanceHabit = (
  habitResponse: Habit,
  todayStartedAt: number,
  theme: DefaultTheme,
): EnhancedHabit => {
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
