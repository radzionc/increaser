import { useIsPayingUser } from './useIsPayingUser'
import { useHasFreeTrial } from './useHasFreeTrial'

export const useIsLikeMember = () => {
  const hasFreeTrial = useHasFreeTrial()
  const isPayingUser = useIsPayingUser()

  return hasFreeTrial || isPayingUser
}
