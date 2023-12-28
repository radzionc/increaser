import {
  Subscription,
  SubscriptionBillingCycle,
  SubscriptionStatus,
} from '@increaser/entities/Subscription'
import {
  PaddleClassicSubscriptionPlan,
  PaddleClassicSubscriptionStatus,
  PaddleClassicUser,
} from '../entities'
import { match } from '@lib/utils/match'
import { addMonths, addYears } from 'date-fns'

export const fromPaddleClassicStatus = (
  status: PaddleClassicSubscriptionStatus,
): SubscriptionStatus => {
  if (status === 'past_due') {
    return 'pastDue'
  }

  if (status === 'deleted') {
    return 'active'
  }

  if (status === 'active') {
    return 'active'
  }

  throw new Error(`Unknown subscription status: ${status}`)
}

const getNextBilledAt = (user: PaddleClassicUser): number | undefined => {
  if (user.next_payment) {
    return new Date(user.next_payment.date).getTime()
  }
}

const getEndsAt = (
  billingCycle: SubscriptionBillingCycle,
  user: PaddleClassicUser,
): number | undefined => {
  if (user.state !== 'deleted') return undefined

  const date = new Date(user.last_payment.date)
  return match(billingCycle, {
    month: () => addMonths(date, 1).getTime(),
    year: () => addYears(date, 1).getTime(),
  })
}

export const toSubscription = (
  user: PaddleClassicUser,
  plan: PaddleClassicSubscriptionPlan,
): Subscription | undefined => {
  if (!plan) {
    throw new Error(`Plan ${user.plan_id} not found`)
  }

  const endsAt = getEndsAt(plan.billing_type, user)
  if (endsAt && endsAt < Date.now()) {
    return undefined
  }

  return {
    provider: 'paddleClassic',
    id: user.subscription_id.toString(),
    planId: user.plan_id.toString(),
    status: fromPaddleClassicStatus(user.state),
    nextBilledAt: getNextBilledAt(user),
    endsAt,
  }
}
