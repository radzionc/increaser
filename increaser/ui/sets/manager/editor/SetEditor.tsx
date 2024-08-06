import { TakeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { IntervalEditorControl } from '@lib/ui/timeline/IntervalEditorControl'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useEvent } from 'react-use'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { enforceRange } from '@lib/utils/enforceRange'
import { MoveIcon } from '@lib/ui/icons/MoveIcon'
import { PositionAbsolutelyCenterHorizontally } from '@lib/ui/layout/PositionAbsolutelyCenterHorizontally'
import { InteractiveBoundaryArea } from '@lib/ui/timeline/InteractiveBoundaryArea'
import { FloatingIntervalDuration } from '@lib/ui/timeline/FloatingIntervalDuration'
import { InteractiveDragArea } from '@lib/ui/timeline/InteractiveDragArea'
import { CurrentIntervalRect } from '@lib/ui/timeline/CurrentIntervalRect'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import styled, { useTheme } from 'styled-components'
import { useWeekdayPassedInterval } from '@lib/ui/time/hooks/useWeekdayPassedInterval'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { useActiveSet } from '../ActiveSetProvider'
import { setEditorConfig } from './config'
import { editorSetFrame } from './editorSetFrame'

const CurrentInterval = styled(CurrentIntervalRect)`
  ${editorSetFrame};
`

export const SetEditor = () => {
  const { projects } = useAssertUserState()
  const [value, setActiveSet] = usePresentState(useActiveSet())
  const [weekday] = useSelectedWeekday()
  const dayInterval = useWeekdayPassedInterval(weekday)
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

  useEffect(() => {
    intervalElement.current?.scrollIntoView({
      block: 'center',
      inline: 'start',
    })
  }, [])

  useEvent('pointermove', ({ clientY }) => {
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
  })

  const cursor = useMemo(() => {
    if (!activeControl) return undefined

    if (activeControl === 'position') return 'grabbing'

    return 'row-resize'
  }, [activeControl])

  const valueDuration = getIntervalDuration(value)
  const intervalStartInPx = setEditorConfig.msToPx(
    value.start - dayInterval.start,
  )
  const intervalEndInPx = setEditorConfig.msToPx(value.end - dayInterval.start)
  const intervalDurationInPx = setEditorConfig.msToPx(valueDuration)

  const { colors } = useTheme()

  return (
    <TakeWholeSpace style={{ cursor }} ref={containerElement}>
      <CurrentInterval
        $color={colors.getLabelColor(projects[value.projectId].color)}
        ref={intervalElement}
        style={{
          top: intervalStartInPx,
          height: intervalDurationInPx,
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
