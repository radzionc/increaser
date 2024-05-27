import { getDeadlineStatus } from '@increaser/entities-utils/task/getDeadlineStatus'
import { useAssertUserState } from '../../user/UserStateContext'

export const useTodayTasks = () => {
  const { tasks } = useAssertUserState()

  return Object.values(tasks).filter(
    ({ deadlineAt, completedAt }) =>
      !completedAt &&
      getDeadlineStatus({ deadlineAt, now: Date.now() }) === 'today',
  )
}
