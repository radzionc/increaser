import { centerContent } from '@lib/ui/css/centerContent'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { ValueProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { ProductUpdateItem } from '@product/changelog/ProductUpdate'
import styled from 'styled-components'

const Indicator = styled(IconWrapper)`
  ${round};
  ${sameDimensions(24)};
  ${centerContent};
  color: ${getColor('success')};
  background: ${getColor('mist')};
`

export const ProductUpdateSubItem = ({
  value: { description },
}: ValueProp<ProductUpdateItem>) => (
  <PrefixedItemFrame
    key={description}
    prefix={
      <Indicator>
        <PlusIcon />
      </Indicator>
    }
  >
    <Text>{description}</Text>
  </PrefixedItemFrame>
)
