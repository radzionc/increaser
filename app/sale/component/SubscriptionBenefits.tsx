import { SubscriptionBenefit } from '@increaser/ui/subscription/components/SubscriptionBenefit'
import { VStack } from '@increaser/ui/ui/Stack'

export const SubscriptionBenefits = () => (
  <VStack gap={8}>
    <SubscriptionBenefit benefit="Enhance your focus" />
    <SubscriptionBenefit benefit="Finish work faster" />
    <SubscriptionBenefit benefit="Accelerate your career" />
    <SubscriptionBenefit benefit="Develop positive habits" />
    <SubscriptionBenefit benefit="Boundaries for work-life balance" />
  </VStack>
)
