import { InputProps } from '@increaser/ui/props'
import { MS_IN_HOUR } from '@increaser/utils/time'
import { endOfDay, startOfHour } from 'date-fns'
import { TimeSpace } from '@increaser/ui/ui/TimeSpace'
import { useCallback } from 'react'
import { useRhythmicRerender } from 'shared/hooks/useRhythmicRerender'
import { MS_IN_MIN } from '@increaser/utils/time'
import { useProjects } from 'projects/hooks/useProjects'
import { Text } from '@increaser/ui/ui/Text'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import { PressTracker } from '@increaser/ui/ui/PressTracker'
import { enforceRange } from '@increaser/utils/enforceRange'
import { VStack } from '@increaser/ui/ui/Stack'
import { EditorActiveSession } from './EditorActiveSession'
import { BoundaryInteractiveArea } from './BoundaryInteractiveArea'

interface SessionEndTimeInputProps extends InputProps<number> {
  projectId: string
  startedAt: number
}

const pxInHour = 100

export const SessionEndTimeInput = ({
  projectId,
  startedAt,
  value,
  onChange,
}: SessionEndTimeInputProps) => {
  const timeSpaceStartsAt = startOfHour(startedAt).getTime()
  const now = useRhythmicRerender(MS_IN_MIN)
  const timeSpaceEndsAt = Math.min(
    endOfDay(startedAt).getTime(),
    now,
    timeSpaceStartsAt + 4 * MS_IN_HOUR,
  )
  const timeSpaceDuration = timeSpaceEndsAt - timeSpaceStartsAt
  const msToPx = useCallback((ms: number) => (ms / MS_IN_HOUR) * pxInHour, [])

  const { projectsRecord } = useProjects()
  const color = projectsRecord[projectId].hslaColor

  const handleMove = (y: number) => {
    const time = timeSpaceStartsAt + y * timeSpaceDuration
    const newValue = enforceRange(
      time,
      startedAt + 5 * MS_IN_MIN,
      Math.min(now, timeSpaceEndsAt),
    )
    onChange(newValue)
  }

  return (
    <TimeSpace
      msToPx={msToPx}
      startsAt={timeSpaceStartsAt}
      endsAt={timeSpaceEndsAt}
    >
      <PressTracker
        onChange={({ position }) => {
          if (position) {
            handleMove(position.y)
          }
        }}
        render={({ props: { ref, ...rest } }) => (
          <VStack ref={ref} fullWidth fullHeight>
            <EditorActiveSession
              $color={color}
              style={{
                top: msToPx(startedAt - timeSpaceStartsAt),
                height: msToPx(value - startedAt),
              }}
            >
              <Text weight="bold">
                {formatDuration(value - startedAt, 'ms')}
              </Text>
            </EditorActiveSession>
            <BoundaryInteractiveArea
              top={msToPx(value - timeSpaceStartsAt)}
              {...rest}
            />
          </VStack>
        )}
      />
    </TimeSpace>
  )
}
