import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { formatTime } from '@lib/utils/time/formatTime'
import { Text } from '@lib/ui/text'
import { WEEKDAYS } from '@lib/utils/time'
import { PageTitle } from '@increaser/app/ui/PageTitle'

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
