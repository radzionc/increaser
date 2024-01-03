import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useHasActiveSubscription } from './useHasActiveSubscription'

export const useIsPayingUser = () => {
  const { lifeTimeDeal } = useAssertUserState()
  const hasActiveSubscription = useHasActiveSubscription()

  return lifeTimeDeal || hasActiveSubscription
}
