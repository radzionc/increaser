import { SubscriptionCadence } from '@increaser/ui/subscription/SubscriptionCadence'
import { shouldBeDefined } from '@increaser/utils/shouldBeDefined'

export const PaddleProductCode: Record<SubscriptionCadence, number> = {
  month: Number(
    shouldBeDefined(process.env.NEXT_PUBLIC_PADDLE_MONTHLY_SUBSCRIPTION_CODE),
  ),
  year: Number(
    shouldBeDefined(process.env.NEXT_PUBLIC_PADDLE_YEARLY_SUBSCRIPTION_CODE),
  ),
}
