export enum MembershipProvider {
  Paddle = 'Paddle',
  AppSumo = 'AppSumo',
}

export interface Subscription {
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

export const freeTrialDurationInDays = 14
