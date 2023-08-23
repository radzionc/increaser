import { Project } from 'projects/Project'
import { getValueProviderSetup } from '@increaser/ui/state/getValueProviderSetup'

export const { useValue: useCurrentProject, provider: CurrentProjectProvider } =
  getValueProviderSetup<Project>('Project')
