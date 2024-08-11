import { Text } from '@lib/ui/text'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { MS_IN_MIN } from '@lib/utils/time'
import { formatDuration } from '@lib/utils/time/formatDuration'

interface LastScoreboardUpdateProps {
  value: number
}

export const LastScoreboardUpdate = ({ value }: LastScoreboardUpdateProps) => {
  const now = useRhythmicRerender(1000)
  const duration = now - value

  return (
    <Text color="supporting" as="span" size={14} weight="400">
      Updated{' '}
      {duration < MS_IN_MIN
        ? 'just now'
        : `${formatDuration(duration, 'ms')} ago`}
    </Text>
  )
}
