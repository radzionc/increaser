import { useUser } from '@product/ui/user/state/user'
import { useMemo } from 'react'

export const useTaskTemplates = () => {
  const { taskTemplates } = useUser()

  return useMemo(() => Object.values(taskTemplates), [taskTemplates])
}
