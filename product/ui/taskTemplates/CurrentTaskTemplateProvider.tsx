import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'
import { TaskTemplate } from '@product/entities/TaskTemplate'

export const {
  useValue: useCurrentTaskTemplate,
  provider: CurrentTaskTemplateProvider,
} = getValueProviderSetup<TaskTemplate>('TaskTemplate')
