import { PerformanceScoreboard } from '@increaser/entities/PerformanceScoreboard'
import { getValueProviderSetup } from '@increaser/ui/state/getValueProviderSetup'

export const {
  useValue: useCurrentMonthUsers,
  provider: CurrentMonthUsersProvider,
} = getValueProviderSetup<PerformanceScoreboard>('CurrentMonthUsers')
