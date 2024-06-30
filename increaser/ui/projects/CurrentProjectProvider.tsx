import { Project } from '@increaser/entities/Project'
import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'

export const { useValue: useCurrentProject, provider: CurrentProjectProvider } =
  getValueProviderSetup<Project>('Project')
