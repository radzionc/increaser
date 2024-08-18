import { useMemo } from 'react'
import { useAssertUserState } from '../../user/UserStateContext'

export const useTasks = () => {
  const { tasks } = useAssertUserState()

  return useMemo(() => {
    return Object.values(tasks)
  }, [tasks])
}
