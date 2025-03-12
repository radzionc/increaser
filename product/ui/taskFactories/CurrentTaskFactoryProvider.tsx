import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'
import { TaskFactory } from '@product/entities/TaskFactory'

export const {
  useValue: useCurrentTaskFactory,
  provider: CurrentTaskFactoryProvider,
} = getValueProviderSetup<TaskFactory>('TaskFactory')
