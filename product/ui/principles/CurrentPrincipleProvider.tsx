import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'
import { Principle } from '@product/entities/Principle'

export const {
  useValue: useCurrentPrinciple,
  provider: CurrentPrincipleProvider,
} = getValueProviderSetup<Principle>('Principle')
