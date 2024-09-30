import { TakeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { useRef, useState } from 'react'
import { useEvent } from 'react-use'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { enforceRange } from '@lib/utils/enforceRange'
import { CurrentIntervalRect } from '@lib/ui/timeline/CurrentIntervalRect'
import styled, { useTheme } from 'styled-components'
import { BoundaryInteractiveArea } from '@lib/ui/timeline/BoundaryInteractiveArea'
import { Text } from '@lib/ui/text'
import { formatTime } from '@lib/utils/time/formatTime'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { formatDuration } from '@lib/utils/time/formatDuration'
import {
  HStackSeparatedBy,
  dotSeparator,
} from '@lib/ui/layout/StackSeparatedBy'
import { getColor } from '@lib/ui/theme/getters'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { setEditorConfig } from '@increaser/ui/sets/manager/editor/config'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useCurrentInterval } from '@lib/ui/state/currentInterval'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { useCurrentFocusEndTime } from './state/CurrentFocusEndTime'
import { useAssertFocusIntervals } from '../../../state/focusIntervals'
import { useProject } from '@increaser/ui/projects/hooks/useProject'

const TimeValue = styled(HStackSeparatedBy)`
  position: absolute;
  font-size: 14px;
  font-weight: 500;
  color: ${getColor('contrast')};
`

export const EndTimeEditor = () => {
  const [isActive, setIsActive] = useState(false)

  const [value, setValue] = useCurrentFocusEndTime()

  const intervals = useAssertFocusIntervals()

  const { projectId, start: min } = getLastItem(intervals)

  const interval = useCurrentInterval()

  useEvent('pointerup', () => setIsActive(false))
  useEvent('pointercancel', () => setIsActive(false))

  const containerElement = useRef<HTMLDivElement | null>(null)
  const intervalElement = useRef<HTMLDivElement | null>(null)

  const now = useRhythmicRerender(convertDuration(10, 's', 'ms'))

  useEvent('pointermove', ({ clientY }) => {
    if (!isActive) return

    const containerRect = containerElement?.current?.getBoundingClientRect()
    if (!containerRect) return

    const timestamp =
      interval.start + setEditorConfig.pxToMs(clientY - containerRect.top)

    const endedAt = enforceRange(timestamp, min, now)

    setValue(endedAt)
  })

  const cursor = isActive ? 'row-resize' : undefined

  const valueDuration = getIntervalDuration({ start: min, end: value })
  const valueInPx = setEditorConfig.msToPx(value - interval.start)
  const startInPx = setEditorConfig.msToPx(min - interval.start)
  const intervalDurationInPx = setEditorConfig.msToPx(valueDuration)

  const theme = useTheme()

  const minDiff = Math.round(convertDuration(now - value, 'ms', 'min'))

  const project = shouldBePresent(useProject(projectId))

  return (
    <TakeWholeSpace style={{ cursor }} ref={containerElement}>
      <CurrentIntervalRect
        $color={theme.colors.getLabelColor(project.color)}
        ref={intervalElement}
        style={{
          top: startInPx,
          height: intervalDurationInPx,
        }}
      ></CurrentIntervalRect>

      <TimeValue
        style={{
          top: valueInPx,
        }}
        separator={dotSeparator}
        gap={8}
        wrap="wrap"
      >
        <Text>{formatTime(value)}</Text>
        {minDiff > 0 && <Text>{formatDuration(minDiff, 'min')} earlier</Text>}
      </TimeValue>

      {!isActive && (
        <BoundaryInteractiveArea
          top={valueInPx}
          onPointerDown={() => setIsActive(true)}
        />
      )}
    </TakeWholeSpace>
  )
}
