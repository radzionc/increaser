export type SubscriptionBillingCycle = 'month' | 'year'

export type SubscriptionStatus = 'active' | 'canceled' | 'pastDue'

export type SubscriptionProvider = 'paddleClassic'

export interface Subscription {
  provider: SubscriptionProvider
  id: string
  planId: string
  status: SubscriptionStatus
  nextBilledAt?: number
  endsAt?: number
}
