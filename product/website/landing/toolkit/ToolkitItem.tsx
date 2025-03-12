import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { centerContent } from '@lib/ui/css/centerContent'
import { HStack } from '@lib/ui/css/stack'
import { ValueProp } from '@lib/ui/props'
import { text } from '@lib/ui/text'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { getColor } from '@lib/ui/theme/getters'
import {
  ProductTool,
  productToolKeyWordRecord,
} from '@product/entities/ProductTool'
import { productToolIconRecord } from '@product/ui/tools/productToolIconRecord'
import Link from 'next/link'
import styled from 'styled-components'

import { getProductToolUrl } from '../../navigation/productTool'

const Outline = styled.div`
  ${absoluteOutline(2, 2)};
  border: 2px solid ${getColor('contrast')};
  ${borderRadius.s};
  opacity: 0;
`

const Container = styled(HStack)`
  position: relative;
  isolation: isolate;

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
    centerVertically: true,
  })}

  gap: 8px;

  height: 120px;

  ${centerContent};

  &:hover ${Outline} {
    opacity: 1;
  }

  @media (max-width: 800px) {
    font-size: 16px;
    height: 80px;
  }
`

export const ToolkitItem = ({ value }: ValueProp<ProductTool>) => (
  <Link href={getProductToolUrl(value)}>
    <Container>
      {productToolIconRecord[value]}
      {productToolKeyWordRecord[value]}
      <Outline />
    </Container>
  </Link>
)
