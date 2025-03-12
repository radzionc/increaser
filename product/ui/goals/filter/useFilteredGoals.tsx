import { useMemo } from 'react'

import { useGoals } from '../hooks/useGoals'

import { useGoalStatusFilter } from './useGoalStatusFilter'

export const useFilteredGoals = () => {
  const [statusFilter] = useGoalStatusFilter()

  const goals = useGoals()

  return useMemo(() => {
    if (!statusFilter) {
      return goals
    }

    return goals.filter((goal) => goal.status === statusFilter)
  }, [goals, statusFilter])
}
