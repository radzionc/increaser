import { toHabitDate } from 'habits/utils/toHabitDate'
import { useMemo } from 'react'

import { useCurrentHabit } from '../CurrentHabitProvider'
import { habitDaysToShow } from './config'
import { HabitSuccessStatistic } from './HabitSuccessStatistic'

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
