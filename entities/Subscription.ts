export type SubscriptionBillingCycle = 'month' | 'year'

export type SubscriptionStatus = 'active' | 'canceled' | 'past-due'

export type SubscriptionProvider = 'paddle-classic'

export interface Subscription {
  provider: SubscriptionProvider
  billingCycle: SubscriptionBillingCycle
  status: SubscriptionStatus
  nextBilledAt?: number
  endsAt?: number
}
