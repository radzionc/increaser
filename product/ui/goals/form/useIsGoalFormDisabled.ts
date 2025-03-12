import { useMemo } from 'react'

import { GoalFormShape } from './GoalFormShape'

export const useIsGoalFormDisabled = ({ name }: GoalFormShape) => {
  return useMemo(() => {
    if (!name.trim()) {
      return 'Name is required'
    }
  }, [name])
}
