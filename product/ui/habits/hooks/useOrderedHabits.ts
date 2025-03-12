import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { useMemo } from 'react'

import { useHabits } from './useHabits'

export const useOrderedHabits = () => {
  const habits = useHabits()

  return useMemo(() => sortEntitiesWithOrder(habits), [habits])
}
