import { useMemo } from 'react'
import { useUser } from '@increaser/ui/user/state/user'
import { getGoalDeadlineTimestamp } from '@increaser/entities-utils/goal/getGoalDeadlineTimestamp'
import { order } from '@lib/utils/array/order'

export const useGoals = () => {
  const { goals, dob } = useUser()

  return useMemo(
    () =>
      order(
        Object.values(goals),
        ({ deadlineAt }) =>
          deadlineAt ? getGoalDeadlineTimestamp({ deadlineAt, dob }) : 0,
        'asc',
      ),
    [goals, dob],
  )
}
