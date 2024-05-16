import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'
import { TrackedTimeActivityKey } from '@increaser/entities/TrackedTime'

export const { useValue: useCurrentProject, provider: CurrentProjectProvider } =
  getValueProviderSetup<TrackedTimeActivityKey>('TrackedTimeActivity')
