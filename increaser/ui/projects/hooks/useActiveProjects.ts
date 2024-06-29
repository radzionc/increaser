import { useMemo } from 'react'
import { useAssertUserState } from '../../user/UserStateContext'

export const useActiveProjects = () => {
  const { projects } = useAssertUserState()

  return useMemo(() => {
    return projects.filter((project) => project.status === 'active')
  }, [projects])
}
