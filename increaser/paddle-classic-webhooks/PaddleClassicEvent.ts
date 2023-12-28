import { PaddleClassicSubscriptionStatus } from '../paddle-classic/entities'

export interface PaddleClassicEvent {
  alert_name: string
  passthrough: string
  subscription_id: string
  subscription_plan_id: string
  status: PaddleClassicSubscriptionStatus
  next_bill_date?: string
  cancellation_effective_date?: string
}
