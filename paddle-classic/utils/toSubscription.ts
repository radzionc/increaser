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
import { match } from '@increaser/utils/match'
import { addMonths, addYears } from 'date-fns'

export const fromPaddleClassicStatus = (
  status: PaddleClassicSubscriptionStatus,
): SubscriptionStatus => {
  if (status === 'past_due') {
    return 'pastDue'
  }

  if (status === 'deleted') {
    return 'canceled'
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
  if (!user.last_payment) return undefined

  const date = new Date(user.last_payment.date)
  return match(billingCycle, {
    month: () => addMonths(date, 1).getTime(),
    year: () => addYears(date, 1).getTime(),
  })
}

export const toSubscription = (
  user: PaddleClassicUser,
  plans: PaddleClassicSubscriptionPlan[],
): Subscription => {
  const plan = plans.find((plan) => plan.id === user.plan_id)
  if (!plan) {
    throw new Error(`Plan ${user.plan_id} not found`)
  }

  const billingCycle = plan.billing_type

  return {
    provider: 'paddleClassic',
    id: user.subscription_id.toString(),
    planId: user.plan_id.toString(),
    status: fromPaddleClassicStatus(user.state),
    nextBilledAt: getNextBilledAt(user),
    endsAt: getEndsAt(billingCycle, user),
  }
}
