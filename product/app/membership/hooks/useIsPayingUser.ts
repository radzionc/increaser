import { useUser } from '@product/ui/user/state/user'

import { useHasActiveSubscription } from './useHasActiveSubscription'

export const useIsPayingUser = () => {
  const { lifeTimeDeal } = useUser()
  const hasActiveSubscription = useHasActiveSubscription()

  return lifeTimeDeal || hasActiveSubscription
}
