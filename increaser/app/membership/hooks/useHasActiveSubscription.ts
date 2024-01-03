import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { isActiveSubscription } from '@increaser/entities-utils/subscription/isActiveSubscription'

export const useHasActiveSubscription = () => {
  const { subscription } = useAssertUserState()

  useRhythmicRerender(convertDuration(1, 'min', 'ms'))

  if (!subscription) return false

  return isActiveSubscription(subscription)
}
