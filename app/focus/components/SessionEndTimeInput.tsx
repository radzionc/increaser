import { InputProps } from '@increaser/ui/shared/props'
import { MS_IN_HOUR } from '@increaser/utils/time'
import { endOfDay, startOfHour } from 'date-fns'
import { TimeSpace } from '@increaser/ui/ui/TimeSpace'
import { useCallback } from 'react'
import styled from 'styled-components'
import { useRhythmicRerender } from 'shared/hooks/useRhythmicRerender'
import { MS_IN_MIN } from 'utils/time'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { useProjects } from 'projects/hooks/useProjects'
import { Text } from '@increaser/ui/ui/Text'
import { formatDuration } from 'shared/utils/formatDuration'
import { PressTracker } from '@increaser/ui/ui/PressTracker'
import { PositionAbsolutelyCenterHorizontally } from '@increaser/ui/ui/PositionAbsolutelyCenterHorizontally'
import { enforceRange } from 'shared/utils/enforceRange'
import { VStack } from '@increaser/ui/ui/Stack'
import { ChevronDownIcon } from '@increaser/ui/ui/icons/ChevronDownIcon'
import { ChevronUpIcon } from '@increaser/ui/ui/icons/ChevronUpIcon'
import { getColor } from '@increaser/ui/ui/theme/getters'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { CenterAbsolutely } from '@increaser/ui/ui/CenterAbsolutely'

interface SessionEndTimeInputProps extends InputProps<number> {
  projectId: string
  startedAt: number
}

const pxInHour = 100

const Session = styled.div<{ $color: HSLA }>`
  position: absolute;
  left: 0;
  width: 100%;

  ${centerContentCSS}

  border-radius: 4px;

  border: 2px solid ${({ $color }) => $color.toCssValue()};
  border-bottom-color: ${getColor('contrast')};
  background: ${({ $color }) =>
    $color.getVariant({ a: () => 0.12 }).toCssValue()};
`

const InteractiveArea = styled.div`
  width: 100%;
  cursor: row-resize;
  ${centerContentCSS};
  height: 20px;
  color: ${getColor('contrast')};
  svg {
    font-size: 18px;
    ${defaultTransitionCSS};
  }
  :hover {
    svg {
      transform: scale(1.24);
    }
  }
`

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
          console.log(position)
          if (position) {
            handleMove(position.y)
          }
        }}
        render={({ props: { ref, ...rest } }) => (
          <VStack ref={ref} fullWidth fullHeight>
            <Session
              $color={color}
              style={{
                top: msToPx(startedAt - timeSpaceStartsAt),
                height: msToPx(value - startedAt),
              }}
            >
              <Text weight="bold">
                {formatDuration(value - startedAt, 'ms')}
              </Text>
            </Session>
            <PositionAbsolutelyCenterHorizontally
              fullWidth
              top={msToPx(value - timeSpaceStartsAt)}
            >
              <InteractiveArea {...rest}>
                <CenterAbsolutely>
                  <VStack alignItems="center">
                    <ChevronUpIcon />
                    <ChevronDownIcon />
                  </VStack>
                </CenterAbsolutely>
              </InteractiveArea>
            </PositionAbsolutelyCenterHorizontally>
          </VStack>
        )}
      />
    </TimeSpace>
  )
}
