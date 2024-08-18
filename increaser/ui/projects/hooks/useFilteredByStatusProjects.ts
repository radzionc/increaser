import { useMemo } from 'react'
import { useAssertUserState } from '../../user/UserStateContext'
import { useProjectStatusFilter } from '../filter/status/ProjectStatusFilterProvider'

export const useFilteredByStatusProjects = () => {
  const { projects } = useAssertUserState()
  const [status] = useProjectStatusFilter()

  return useMemo(() => {
    return Object.values(projects).filter(
      (project) => project.status === status,
    )
  }, [projects, status])
}
