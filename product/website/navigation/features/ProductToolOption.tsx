import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { centerContent } from '@lib/ui/css/centerContent'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { hStack, VStack } from '@lib/ui/css/stack'
import { ValueProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import {
  ProductTool,
  productToolDescription,
  productToolShortNameRecord,
} from '@product/entities/ProductTool'
import { ProductToolIcon } from '@product/ui/tools/ProductToolIcon'
import { ComponentProps } from 'react'
import styled from 'styled-components'

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
  ValueProp<ProductTool> & Omit<ComponentProps<typeof Container>, 'value'>
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
