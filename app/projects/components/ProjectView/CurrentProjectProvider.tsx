import { Project } from 'projects/Project'
import { getValueProviderSetup } from 'shared/utils/getValueProviderSetup'

export const { useValue: useCurrentProject, provider: CurrentProjectProvider } =
  getValueProviderSetup<Project>('Project')
