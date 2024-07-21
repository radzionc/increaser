import { useMemo } from 'react'
import { useAssertUserState } from '../../user/UserStateContext'

export const useTaskTemplates = () => {
  const { taskTemplates } = useAssertUserState()

  return useMemo(() => Object.values(taskTemplates), [taskTemplates])
}
