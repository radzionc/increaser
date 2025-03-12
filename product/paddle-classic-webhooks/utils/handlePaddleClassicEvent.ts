import { isOneOf } from '@lib/utils/array/isOneOf'
import { updateUser } from '@product/db/user'
import { Subscription } from '@product/entities/Subscription'

import { fromPaddleClassicStatus } from '../../paddle-classic/utils/toSubscription'
import { PaddleClassicEvent } from '../PaddleClassicEvent'

const paddleClassicSupportedAlerts = [
  'subscription_created',
  'subscription_updated',
  'subscription_cancelled',
  'subscription_payment_succeeded',
  'subscription_payment_failed',
  'subscription_payment_refunded',
] as const

export const handlePaddleClassicEvent = async (event: PaddleClassicEvent) => {
  const alertName = isOneOf(event.alert_name, paddleClassicSupportedAlerts)
  if (!alertName) {
    console.log(
      `Received unsupported alert from Paddle Classic: ${event.alert_name}`,
    )
    return
  }

  console.log(`Processing ${event.alert_name} event from Paddle Classic`)
  const { userId } = JSON.parse(event.passthrough)
  const subscription: Subscription = {
    provider: 'paddleClassic',
    id: event.subscription_id,
    planId: event.subscription_plan_id,
    status: fromPaddleClassicStatus(event.status),
    nextBilledAt: event.next_bill_date
      ? new Date(event.next_bill_date).getTime()
      : undefined,
    endsAt: event.cancellation_effective_date
      ? new Date(event.cancellation_effective_date).getTime()
      : undefined,
  }

  await updateUser(userId, { subscription })
}
