import { TakeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { IntervalEditorControl } from '@lib/ui/timeline/IntervalEditorControl'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useEvent } from 'react-use'
import { useTrackTime } from './state/TrackTimeContext'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { msToPx, pxToMs } from './config'
import { enforceRange } from '@lib/utils/enforceRange'
import { centerContent } from '@lib/ui/css/centerContent'
import { MoveIcon } from '@lib/ui/icons/MoveIcon'
import { PositionAbsolutelyCenterHorizontally } from '@lib/ui/layout/PositionAbsolutelyCenterHorizontally'
import { VStack } from '@lib/ui/layout/Stack'
import {
  HStackSeparatedBy,
  dotSeparator,
} from '@lib/ui/layout/StackSeparatedBy'
import { getColor } from '@lib/ui/theme/getters'
import { formatTime } from '@lib/utils/time/formatTime'
import styled, { css } from 'styled-components'
import { IntervalRect } from '../../sets/components/IntervalInput/IntervalRect'
import { Text } from '@lib/ui/text'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { formatDuration } from '@lib/utils/time/formatDuration'

const MoveIconWr = styled.div`
  font-size: 16px;
`

const CurrentIntervalRect = styled(IntervalRect)`
  ${centerContent}

  ${({ $color }) => css`
    background: ${$color.getVariant({ a: () => 0.12 }).toCssValue()};
    border: 2px solid ${$color.toCssValue()};
    color: ${$color.toCssValue()};
  `}
`

export const InteractiveBoundaryArea = styled.div`
  width: 100%;
  cursor: row-resize;
  height: 10px;
`

const InteractiveDragArea = styled.div`
  position: absolute;
  width: 100%;
  cursor: grab;
`

const DurationText = styled(VStack)`
  position: absolute;
  width: 100%;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: ${getColor('contrast')};
`

export const SetEditor = () => {
  const { projectsRecord } = useProjects()
  const { currentSet, dayInterval, setState } = useTrackTime()
  const value = shouldBePresent(currentSet)
  const [activeControl, setActiveControl] =
    useState<IntervalEditorControl | null>(null)

  useEvent('pointerup', () => setActiveControl(null))
  useEvent('pointercancel', () => setActiveControl(null))

  const containerElement = useRef<HTMLDivElement | null>(null)
  const intervalElement = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    intervalElement.current?.scrollIntoView({
      block: 'nearest',
      inline: 'start',
    })
  }, [value])

  useEvent('pointermove', ({ clientY }) => {
    if (!activeControl) return

    const containerRect = containerElement?.current?.getBoundingClientRect()
    if (!containerRect) return

    const timestamp = dayInterval.start + pxToMs(clientY - containerRect.top)

    const getNewInterval = () => {
      if (activeControl === 'position') {
        const halfDuration = valueDuration / 2
        const oldCenter = value.start + halfDuration

        const newCenter = enforceRange(
          timestamp,
          dayInterval.start + halfDuration,
          dayInterval.end - halfDuration,
        )

        const offset = newCenter - oldCenter

        return {
          start: value.start + offset,
          end: value.end + offset,
        }
      } else {
        return {
          start:
            activeControl === 'start'
              ? enforceRange(timestamp, dayInterval.start, value.end)
              : value.start,
          end:
            activeControl === 'end'
              ? enforceRange(timestamp, value.start, dayInterval.end)
              : value.end,
        }
      }
    }

    const interval = getNewInterval()

    setState((state) => ({
      ...state,
      currentSet: {
        ...shouldBePresent(state.currentSet),
        ...interval,
      },
    }))
  })

  const cursor = useMemo(() => {
    if (!activeControl) return undefined

    if (activeControl === 'position') return 'grabbing'

    return 'row-resize'
  }, [activeControl])

  const valueDuration = getIntervalDuration(value)
  const intervalStartInPx = msToPx(value.start - dayInterval.start)
  const intervalEndInPx = msToPx(value.end - dayInterval.start)
  const intervalDurationInPx = msToPx(valueDuration)

  return (
    <TakeWholeSpace style={{ cursor }} ref={containerElement}>
      <CurrentIntervalRect
        $color={projectsRecord[value.projectId].hslaColor}
        ref={intervalElement}
        style={{
          top: intervalStartInPx,
          height: intervalDurationInPx,
        }}
      >
        <MoveIconWr style={{ opacity: activeControl ? 0 : 1 }}>
          <MoveIcon />
        </MoveIconWr>
      </CurrentIntervalRect>

      <DurationText
        style={{
          top: intervalEndInPx + 2,
        }}
        as="div"
      >
        <HStackSeparatedBy separator={dotSeparator}>
          <Text>
            {formatTime(value.start)} - {formatTime(value.end)}
          </Text>
          <Text>{formatDuration(valueDuration, 'ms', { kind: 'long' })}</Text>
        </HStackSeparatedBy>
      </DurationText>

      {!activeControl && (
        <>
          <InteractiveDragArea
            style={{
              top: intervalStartInPx,
              height: intervalDurationInPx,
            }}
            onMouseDown={() => setActiveControl('position')}
          />

          <PositionAbsolutelyCenterHorizontally
            fullWidth
            top={intervalStartInPx}
          >
            <InteractiveBoundaryArea
              onMouseDown={() => setActiveControl('start')}
            />
          </PositionAbsolutelyCenterHorizontally>

          <PositionAbsolutelyCenterHorizontally fullWidth top={intervalEndInPx}>
            <InteractiveBoundaryArea
              onMouseDown={() => setActiveControl('end')}
            />
          </PositionAbsolutelyCenterHorizontally>
        </>
      )}
    </TakeWholeSpace>
  )
}
