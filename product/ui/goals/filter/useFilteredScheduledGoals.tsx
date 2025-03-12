import { ScheduledGoal } from '@product/entities/Goal'
import { useMemo } from 'react'

import { useFilteredGoals } from './useFilteredGoals'

export const useFilteredScheduledGoals = (): ScheduledGoal[] => {
  const items = useFilteredGoals()

  return useMemo(() => {
    const result: ScheduledGoal[] = []
    for (const item of Object.values(items)) {
      const { deadlineAt } = item
      if (deadlineAt !== null) {
        result.push({
          ...item,
          deadlineAt,
        })
      }
    }

    return result
  }, [items])
}
