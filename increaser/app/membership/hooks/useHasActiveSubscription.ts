import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useUser } from '@increaser/ui/user/state/user'
import { isActiveSubscription } from '@increaser/entities-utils/subscription/isActiveSubscription'

export const useHasActiveSubscription = () => {
  const { subscription } = useUser()

  useRhythmicRerender(convertDuration(1, 'min', 'ms'))

  if (!subscription) return false

  return isActiveSubscription(subscription)
}
