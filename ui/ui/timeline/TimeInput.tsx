import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import { useEvent } from 'react-use'
import styled from 'styled-components'

import { HSLA } from '../colors/HSLA'
import { ChevronDownIcon } from '../icons/ChevronDownIcon'
import { ChevronUpIcon } from '../icons/ChevronUpIcon'
import { StackSeparatedBy, dotSeparator } from '../StackSeparatedBy'
import { VStack } from '../Stack'
import { Text } from '../Text'
import { getVerticalMarginCSS } from '../utils/getVerticalMarginCSS'
import { HourSpace } from './HourSpace'
import { InteractiveBoundaryArea } from './InteractiveBoundaryArea'
import { MaxIntervalEndBoundary } from './MaxIntervalEndBoundary'
import { enforceRange } from '../../shared/utils/enforceRange'
import { MS_IN_HOUR, MS_IN_MIN } from '../../shared/utils/time'
import { formatDuration } from '../../shared/utils/formatDuration'

export interface TimeInputProps {
  color: HSLA
  value: number
  onChange: (value: number) => void
  startOfDay: number
  startHour: number
  endHour: number
  max: number
  min?: number

  intialValue: number

  pxInHour?: number
}

const Container = styled.div`
  ${getVerticalMarginCSS(8)}
  user-select: none;
`

const currentLineHeightInPx = 2

const CurrentLine = styled.div`
  position: absolute;
  width: 100%;
  border-radius: 100px;
  height: ${currentLineHeightInPx}px;
`

const TimeValue = styled(Text)`
  position: absolute;
  width: 100%;
  font-size: 14px;
  transition: none;
`

const Session = styled.div`
  width: 100%;
  position: absolute;
`

export const TimeInput = ({
  color,
  value,
  onChange,
  startOfDay,
  endHour,
  startHour,
  pxInHour = 60,
  max,
  min,
  intialValue,
}: TimeInputProps) => {
  const hoursCount = endHour - startHour

  const minTimeStart = startOfDay + MS_IN_HOUR * startHour
  const timelineStart = minTimeStart

  const height = hoursCount * pxInHour
  const pxInMs = height / (hoursCount * MS_IN_HOUR)

  const [isActive, setIsActive] = useState(false)

  useEvent('mouseup', () => setIsActive(false))

  const containerElement = useRef<HTMLDivElement | null>(null)
  const timeElement = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    timeElement.current?.scrollIntoView()
  }, [timeElement])

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = ({ clientY }) => {
    if (!isActive) return

    const containerRect = containerElement?.current?.getBoundingClientRect()
    if (!containerRect) return

    const y =
      enforceRange(clientY, containerRect.top, containerRect.bottom) -
      containerRect.top

    const timestamp = timelineStart + y / pxInMs

    onChange(enforceRange(timestamp, min ?? minTimeStart, max))
  }

  const cursor = isActive ? 'row-resize' : undefined

  const valueInPx = pxInMs * (value - timelineStart)

  const minDiff = Math.round(intialValue - value) / MS_IN_MIN

  return (
    <Container
      ref={containerElement}
      style={{ height: height, cursor }}
      onMouseMove={handleMouseMove}
    >
      <HourSpace start={startHour} end={endHour}>
        {min && (
          <>
            <MaxIntervalEndBoundary
              timestamp={min}
              y={pxInMs * (min - timelineStart)}
              isActive={isActive}
            />
            <Session
              style={{
                top: pxInMs * (min - timelineStart),
                height: pxInMs * (value - min),
                background: color.getVariant({ a: () => 0.2 }).toCssValue(),
              }}
            />
          </>
        )}
        {max && (
          <>
            <MaxIntervalEndBoundary
              timestamp={max}
              y={pxInMs * (max - timelineStart)}
              isActive={isActive}
            />
            {!min && (
              <Session
                style={{
                  top: valueInPx,
                  height: pxInMs * (max - timelineStart) - valueInPx,
                  background: color.getVariant({ a: () => 0.2 }).toCssValue(),
                }}
              />
            )}
          </>
        )}

        <CurrentLine
          ref={timeElement}
          style={{
            background: color.toCssValue(),
            top: valueInPx - currentLineHeightInPx / 2,
          }}
        />

        <TimeValue
          style={{
            top: valueInPx - 20,
          }}
        >
          <StackSeparatedBy
            alignItems="center"
            direction="row"
            gap={8}
            separator={<Text color="supporting">{dotSeparator}</Text>}
          >
            <Text>
              {new Date(value).toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            {minDiff !== 0 && (
              <Text as="span" color="supporting">
                {formatDuration(Math.abs(minDiff), 'min')}{' '}
                {minDiff < 0 ? 'later' : 'earlier'}
              </Text>
            )}
          </StackSeparatedBy>
        </TimeValue>

        {!isActive && (
          <InteractiveBoundaryArea
            y={valueInPx}
            onMouseDown={() => setIsActive(true)}
          >
            <VStack style={{ color: color.toCssValue() }} alignItems="center">
              <ChevronUpIcon />
              <ChevronDownIcon />
            </VStack>
          </InteractiveBoundaryArea>
        )}
      </HourSpace>
    </Container>
  )
}
