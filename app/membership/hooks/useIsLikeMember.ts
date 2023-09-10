import { useRhythmicRerender } from '@increaser/ui/hooks/useRhythmicRerender'
import { useAssertUserState } from 'user/state/UserStateContext'

import { useIsPayingUser } from './useIsPayingUser'

export const useIsLikeMember = () => {
  const { freeTrialEnd } = useAssertUserState()
  const isPayingUser = useIsPayingUser()

  const now = useRhythmicRerender(10000)

  return Boolean(isPayingUser || (freeTrialEnd && freeTrialEnd > now))
}
