import { useHasFreeTrial } from './useHasFreeTrial'
import { useIsPayingUser } from './useIsPayingUser'

export const useIsLikeMember = () => {
  const hasFreeTrial = useHasFreeTrial()
  const isPayingUser = useIsPayingUser()

  return hasFreeTrial || isPayingUser
}
