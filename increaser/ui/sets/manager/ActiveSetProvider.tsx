import { Set } from '@increaser/entities/User'
import { getStateProviderSetup } from '@lib/ui/state/getStateProviderSetup'
import { Interval } from '@lib/utils/interval/Interval'

type ActiveSet = Pick<Set, 'start' | 'end' | 'projectId'> & {
  initialSet?: Interval
}

export const { useState: useActiveSet, provider: ActiveSetProvider } =
  getStateProviderSetup<ActiveSet | null>('ActiveSet')
