import { ProductLogo } from 'product/components/ProductLogo'
import { Text } from '@increaser/ui/ui/Text'

import { AppSumoLogo } from './AppSumoLogo'
import { HStackSeparatedBy } from '@increaser/ui/ui/StackSeparatedBy'

export const AppSumoHeader = () => {
  return (
    <Text as="div" size={28} color="contrast">
      <HStackSeparatedBy gap={16} separator="❤️">
        <ProductLogo />
        <AppSumoLogo />
      </HStackSeparatedBy>
    </Text>
  )
}
