import { useMemo } from 'react'
import { useHabits } from './useHabits'
import { ActiveHabit } from '@increaser/entities/Habit'

export const useActiveHabits = () => {
  const habits = useHabits()

  return useMemo(
    () => habits.filter(({ startedAt }) => startedAt) as ActiveHabit[],
    [habits],
  )
}
