import { formatDuration } from '@increaser/ui/shared/utils/formatDuration'
import { Text } from '@increaser/ui/ui/Text'
import { useRhythmicRerender } from '@increaser/ui/ui/hooks/useRhythmicRerender'
import { MS_IN_MIN } from 'utils/time'
import { useCurrentMonthUsers } from './CurrentMonthUsersProvider'

export const LastScoreboardUpdate = () => {
  const { createdAt } = useCurrentMonthUsers()
  const now = useRhythmicRerender()
  const duration = now - createdAt
  return (
    <Text color="supporting" as="span" size={14} weight="regular">
      updated{' '}
      {duration < MS_IN_MIN
        ? 'just now'
        : `${formatDuration(duration, 'ms')} ago`}
    </Text>
  )
}
