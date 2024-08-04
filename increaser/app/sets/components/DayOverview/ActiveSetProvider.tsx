import { getStateProviderSetup } from '@lib/ui/state/getStateProviderSetup'
import { Interval } from '@lib/utils/interval/Interval'

export const { useState: useActiveSet, provider: ActiveSetProvider } =
  getStateProviderSetup<Interval | null>('ActiveSet')
