import { ScheduledGoal } from '@increaser/entities/Goal'
import { useFilteredGoals } from './useFilteredGoals'
import { useMemo } from 'react'

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
