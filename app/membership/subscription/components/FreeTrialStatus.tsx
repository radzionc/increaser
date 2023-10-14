import { Text } from '@increaser/ui/ui/Text'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import { useRhythmicRerender } from '@increaser/ui/hooks/useRhythmicRerender'
import { useAssertUserState } from 'user/state/UserStateContext'

export const FreeTrialStatus = () => {
  const { subscription, lifeTimeDeal, freeTrialEnd } = useAssertUserState()

  const now = useRhythmicRerender()

  if (subscription || lifeTimeDeal) {
    return null
  }

  return (
    <Text color="supporting" size={14}>
      {freeTrialEnd > now
        ? `${formatDuration(freeTrialEnd - now, 'ms')} of free trial left`
        : 'Your free trial has ended'}
    </Text>
  )
}
