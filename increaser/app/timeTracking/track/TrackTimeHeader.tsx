import { useTrackTime } from './state/TrackTimeContext'
import { WeekdaySelector } from './WeekdaySelector'
import { HStack } from '@lib/ui/layout/Stack'
import { TrackTimeTitle } from './TrackTimeTitle'
import { TrackProjectSelector } from './TrackProjectSelector'

export const TrackTimeHeader = () => {
  const { currentSet } = useTrackTime()

  return (
    <HStack
      fullWidth
      alignItems="center"
      justifyContent="space-between"
      gap={20}
      wrap="wrap"
    >
      <TrackTimeTitle />
      <HStack alignItems="center" gap={8}>
        {currentSet && <TrackProjectSelector />}
        <WeekdaySelector />
      </HStack>
    </HStack>
  )
}
