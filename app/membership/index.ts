export const FREE_TRIAL_DAYS = 14

export type MembershipPeriod = 'monthly' | 'yearly'

export enum MembershipProvider {
  Paddle = 'Paddle',
  AppSumo = 'AppSumo',
}

interface Subscription {
  updateUrl: string
  cancelUrl: string
  subscriptionPlanId: string
  cancellationEffectiveDate?: string
  nextBillDate?: string
  planId: string
}

export interface Membership {
  provider: MembershipProvider
  subscription?: Subscription
}
