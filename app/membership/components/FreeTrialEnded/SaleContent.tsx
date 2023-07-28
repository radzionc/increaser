import { InlineFounderContacts } from 'info/components/InflineFounderContacts'
import { MembershipPeriod } from 'membership'
import { VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

import { MembershipSaleCard } from '../MembershipSaleCard'

interface Props {
  onMembershipPeriodSelect: (period: MembershipPeriod) => void
}

export const SaleContent = ({ onMembershipPeriodSelect }: Props) => {
  return (
    <VStack fullWidth gap={40}>
      <MembershipSaleCard onPurchaseRequest={onMembershipPeriodSelect} />
      <VStack gap={4}>
        <Text size={14} color="supporting">
          Have doubts? Talk to the founder 👇
        </Text>
        <InlineFounderContacts size="s" />
      </VStack>
    </VStack>
  )
}
