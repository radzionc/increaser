import { useMemo } from 'react'
import { useGoals } from './useGoals'

export const useActiveGoals = () => {
  const goals = useGoals()
  return useMemo(
    () => goals.filter((goal) => goal.status === 'inProgress'),
    [goals],
  )
}
