import { Task } from '@increaser/entities/Task'
import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'

export const { useValue: useCurrentTask, provider: CurrentTaskProvider } =
  getValueProviderSetup<Task>('Task')
