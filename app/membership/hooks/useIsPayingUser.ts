import { useAssertUserState } from 'user/state/UserStateContext'
import { useHasActiveSubscription } from './useHasActiveSubscription'

export const useIsPayingUser = () => {
  const { lifeTimeDeal } = useAssertUserState()
  const hasActiveSubscription = useHasActiveSubscription()

  return lifeTimeDeal || hasActiveSubscription
}
