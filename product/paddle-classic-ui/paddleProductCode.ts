import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'
import { SubscriptionBillingCycle } from '@product/entities/Subscription'

export const paddleProductCode: Record<SubscriptionBillingCycle, number> = {
  month: Number(
    shouldBeDefined(process.env.NEXT_PUBLIC_PADDLE_MONTHLY_SUBSCRIPTION_CODE),
  ),
  year: Number(
    shouldBeDefined(process.env.NEXT_PUBLIC_PADDLE_YEARLY_SUBSCRIPTION_CODE),
  ),
}
