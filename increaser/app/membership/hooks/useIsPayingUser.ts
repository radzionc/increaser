import { useUser } from '@increaser/ui/user/state/user'
import { useHasActiveSubscription } from './useHasActiveSubscription'

export const useIsPayingUser = () => {
  const { lifeTimeDeal } = useUser()
  const hasActiveSubscription = useHasActiveSubscription()

  return lifeTimeDeal || hasActiveSubscription
}
