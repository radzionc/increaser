import { VStack } from '@lib/ui/layout/Stack'
import {
  ProductFeaturesViewProvider,
  ProductFeaturesViewSelector,
  RenderProductFeaturesView,
} from './ProductFeaturesView'
import { ProposeFeaturePrompt } from './ProposeFeaturePrompt'
import { ProductFeatureList } from './ProductFeatureList'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'

export const ProductFeaturesBoard = () => {
  return (
    <ProductFeaturesViewProvider>
      <VStack gap={20}>
        <ProductFeaturesViewSelector />

        <UniformColumnGrid minChildrenWidth={320} gap={20}>
          <RenderProductFeaturesView
            idea={() => <ProposeFeaturePrompt />}
            done={() => null}
          />
          <ProductFeatureList />
        </UniformColumnGrid>
      </VStack>
    </ProductFeaturesViewProvider>
  )
}
