import { SubscriptionBillingCycle } from '@increaser/entities/Subscription'
import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'

export const paddleProductCode: Record<SubscriptionBillingCycle, number> = {
  month: Number(
    shouldBeDefined(process.env.NEXT_PUBLIC_PADDLE_MONTHLY_SUBSCRIPTION_CODE),
  ),
  year: Number(
    shouldBeDefined(process.env.NEXT_PUBLIC_PADDLE_YEARLY_SUBSCRIPTION_CODE),
  ),
}
