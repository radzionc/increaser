import { ComponentWithValueProps } from '@lib/ui/props'
import styled from 'styled-components'
import { HStack } from '@lib/ui/layout/Stack'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import {
  ProductTool,
  productToolPurposeRecord,
} from '@increaser/entities/ProductTool'
import Link from 'next/link'
import { transition } from '@lib/ui/css/transition'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { getProductToolUrl } from '../../navigation/productTool'
import { ProductToolIcon } from '@increaser/ui/tools/ProductToolIcon'

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
}: ComponentWithValueProps<ProductTool>) => (
  <Link href={getProductToolUrl(value)}>
    <Container>
      <ProductToolIcon style={{ fontSize: 18 }} value={value} />
      {productToolPurposeRecord[value]}
    </Container>
  </Link>
)
