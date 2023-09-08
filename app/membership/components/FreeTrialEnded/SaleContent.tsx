import { InlineFounderContacts } from 'info/components/InflineFounderContacts'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

import { MembershipSaleCard } from '../MembershipSaleCard'

export const SaleContent = () => {
  return (
    <VStack fullWidth gap={40}>
      <MembershipSaleCard />
      <VStack gap={4}>
        <Text size={14} color="supporting">
          Have doubts? Talk to the founder 👇
        </Text>
        <InlineFounderContacts size="s" />
      </VStack>
    </VStack>
  )
}
