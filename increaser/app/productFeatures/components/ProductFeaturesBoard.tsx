import { VStack } from '@lib/ui/layout/Stack'
import {
  ProductFeaturesViewProvider,
  ProductFeaturesViewSelector,
  RenderProductFeaturesView,
} from './ProductFeaturesView'
import { ProposeFeaturePrompt } from './ProposeFeaturePrompt'
import { ProductFeatureList } from './ProductFeatureList'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { FounderContacts } from '../../community/components/FounderContacts'

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
          <FounderContacts />

          <ProductFeatureList />
        </UniformColumnGrid>
      </VStack>
    </ProductFeaturesViewProvider>
  )
}
