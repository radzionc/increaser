import { TaskTemplate } from '@increaser/entities/TaskTemplate'
import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'

export const {
  useValue: useCurrentTaskTemplate,
  provider: CurrentTaskTemplateProvider,
} = getValueProviderSetup<TaskTemplate>('TaskTemplate')
