import { getDeadlineStatus } from '@increaser/entities-utils/task/getDeadlineStatus'
import { useAssertUserState } from '../../user/UserStateContext'

export const useHasOverdueTasks = () => {
  const { tasks } = useAssertUserState()

  return Object.values(tasks).some(
    ({ deadlineAt }) =>
      getDeadlineStatus({ deadlineAt, now: Date.now() }) === 'overdue',
  )
}
