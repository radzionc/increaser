import { Subscription } from '@increaser/entities/Subscription'

export const isActiveSubscription = ({
  endsAt,
}: Pick<Subscription, 'endsAt'>) => {
  if (!endsAt) return true

  return Date.now() < endsAt
}
