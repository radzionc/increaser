import { SubscriptionBillingCycle } from '@increaser/entities/Subscription'

export interface PaddleClassicSubscriptionPlan {
  id: number
  billing_type: SubscriptionBillingCycle
}

export type PaddleClassicSubscriptionStatus =
  | 'active'
  | 'trialing'
  | 'past_due'
  | 'paused'
  | 'deleted'

interface PaddlePayment {
  amount: number
  currency: string
  date: string
}

export interface PaddleClassicUser {
  subscription_id: number
  plan_id: number
  user_id: number
  user_email: string
  marketing_consent: boolean
  update_url: string
  cancel_url: string
  state: PaddleClassicSubscriptionStatus
  signup_date: string
  last_payment: PaddlePayment
  payment_information: {
    payment_method: string
    card_type: string
    last_four_digits: string
    expiry_date: string
  }
  next_payment?: PaddlePayment
}
