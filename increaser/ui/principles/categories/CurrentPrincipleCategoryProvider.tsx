import { PrincipleCategory } from '@increaser/entities/PrincipleCategory'
import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'

export const {
  useValue: useCurrentPrincipleCategory,
  provider: CurrentPrincipleCategoryProvider,
} = getValueProviderSetup<PrincipleCategory>('PrincipleCategory')
