import { useMemo } from 'react'
import { GoalFormShape } from './GoalFormShape'

export const useIsGoalFormDisabled = ({ name, deadlineAt }: GoalFormShape) => {
  return useMemo(() => {
    if (!name.trim()) {
      return 'Name is required'
    }

    if (!deadlineAt) {
      return 'Deadline is required'
    }
  }, [deadlineAt, name])
}
