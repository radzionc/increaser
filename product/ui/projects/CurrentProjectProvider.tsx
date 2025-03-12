import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'
import { Project } from '@product/entities/Project'

export const { useValue: useCurrentProject, provider: CurrentProjectProvider } =
  getValueProviderSetup<Project>('Project')
