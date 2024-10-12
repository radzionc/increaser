import { ComponentWithValueProps } from '@lib/ui/props'
import styled from 'styled-components'
import { HStack } from '@lib/ui/css/stack'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import {
  ProductTool,
  productToolKeyWordRecord,
} from '@increaser/entities/ProductTool'
import Link from 'next/link'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { getProductToolUrl } from '../../navigation/productTool'
import { centerContent } from '@lib/ui/css/centerContent'
import { text } from '@lib/ui/text'

const Container = styled(HStack)`
  ${borderRadius.s};
  background: ${getColor('foreground')};
  color: ${getColor('contrast')};
  &:hover {
    background: ${getHoverVariant('foreground')};
  }

  text-transform: capitalize;

  ${text({
    size: 20,
    weight: 700,
    color: 'contrast',
  })}

  height: 80px;

  ${centerContent};
`

export const ToolkitItem = ({
  value,
}: ComponentWithValueProps<ProductTool>) => (
  <Link href={getProductToolUrl(value)}>
    <Container>{productToolKeyWordRecord[value]}</Container>
  </Link>
)
