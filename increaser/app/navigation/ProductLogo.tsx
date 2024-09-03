import { HStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { ProductIcon } from '@increaser/ui/icon/ProductIcon'
import { Text } from '@lib/ui/text'
import { productName } from '@increaser/config'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { ComponentProps } from 'react'

const Container = styled(HStack)`
  align-items: center;
  gap: 12px;

  font-weight: 500;
  font-size: 16px;

  color: ${getColor('contrast')};

  ${borderRadius.s};
  padding-left: 4px;
  height: 32px;

  svg {
    font-size: 1.2em;
  }
`

export const ProductLogo = (props: ComponentProps<typeof Container>) => {
  return (
    <Container {...props}>
      <ProductIcon />
      <Text weight="600">{productName.toLowerCase()}</Text>
    </Container>
  )
}
