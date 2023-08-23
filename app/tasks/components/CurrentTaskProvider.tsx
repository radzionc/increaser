import { getValueProviderSetup } from '@increaser/ui/state/getValueProviderSetup'
import { Task } from 'tasks/Task'

export const { useValue: useCurrentTask, provider: CurrentTaskProvider } =
  getValueProviderSetup<Task>('Task')
