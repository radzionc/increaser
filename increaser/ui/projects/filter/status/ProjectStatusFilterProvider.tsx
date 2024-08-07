import { getStateProviderSetup } from '@lib/ui/state/getStateProviderSetup'
import { ProjectStatus } from '@increaser/entities/Project'

export const {
  useState: useProjectStatusFilter,
  provider: ProjectStatusFilterProvider,
} = getStateProviderSetup<ProjectStatus>('ProjectStatusFilter')
