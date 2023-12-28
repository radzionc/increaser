import { useMemo } from 'react'

import { useHabits } from '../HabitsProvider'
import { HabitSuccessStatistic } from './HabitSuccessStatistic'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'

export const HabitsSuccess = () => {
  const { habits } = useHabits()

  const rate = useMemo(() => {
    let habitDays = 0
    let habitSuccessDays = 0

    habits.forEach((habit) => {
      habitDays += habit.passedDays.length

      const daysSet = new Set(habit.successes)

      habitSuccessDays += habit.passedDays.filter((day) =>
        daysSet.has(toHabitDate(new Date(day))),
      ).length
    })

    return habitDays === 0 ? 0 : habitSuccessDays / habitDays
  }, [habits])

  return <HabitSuccessStatistic rate={rate} />
}
