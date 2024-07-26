import { Principle } from '@increaser/entities/Principle'
import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'

export const {
  useValue: useCurrentPrinciple,
  provider: CurrentPrincipleProvider,
} = getValueProviderSetup<Principle>('Principle')
