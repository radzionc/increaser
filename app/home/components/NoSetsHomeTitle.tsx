import { useRhythmicRerender } from '@increaser/ui/hooks/useRhythmicRerender'
import { useWeekday } from '@increaser/ui/hooks/useWeekday'
import { formatTime } from '@increaser/utils/time/formatTime'
import { Text } from '@increaser/ui/text'
import { WEEKDAYS } from '@increaser/utils/time'
import { PageTitle } from 'ui/PageTitle'

export const NoSetsHomeTitle = () => {
  const weekday = useWeekday()

  const now = useRhythmicRerender()

  return (
    <PageTitle
      title={
        <Text>
          {WEEKDAYS[weekday]}, {formatTime(now)}
        </Text>
      }
    />
  )
}
