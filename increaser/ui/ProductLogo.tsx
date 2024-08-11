import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { productName } from '@increaser/config'
import { ProductIcon } from './icon/ProductIcon'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'

const Container = styled(HStack)`
  color: ${getColor('contrast')};
`

export const ProductLogo = () => (
  <Container alignItems="center" gap={8}>
    <IconWrapper style={{ fontSize: `1.2em` }}>
      <ProductIcon />
    </IconWrapper>
    <Text color="contrast" weight="600">
      {productName.toLowerCase()}
    </Text>
  </Container>
)
