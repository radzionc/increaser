import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { getStateProviderSetup } from '@lib/ui/state/getStateProviderSetup'
import { findBy } from '@lib/utils/array/findBy'

type TasksFilter = {
  projectId: string | null
}

export const {
  useState: useUncheckedTasksFilter,
  provider: TasksFilterProvider,
} = getStateProviderSetup<TasksFilter>('TasksFilter')

export const useTasksFilter = () => {
  const activeProjects = useActiveProjects()

  return useStateCorrector(useUncheckedTasksFilter(), (value) => {
    const { projectId } = value
    if (projectId && !findBy(activeProjects, 'id', projectId)) {
      return {
        ...value,
        projectId: null,
      }
    }

    return value
  })
}
