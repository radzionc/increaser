import { WindowPointerMoveListener } from '@lib/ui/base/WindowPointerMoveListener'
import { TakeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { MoveIcon } from '@lib/ui/icons/MoveIcon'
import { PositionAbsolutelyCenterHorizontally } from '@lib/ui/layout/PositionAbsolutelyCenterHorizontally'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { useWeekdayPassedInterval } from '@lib/ui/time/hooks/useWeekdayPassedInterval'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { CurrentIntervalRect } from '@lib/ui/timeline/CurrentIntervalRect'
import { FloatingIntervalDuration } from '@lib/ui/timeline/FloatingIntervalDuration'
import { InteractiveBoundaryArea } from '@lib/ui/timeline/InteractiveBoundaryArea'
import { InteractiveDragArea } from '@lib/ui/timeline/InteractiveDragArea'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { enforceRange } from '@lib/utils/enforceRange'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { useUser } from '@product/ui/user/state/user'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import styled, { useTheme } from 'styled-components'

import { useActiveSet } from '../ActiveSetProvider'

import { useActiveControl } from './ActiveControlProvider'
import { setEditorConfig } from './config'
import { editorSetFrame } from './editorSetFrame'

const borderWidth = 2

const CurrentInterval = styled(CurrentIntervalRect)`
  ${editorSetFrame};
  border-width: ${toSizeUnit(borderWidth)};
`

export const SetEditor = () => {
  const { projects } = useUser()
  const [value, setActiveSet] = usePresentState(useActiveSet())
  const [weekday] = useSelectedWeekday()
  const dayInterval = useWeekdayPassedInterval(weekday)
  const [activeControl, setActiveControl] = useActiveControl()

  const deactivate = useCallback(
    () => setActiveControl(null),
    [setActiveControl],
  )

  const containerElement = useRef<HTMLDivElement | null>(null)
  const intervalElement = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    intervalElement.current?.scrollIntoView({
      block: 'nearest',
      inline: 'start',
    })
  }, [value])

  useEffect(() => {
    intervalElement.current?.scrollIntoView({
      block: 'center',
      inline: 'start',
    })
  }, [])

  const valueDuration = getIntervalDuration(value)

  const handleMove = useCallback(
    ({ clientY }: PointerEvent) => {
      if (!activeControl) return

      const containerRect = containerElement?.current?.getBoundingClientRect()
      if (!containerRect) return

      const timestamp =
        dayInterval.start + setEditorConfig.pxToMs(clientY - containerRect.top)

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

      setActiveSet((state) => ({
        ...shouldBePresent(state),
        ...interval,
      }))
    },
    [
      activeControl,
      dayInterval.end,
      dayInterval.start,
      setActiveSet,
      value.end,
      value.start,
      valueDuration,
    ],
  )

  const cursor = useMemo(() => {
    if (!activeControl) return undefined

    if (activeControl === 'position') return 'grabbing'

    return 'row-resize'
  }, [activeControl])

  const intervalStartInPx = setEditorConfig.msToPx(
    value.start - dayInterval.start,
  )
  const intervalEndInPx = setEditorConfig.msToPx(value.end - dayInterval.start)
  const intervalDurationInPx = setEditorConfig.msToPx(valueDuration)

  const { colors } = useTheme()

  return (
    <TakeWholeSpace style={{ cursor }} ref={containerElement}>
      <WindowPointerMoveListener onMove={handleMove} onStop={deactivate} />
      <CurrentInterval
        $color={colors.getLabelColor(projects[value.projectId].color)}
        ref={intervalElement}
        style={{
          top: intervalStartInPx - borderWidth / 2,
          height: intervalDurationInPx + borderWidth,
        }}
      >
        <IconWrapper style={{ opacity: activeControl ? 0 : 1 }}>
          <MoveIcon />
        </IconWrapper>
      </CurrentInterval>

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
            onPointerDown={() => setActiveControl('position')}
          />

          <PositionAbsolutelyCenterHorizontally
            fullWidth
            top={intervalStartInPx}
          >
            <InteractiveBoundaryArea
              onPointerDown={() => setActiveControl('start')}
            />
          </PositionAbsolutelyCenterHorizontally>

          <PositionAbsolutelyCenterHorizontally fullWidth top={intervalEndInPx}>
            <InteractiveBoundaryArea
              onPointerDown={() => setActiveControl('end')}
            />
          </PositionAbsolutelyCenterHorizontally>
        </>
      )}
    </TakeWholeSpace>
  )
}
