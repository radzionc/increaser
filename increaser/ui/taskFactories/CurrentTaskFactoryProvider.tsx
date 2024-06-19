import { TaskFactory } from '@increaser/entities/TaskFactory'
import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'

export const {
  useValue: useCurrentTaskFactory,
  provider: CurrentTaskFactoryProvider,
} = getValueProviderSetup<TaskFactory>('TaskFactory')
