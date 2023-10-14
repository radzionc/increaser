import { useRhythmicRerender } from '@increaser/ui/hooks/useRhythmicRerender'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { useAssertUserState } from 'user/state/UserStateContext'

export const useHasActiveSubscription = () => {
  const { subscription } = useAssertUserState()

  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))

  if (!subscription) return false

  if (!subscription.endsAt) return true

  return subscription.endsAt > now
}
