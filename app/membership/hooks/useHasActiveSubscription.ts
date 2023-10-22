import { useRhythmicRerender } from '@increaser/ui/hooks/useRhythmicRerender'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { useAssertUserState } from 'user/state/UserStateContext'
import { isActiveSubscription } from '@increaser/entities-utils/subscription/isActiveSubscription'

export const useHasActiveSubscription = () => {
  const { subscription } = useAssertUserState()

  useRhythmicRerender(convertDuration(1, 'min', 'ms'))

  if (!subscription) return false

  return isActiveSubscription(subscription)
}
