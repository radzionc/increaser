import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'
import { ForecastedTask } from '@product/entities/TaskFactory'

export const {
  useValue: useCurrentForecastedTask,
  provider: CurrentForecastedTaskProvider,
} = getValueProviderSetup<ForecastedTask>('ForecastedTask')
