import { Subscription } from '@product/entities/Subscription'

export const isActiveSubscription = ({
  endsAt,
}: Pick<Subscription, 'endsAt'>) => {
  if (!endsAt) return true

  return Date.now() < endsAt
}
