import { Text } from '@lib/ui/text'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { useAssertUserState } from '@increaser/app/user/state/UserStateContext'

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
