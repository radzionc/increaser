import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'
import { TimeGrouping } from './TimeGrouping'

export const { useValue: useTimeGrouping, provider: TimeGroupingProvider } =
  getValueProviderSetup<TimeGrouping>('TimeGrouping')
