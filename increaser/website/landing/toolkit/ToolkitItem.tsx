import { ComponentWithValueProps } from '@lib/ui/props'
import styled, { useTheme } from 'styled-components'
import { HStack } from '@lib/ui/layout/Stack'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import {
  ProductTool,
  productToolColorRecord,
  productToolPurposeRecord,
} from '@increaser/entities/ProductTool'
import { productToolIconRecord } from '@increaser/ui/tools/productToolIconRecord'
import Link from 'next/link'
import { transition } from '@lib/ui/css/transition'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { getProductToolUrl } from '../../navigation/productTool'

const IconContainer = styled(IconWrapper)`
  font-size: 18px;
`

const Container = styled(HStack)`
  gap: 8px;
  align-items: center;
  padding: 12px;
  ${borderRadius.s};
  background: ${getColor('foreground')};
  color: ${getColor('contrast')};
  font-weight: 500;
  font-size: 14px;
  ${transition};
  &:hover {
    background: ${getHoverVariant('foreground')};
  }
`

export const ToolkitItem = ({
  value,
}: ComponentWithValueProps<ProductTool>) => {
  const { colors } = useTheme()
  return (
    <Link href={getProductToolUrl(value)}>
      <Container>
        <IconContainer
          style={{
            color: colors
              .getLabelColor(productToolColorRecord[value])
              .toCssValue(),
          }}
        >
          {productToolIconRecord[value]}
        </IconContainer>
        {productToolPurposeRecord[value]}
      </Container>
    </Link>
  )
}
