import { useMemo } from 'react'
import { useHabits } from './useHabits'
import { InactiveHabit } from '@increaser/entities/Habit'

export const useInactiveHabits = () => {
  const habits = useHabits()

  return useMemo(
    () => habits.filter(({ startedAt }) => !startedAt) as InactiveHabit[],
    [habits],
  )
}
