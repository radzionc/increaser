import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { HStack } from '@lib/ui/layout/Stack'
import { Icon } from './icon/Icon'
import { Text } from '@lib/ui/text'
import { productName } from '@increaser/config'

export const ProductLogo = () => (
  <HStack alignItems="center" gap={8}>
    <IconWrapper style={{ fontSize: `1.2em` }}>
      <Icon />
    </IconWrapper>
    <Text color="contrast" weight="bold">
      {productName.toLowerCase()}
    </Text>
  </HStack>
)
