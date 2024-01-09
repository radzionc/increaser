import { useMemo } from 'react'

import { habitDaysToShow } from './config'
import { HabitSuccessStatistic } from './HabitSuccessStatistic'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'
import { useCurrentHabit } from '@increaser/ui/habits/CurrentHabitProvider'

export const HabitConsistency = () => {
  const habit = useCurrentHabit()

  const daysToCheck = habit.passedDays.slice(0, habitDaysToShow)

  const habitDays = useMemo(() => {
    const daysSet = new Set(habit.successes)

    return daysToCheck.filter((day) => daysSet.has(toHabitDate(new Date(day))))
  }, [daysToCheck, habit.successes])

  return (
    <HabitSuccessStatistic
      rate={habitDays.length > 0 ? habitDays.length / daysToCheck.length : 0}
    />
  )
}
