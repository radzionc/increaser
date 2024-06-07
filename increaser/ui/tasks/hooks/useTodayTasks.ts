import { getDeadlineStatus } from '@increaser/entities-utils/task/getDeadlineStatus'
import { useAssertUserState } from '../../user/UserStateContext'
import { useMemo } from 'react'

export const useTodayTasks = () => {
  const { tasks } = useAssertUserState()

  return useMemo(
    () =>
      Object.values(tasks).filter(
        ({ deadlineAt }) =>
          getDeadlineStatus({ deadlineAt, now: Date.now() }) === 'today',
      ),
    [tasks],
  )
}
