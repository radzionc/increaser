import { useRhythmicRerender } from '@increaser/ui/hooks/useRhythmicRerender'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { useAssertUserState } from 'user/state/UserStateContext'

export const useHasFreeTrial = () => {
  const { freeTrialEnd } = useAssertUserState()
  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))

  return freeTrialEnd && freeTrialEnd > now
}
