import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { Text } from '@lib/ui/text'
import { productName } from '@product/config'

import { ProductIcon } from './icon/ProductIcon'

export const ProductLogo = () => (
  <Text color="contrast" centerVertically weight="600">
    <IconWrapper style={{ fontSize: `1.2em`, marginRight: 8 }}>
      <ProductIcon />
    </IconWrapper>
    {productName}
  </Text>
)
