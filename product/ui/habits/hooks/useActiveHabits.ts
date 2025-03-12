import { ActiveHabit } from '@product/entities/Habit'
import { useMemo } from 'react'

import { useHabits } from './useHabits'

export const useActiveHabits = () => {
  const habits = useHabits()

  return useMemo(
    () => habits.filter(({ startedAt }) => startedAt) as ActiveHabit[],
    [habits],
  )
}
