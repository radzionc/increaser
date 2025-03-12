import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'
import { Task } from '@product/entities/Task'

export const { useValue: useCurrentTask, provider: CurrentTaskProvider } =
  getValueProviderSetup<Task>('Task')
