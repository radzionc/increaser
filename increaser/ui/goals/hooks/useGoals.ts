import { useMemo } from 'react'
import { useAssertUserState } from '../../user/UserStateContext'
import { getGoalDeadlineTimestamp } from '@increaser/entities-utils/goal/getGoalDeadlineTimestamp'
import { order } from '@lib/utils/array/order'

export const useGoals = () => {
  const { goals, dob } = useAssertUserState()

  return useMemo(
    () =>
      order(
        Object.values(goals),
        ({ deadlineAt }) => getGoalDeadlineTimestamp({ deadlineAt, dob }),
        'asc',
      ),
    [goals, dob],
  )
}
