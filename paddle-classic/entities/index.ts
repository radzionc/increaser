import { SubscriptionBillingCycle } from '@increaser/entities/Subscription'

export interface PaddleClassicSubscriptionPlan {
  id: number
  billing_type: SubscriptionBillingCycle
}

export interface PaddleClassicUser {
  subscription_id: number
  plan_id: number
  user_id: number
  user_email: string
  marketing_consent: boolean
  update_url: string
  cancel_url: string
  state: string
  signup_date: string
  last_payment: {
    amount: number
    currency: string
    date: string
  }
  payment_information: {
    payment_method: string
    card_type: string
    last_four_digits: string
    expiry_date: string
  }
  quantity: number
  next_payment: {
    amount: number
    currency: string
    date: string
  }
}
