import { formatDuration } from '@increaser/ui/shared/utils/formatDuration'
import { Text } from '@increaser/ui/ui/Text'
import { useRhythmicRerender } from '@increaser/ui/ui/hooks/useRhythmicRerender'

interface LastScoreboardUpdateProps {
  updatedAt: number
}

export const LastScoreboardUpdate = ({
  updatedAt,
}: LastScoreboardUpdateProps) => {
  const now = useRhythmicRerender()
  return (
    <Text color="supporting" as="span" size={14} weight="regular">
      updated {formatDuration(now - updatedAt, 'ms')} ago
    </Text>
  )
}
