import { useMemo } from 'react'
import { useHabits } from './useHabits'
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'

export const useOrderedHabits = () => {
  const habits = useHabits()

  return useMemo(() => sortEntitiesWithOrder(habits), [habits])
}
