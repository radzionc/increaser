import { ProductUpdateItem } from '@increaser/changelog/ProductUpdate'
import { centerContent } from '@lib/ui/css/centerContent'
import { round } from '@lib/ui/css/round'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { ComponentWithValueProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
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
}: ComponentWithValueProps<ProductUpdateItem>) => (
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
