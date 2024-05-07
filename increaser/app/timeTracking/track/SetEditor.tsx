import { TakeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { IntervalEditorControl } from '@lib/ui/timeline/IntervalEditorControl'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useEvent } from 'react-use'
import { useTrackTime } from './state/TrackTimeContext'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { msToPx, pxToMs } from './config'
import { enforceRange } from '@lib/utils/enforceRange'
import { MoveIcon } from '@lib/ui/icons/MoveIcon'
import { PositionAbsolutelyCenterHorizontally } from '@lib/ui/layout/PositionAbsolutelyCenterHorizontally'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { InteractiveBoundaryArea } from '@lib/ui/timeline/InteractiveBoundaryArea'
import { FloatingIntervalDuration } from '@lib/ui/timeline/FloatingIntervalDuration'
import { InteractiveDragArea } from '@lib/ui/timeline/InteractiveDragArea'
import { CurrentIntervalRect } from '@lib/ui/timeline/CurrentIntervalRect'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'

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
        <IconWrapper style={{ opacity: activeControl ? 0 : 1 }}>
          <MoveIcon />
        </IconWrapper>
      </CurrentIntervalRect>

      <FloatingIntervalDuration
        style={{
          top: intervalEndInPx + 2,
        }}
        value={value}
      />

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
