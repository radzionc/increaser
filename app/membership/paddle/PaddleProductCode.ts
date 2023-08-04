import { SubscriptionCadence } from '@increaser/ui/subscription/SubscriptionCadence'

import { assertDefined } from 'shared/utils/assertDefined'

export const PaddleProductCode: Record<SubscriptionCadence, number> = {
  month: Number(
    assertDefined(process.env.NEXT_PUBLIC_PADDLE_MONTHLY_SUBSCRIPTION_CODE),
  ),
  year: Number(
    assertDefined(process.env.NEXT_PUBLIC_PADDLE_YEARLY_SUBSCRIPTION_CODE),
  ),
}
