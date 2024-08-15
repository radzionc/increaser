import { useAssertUserState } from '../../user/UserStateContext'

export const useTasks = () => {
  const { tasks } = useAssertUserState()

  return Object.values(tasks)
}
