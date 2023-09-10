import { Text } from '@increaser/ui/ui/Text'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import { useRhythmicRerender } from '@increaser/ui/hooks/useRhythmicRerender'
import { useAssertUserState } from 'user/state/UserStateContext'

export const FreeTrialStatus = () => {
  const { membership, freeTrialEnd } = useAssertUserState()

  const now = useRhythmicRerender()

  if (membership) {
    return null
  }

  return (
    <Text color="supporting" size={14}>
      {freeTrialEnd > now
        ? `${formatDuration(freeTrialEnd - now, 'ms')} of free trial left`
        : 'Free trial expired'}
    </Text>
  )
}
