import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'
import { Task } from '@increaser/app/tasks/Task'

export const { useValue: useCurrentTask, provider: CurrentTaskProvider } =
  getValueProviderSetup<Task>('Task')
