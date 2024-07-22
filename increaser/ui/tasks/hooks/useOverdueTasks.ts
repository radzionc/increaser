import { useAssertUserState } from '../../user/UserStateContext'

export const useOverdueTasks = () => {
  const { tasks } = useAssertUserState()

  return Object.values(tasks).filter(
    ({ deadlineAt, completedAt }) =>
      !completedAt && deadlineAt && deadlineAt < Date.now(),
  )
}
