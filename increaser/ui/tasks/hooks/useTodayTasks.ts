import { getDeadlineStatus } from '@increaser/entities-utils/task/getDeadlineStatus'
import { useAssertUserState } from '../../user/UserStateContext'
import { useMemo } from 'react'
import { order } from '@lib/utils/array/order'

export const useTodayTasks = () => {
  const { tasks } = useAssertUserState()

  return useMemo(
    () =>
      order(
        Object.values(tasks).filter(
          ({ deadlineAt }) =>
            deadlineAt &&
            getDeadlineStatus({ deadlineAt, now: Date.now() }) === 'today',
        ),
        (task) => task.order,
        'asc',
      ),
    [tasks],
  )
}
