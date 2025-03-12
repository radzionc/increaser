import { order } from '@lib/utils/array/order'
import { getGoalDeadlineTimestamp } from '@product/entities-utils/goal/getGoalDeadlineTimestamp'
import { useUser } from '@product/ui/user/state/user'
import { useMemo } from 'react'

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
