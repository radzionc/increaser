import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { productName } from '@increaser/config'
import { ProductIcon } from './icon/ProductIcon'

export const ProductLogo = () => (
  <HStack alignItems="center" gap={8}>
    <IconWrapper style={{ fontSize: `1.2em` }}>
      <ProductIcon />
    </IconWrapper>
    <Text color="contrast" weight="bold">
      {productName.toLowerCase()}
    </Text>
  </HStack>
)
