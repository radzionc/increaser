import { MembershipPeriod } from 'membership'
import { assertDefined } from 'shared/utils/assertDefined'

export const PaddleProductCode: Record<MembershipPeriod, number> = {
  monthly: Number(
    assertDefined(process.env.NEXT_PUBLIC_PADDLE_MONTHLY_SUBSCRIPTION_CODE),
  ),
  yearly: Number(
    assertDefined(process.env.NEXT_PUBLIC_PADDLE_YEARLY_SUBSCRIPTION_CODE),
  ),
}
