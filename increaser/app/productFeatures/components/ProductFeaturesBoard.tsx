import { VStack } from '@lib/ui/layout/Stack'
import {
  ProductFeaturesViewProvider,
  ProductFeaturesViewSelector,
} from './ProductFeaturesView'
import { ProductFeatureList } from './ProductFeatureList'

export const ProductFeaturesBoard = () => {
  return (
    <ProductFeaturesViewProvider>
      <VStack gap={20}>
        <ProductFeaturesViewSelector />
        <ProductFeatureList />
      </VStack>
    </ProductFeaturesViewProvider>
  )
}
