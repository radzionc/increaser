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
import { PointerEvent, useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { TakeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { useBoundingBox } from '@lib/ui/hooks/useBoundingBox'
import { Point } from '@lib/ui/entities/Point'
import { useRelativePosition } from '@lib/ui/hooks/useRelativePosition'
import { enforceRange } from '@lib/utils/enforceRange'
import { match } from '@lib/utils/match'
import { useTotalIntervalLength } from './useTotalIntervalLength'
import { useSelectedInterval } from './useSelectedInterval'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { trackedTimeIntervalConfig } from './config'
import { SelectedArea } from './SelectedArea'
import { getIntIntervalLength } from '@lib/utils/interval/getIntIntervalLength'
import { preventDefault } from '@lib/ui/utils/preventDefault'
import { WindowPointerMoveListener } from '@lib/ui/base/WindowPointerMoveListener'

const Container = styled(TakeWholeSpaceAbsolutely)`
  cursor: ew-resize;
`

const offset = trackedTimeIntervalConfig.interactiveHorizontalOffset

const PressHandler = styled(Container)`
  width: calc(100% + ${toSizeUnit(offset * 2)});
  left: ${toSizeUnit(-offset)};
`

export const ManageTrackedTimeInterval = () => {
  const totalLength = useTotalIntervalLength()
  const [interval, setInterval] = useSelectedInterval()
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

  const handleMove = useCallback(
    ({
      clientX,
      clientY,
    }: Pick<PointerEvent<Element>, 'clientX' | 'clientY'>) => {
      setClientPosition({ x: clientX, y: clientY })
    },
    [],
  )

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

  return (
    <>
      <SelectedArea
        style={{
          left: toPercents(start / totalLength),
          width: toPercents(getIntIntervalLength(interval) / totalLength),
        }}
      />
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
      <Container ref={setContainer} />
      {activeBoundary ? (
        <WindowPointerMoveListener onMove={handleMove} onStop={stopDragging} />
      ) : (
        <PressHandler
          onPointerMove={handleMove}
          onPointerLeave={clearPosition}
          onPointerOver={handleMove}
          onPointerDown={preventDefault(() => {
            if (hoveredBoundary) {
              setActiveBoundary(hoveredBoundary)
            }
          })}
        />
      )}
    </>
  )
}
