import { Text } from '@increaser/ui/text'
import { useRhythmicRerender } from '@increaser/ui/hooks/useRhythmicRerender'
import { MS_IN_MIN } from '@increaser/utils/time'
import { formatDuration } from '@increaser/utils/time/formatDuration'

interface LastScoreboardUpdateProps {
  value: number
}

export const LastScoreboardUpdate = ({ value }: LastScoreboardUpdateProps) => {
  const now = useRhythmicRerender(1000)
  const duration = now - value

  return (
    <Text color="supporting" as="span" size={14} weight="regular">
      Updated{' '}
      {duration < MS_IN_MIN
        ? 'just now'
        : `${formatDuration(duration, 'ms')} ago`}
    </Text>
  )
}
