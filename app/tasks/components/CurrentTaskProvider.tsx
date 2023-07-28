import { getValueProviderSetup } from 'shared/utils/getValueProviderSetup'
import { Task } from 'tasks/Task'

export const { useValue: useCurrentTask, provider: CurrentTaskProvider } =
  getValueProviderSetup<Task>('Task')
