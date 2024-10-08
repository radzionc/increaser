import { ForecastedTask } from '@increaser/entities/TaskFactory'
import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'

export const {
  useValue: useCurrentForecastedTask,
  provider: CurrentForecastedTaskProvider,
} = getValueProviderSetup<ForecastedTask>('ForecastedTask')
