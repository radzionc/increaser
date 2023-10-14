import { SubscriptionBillingCycle } from '@increaser/entities/Subscription'
import { VStack, HStack } from '../../ui/Stack'
import { HStackSeparatedBy, slashSeparator } from '../../ui/StackSeparatedBy'
import { Text } from '../../ui/Text'

interface SubscriptionPriceProps {
  billingCycle: SubscriptionBillingCycle
  currency: string
  price: Record<SubscriptionBillingCycle, number>
}

const monthsInPeriod: Record<SubscriptionBillingCycle, number> = {
  month: 1,
  year: 12,
}

export const SubscriptionPrice = ({
  billingCycle,
  currency,
  price,
}: SubscriptionPriceProps) => {
  return (
    <VStack alignItems="center" gap={4}>
      <HStack gap={4} alignItems="center">
        <Text size={18} as="span" color="regular">
          {currency}
        </Text>
        <HStackSeparatedBy
          gap={4}
          separator={<Text color="shy">{slashSeparator}</Text>}
        >
          <Text color="regular" size={32} weight="bold" as="span">
            {(price[billingCycle] / monthsInPeriod[billingCycle]).toFixed(2)}
          </Text>
          <Text size={18} as="span" color="supporting">
            mo
          </Text>
        </HStackSeparatedBy>
      </HStack>
      <Text
        size={14}
        color="supporting"
        style={{
          transition: 'none',
          visibility: billingCycle === 'month' ? 'hidden' : 'initial',
        }}
      >
        {currency}
        {price[billingCycle]} per year
      </Text>
    </VStack>
  )
}
