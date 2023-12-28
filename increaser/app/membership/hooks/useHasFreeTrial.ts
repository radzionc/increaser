import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useAssertUserState } from '@increaser/app/user/state/UserStateContext'

export const useHasFreeTrial = () => {
  const { freeTrialEnd } = useAssertUserState()
  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))

  return freeTrialEnd && freeTrialEnd > now
}
