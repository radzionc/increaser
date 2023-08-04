import { InlineFounderContacts } from 'info/components/InflineFounderContacts'
import { SubscriptionCadence } from '@increaser/ui/subscription/SubscriptionCadence'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

import { MembershipSaleCard } from '../MembershipSaleCard'

interface Props {
  onSubscriptionCadenceSelect: (period: SubscriptionCadence) => void
}

export const SaleContent = ({ onSubscriptionCadenceSelect }: Props) => {
  return (
    <VStack fullWidth gap={40}>
      <MembershipSaleCard onPurchaseRequest={onSubscriptionCadenceSelect} />
      <VStack gap={4}>
        <Text size={14} color="supporting">
          Have doubts? Talk to the founder 👇
        </Text>
        <InlineFounderContacts size="s" />
      </VStack>
    </VStack>
  )
}
