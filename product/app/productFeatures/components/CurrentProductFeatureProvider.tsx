import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'
import { ProductFeatureResponse } from '@product/api-interface/ProductFeatureResponse'

export const {
  useValue: useCurrentProductFeature,
  provider: CurrentProductFeatureProvider,
} = getValueProviderSetup<ProductFeatureResponse>('ProductFeature')
