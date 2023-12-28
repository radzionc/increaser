import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'
import { EnhancedProject } from '@increaser/app/projects/Project'

export const { useValue: useCurrentProject, provider: CurrentProjectProvider } =
  getValueProviderSetup<EnhancedProject>('Project')
