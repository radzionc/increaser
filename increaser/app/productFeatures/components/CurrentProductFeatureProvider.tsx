import { ProductFeatureResponse } from '@increaser/api-interface/ProductFeatureResponse'
import { getValueProviderSetup } from '@lib/ui/state/getValueProviderSetup'

export const {
  useValue: useCurrentProductFeature,
  provider: CurrentProductFeatureProvider,
} = getValueProviderSetup<ProductFeatureResponse>('ProductFeature')
