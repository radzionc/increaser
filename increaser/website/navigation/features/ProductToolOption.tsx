import {
  ProductTool,
  productToolDescription,
  productToolShortNameRecord,
} from '@increaser/entities/ProductTool'
import { ProductToolIcon } from '@increaser/ui/tools/ProductToolIcon'
import { hStack, VStack } from '@lib/ui/css/stack'
import { ComponentWithValueProps } from '@lib/ui/props'
import styled from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { centerContent } from '@lib/ui/css/centerContent'
import { Text } from '@lib/ui/text'
import { ComponentProps } from 'react'

const Container = styled(UnstyledButton)`
  padding: 8px;
  ${borderRadius.s};
  &:hover {
    background: ${getColor('mist')};
  }

  ${hStack({
    alignItems: 'center',
    gap: 8,
  })}
`

const IconContainer = styled.div`
  ${borderRadius.s};
  ${sameDimensions(32)};
  ${centerContent};
  color: ${getColor('contrast')};
  border: 1px solid ${getColor('mistExtra')};
`

export const ProductToolOption: React.FC<
  ComponentWithValueProps<ProductTool> &
    Omit<ComponentProps<typeof Container>, 'value'>
> = ({ value, ...rest }) => (
  <Container {...rest}>
    <IconContainer>
      <ProductToolIcon value={value} />
    </IconContainer>
    <VStack alignItems="start">
      <Text color="contrast" weight="600" size={14}>
        {productToolShortNameRecord[value]}
      </Text>
      <Text style={{ textAlign: 'start' }} size={12} color="supporting">
        {productToolDescription[value]}
      </Text>
    </VStack>
  </Container>
)
