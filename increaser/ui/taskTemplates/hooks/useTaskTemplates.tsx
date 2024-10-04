import { useMemo } from 'react'
import { useUser } from '@increaser/ui/user/state/user'

export const useTaskTemplates = () => {
  const { taskTemplates } = useUser()

  return useMemo(() => Object.values(taskTemplates), [taskTemplates])
}
