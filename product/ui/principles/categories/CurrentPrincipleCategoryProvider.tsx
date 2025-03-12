import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'
import { PrincipleCategory } from '@product/entities/PrincipleCategory'

export const {
  useValue: useCurrentPrincipleCategory,
  provider: CurrentPrincipleCategoryProvider,
} = getValueProviderSetup<PrincipleCategory>('PrincipleCategory')
