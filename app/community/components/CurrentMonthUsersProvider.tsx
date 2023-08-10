import { PerformanceScoreboard } from '@increaser/entities/PerformanceScoreboard'
import { getValueProviderSetup } from 'shared/utils/getValueProviderSetup'

export const {
  useValue: useCurrentMonthUsers,
  provider: CurrentMonthUsersProvider,
} = getValueProviderSetup<PerformanceScoreboard>('CurrentMonthUsers')
