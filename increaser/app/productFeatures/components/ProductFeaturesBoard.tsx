import { HStack, VStack } from '@lib/ui/layout/Stack'
import { Panel } from '@lib/ui/panel/Panel'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import {
  ProductFeaturesViewProvider,
  ProductFeaturesViewSelector,
  RenderProductFeaturesView,
} from './ProductFeaturesView'
import { ProposeFeaturePrompt } from './ProposeFeaturePrompt'
import { ProductFeatureList } from './ProductFeatureList'

const Container = styled(Panel)`
  min-width: 360px;
  flex: 1;
`

export const ProductFeaturesBoard = () => {
  return (
    <ProductFeaturesViewProvider>
      <Container>
        <VStack gap={20}>
          <HStack
            alignItems="center"
            gap={20}
            justifyContent="space-between"
            wrap="wrap"
            fullWidth
          >
            <Text size={18} weight="bold">
              Product Features
            </Text>
            <ProductFeaturesViewSelector />
          </HStack>
          <RenderProductFeaturesView
            idea={() => <ProposeFeaturePrompt />}
            done={() => null}
          />
          <ProductFeatureList />
        </VStack>
      </Container>
    </ProductFeaturesViewProvider>
  )
}
