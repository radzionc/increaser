import { useTrackTime } from './TrackTimeProvider'
import { WeekdaySelector } from './WeekdaySelector'
import { HStack } from '@lib/ui/layout/Stack'
import { ProjectSelector } from './ProjectSelector'
import { TrackTimeTitle } from './TrackTimeTitle'

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
        {currentSet && <ProjectSelector />}
        <WeekdaySelector />
      </HStack>
    </HStack>
  )
}
