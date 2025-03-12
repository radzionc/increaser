import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useUser } from '@product/ui/user/state/user'

export const useHasFreeTrial = () => {
  const { freeTrialEnd } = useUser()
  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))

  return freeTrialEnd && freeTrialEnd > now
}
