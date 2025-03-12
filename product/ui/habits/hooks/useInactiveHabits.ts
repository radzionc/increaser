import { InactiveHabit } from '@product/entities/Habit'
import { useMemo } from 'react'

import { useHabits } from './useHabits'

export const useInactiveHabits = () => {
  const habits = useHabits()

  return useMemo(
    () => habits.filter(({ startedAt }) => !startedAt) as InactiveHabit[],
    [habits],
  )
}
