import { useAssertUserState } from 'user/state/UserStateContext'

export const useIsPayingUser = () => {
  const { subscription, lifeTimeDeal } = useAssertUserState()

  if (lifeTimeDeal) return true

  if (subscription) {
    if (!subscription.endsAt) return false

    return subscription.endsAt > Date.now()
  }

  return false
}
