import { useTrackedTimeIntervalLength } from './useTrackedTimeIntervalLength'
import { useTrackedTimeSelectedInterval } from './useTrackedTimeSelectedInterval'
import {
  IntervalBoundaryItem,
  IntervalBoundaryStatus,
} from './IntervalBoundaryItem'
import {
  intervalBoundaries,
  IntervalBoundary,
} from '@lib/utils/interval/Interval'
import { toPercents } from '@lib/utils/toPercents'
import { PositionAbsolutelyCenterVertically } from '@lib/ui/layout/PositionAbsolutelyCenterVertically'
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import styled from 'styled-components'
import { TakeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { useBoundingBox } from '@lib/ui/hooks/useBoundingBox'
import { Point } from '@lib/ui/entities/Point'
import { useEvent } from 'react-use'
import { useRelativePosition } from '@lib/ui/hooks/useRelativePosition'
import { enforceRange } from '@lib/utils/enforceRange'
import { match } from '@lib/utils/match'

const Container = styled(TakeWholeSpaceAbsolutely)`
  cursor: ew-resize;
`

export const ManageTrackedTimeInterval = () => {
  const totalLength = useTrackedTimeIntervalLength()
  const [interval, setInterval] = useTrackedTimeSelectedInterval()
  const { start, end } = interval

  const startAreaShare = (start + (end - start) / 2) / totalLength

  const [activeBoundary, setActiveBoundary] = useState<IntervalBoundary | null>(
    null,
  )

  const [clientPosition, setClientPosition] = useState<Point | null>(null)

  const [container, setContainer] = useState<HTMLElement | null>(null)
  const box = useBoundingBox(container)

  const position = useRelativePosition({ box, clientPosition })

  const hoveredBoundary = useMemo(() => {
    if (!position) return null

    const { x } = position

    return x <= startAreaShare ? 'start' : 'end'
  }, [position, startAreaShare])

  const clearPosition = useCallback(() => {
    setClientPosition(null)
  }, [])

  const handleMove: MouseEventHandler<HTMLElement> = useCallback((event) => {
    setClientPosition({ x: event.clientX, y: event.clientY })
  }, [])

  useEffect(() => {
    if (!activeBoundary || !position) return

    const scaledValue = Math.round(position.x * totalLength)

    const newValue = enforceRange(
      match(activeBoundary, {
        start: () => scaledValue,
        end: () => scaledValue - 1,
      }),
      match(activeBoundary, {
        start: () => 0,
        end: () => start,
      }),
      match(activeBoundary, {
        start: () => end,
        end: () => totalLength,
      }),
    )

    setInterval((prev) => ({ ...prev, [activeBoundary]: newValue }))
  }, [activeBoundary, end, position, setInterval, start, totalLength])

  const stopDragging = useCallback(() => {
    setActiveBoundary(null)
  }, [])

  useEvent('pointerup', activeBoundary ? stopDragging : undefined)
  useEvent('pointercancel', activeBoundary ? stopDragging : undefined)
  useEvent('pointermove', activeBoundary ? handleMove : undefined)

  const containerListeners = useMemo(() => {
    if (activeBoundary) return {}

    return {
      onMouseEnter: handleMove,
      onMouseLeave: clearPosition,
      onMouseMove: handleMove,
      onPointerDown: () => {
        if (hoveredBoundary) {
          setActiveBoundary(hoveredBoundary)
        }
      },
    }
  }, [activeBoundary, clearPosition, handleMove, hoveredBoundary])

  return (
    <>
      {intervalBoundaries.map((boundary) => {
        const value = interval[boundary]
        const left = toPercents(
          (boundary === 'start' ? value : value + 1) / totalLength,
        )

        let status: IntervalBoundaryStatus = 'idle'
        if (activeBoundary) {
          if (activeBoundary === boundary) {
            status = 'active'
          }
        } else if (hoveredBoundary === boundary) {
          status = 'hovered'
        }

        return (
          <PositionAbsolutelyCenterVertically
            key={boundary}
            left={left}
            fullHeight
            style={{ pointerEvents: 'none' }}
          >
            <IntervalBoundaryItem status={status} />
          </PositionAbsolutelyCenterVertically>
        )
      })}
      <Container ref={setContainer} {...containerListeners} />
    </>
  )
}
