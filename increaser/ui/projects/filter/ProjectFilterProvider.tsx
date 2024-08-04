import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { getStateProviderSetup } from '@lib/ui/state/getStateProviderSetup'
import { findBy } from '@lib/utils/array/findBy'

export const {
  useState: useUncheckedProjectFilter,
  provider: ProjectFilterProvider,
} = getStateProviderSetup<string | null>('ProjectFilter')

export const useProjectFilter = () => {
  const activeProjects = useActiveProjects()

  return useStateCorrector(useUncheckedProjectFilter(), (projectId) => {
    if (projectId && !findBy(activeProjects, 'id', projectId)) {
      return null
    }

    return projectId
  })
}
