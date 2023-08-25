import { useRhythmicRerender } from 'shared/hooks/useRhythmicRerender'
import { useWeekday } from 'shared/hooks/useWeekday'
import { formatTime } from '@increaser/utils/formatTime'
import { Text } from '@increaser/ui/ui/Text'
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
