import { useMemo } from 'react'
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { useActiveHabits } from './useActiveHabits'

export const useOrderedActiveHabits = () => {
  const habits = useActiveHabits()

  return useMemo(() => sortEntitiesWithOrder(habits), [habits])
}
