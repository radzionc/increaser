import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { isActiveSubscription } from '@product/entities-utils/subscription/isActiveSubscription'
import { useUser } from '@product/ui/user/state/user'

export const useHasActiveSubscription = () => {
  const { subscription } = useUser()

  useRhythmicRerender(convertDuration(1, 'min', 'ms'))

  if (!subscription) return false

  return isActiveSubscription(subscription)
}
