import { useMemo } from 'react'
import { useUser } from '@increaser/ui/user/state/user'
import { useProjectStatusFilter } from '../filter/status/ProjectStatusFilterProvider'

export const useFilteredByStatusProjects = () => {
  const { projects } = useUser()
  const [status] = useProjectStatusFilter()

  return useMemo(() => {
    return Object.values(projects).filter(
      (project) => project.status === status,
    )
  }, [projects, status])
}
