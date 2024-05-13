import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'
import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'

export const { useValue: useCurrentProject, provider: CurrentProjectProvider } =
  getValueProviderSetup<EnhancedProject>('Project')
