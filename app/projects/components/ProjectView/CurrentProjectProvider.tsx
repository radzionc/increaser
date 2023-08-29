import { getValueProviderSetup } from '@increaser/ui/state/getValueProviderSetup'
import { EnhancedProject } from 'projects/Project'

export const { useValue: useCurrentProject, provider: CurrentProjectProvider } =
  getValueProviderSetup<EnhancedProject>('Project')
