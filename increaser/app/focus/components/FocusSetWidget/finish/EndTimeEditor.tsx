import { TakeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { useCallback, useRef } from 'react'
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
import { useBoolean } from '@lib/ui/hooks/useBoolean'
import { WindowPointerMoveListener } from '@lib/ui/base/WindowPointerMoveListener'

const TimeValue = styled(HStackSeparatedBy)`
  position: absolute;
  font-size: 14px;
  font-weight: 500;
  color: ${getColor('contrast')};
`

export const EndTimeEditor = () => {
  const [isActive, { set: activate, unset: deactivate }] = useBoolean(false)

  const [value, setValue] = useCurrentFocusEndTime()

  const intervals = useAssertFocusIntervals()

  const { projectId, start: min } = getLastItem(intervals)

  const interval = useCurrentInterval()

  const containerElement = useRef<HTMLDivElement | null>(null)
  const intervalElement = useRef<HTMLDivElement | null>(null)

  const now = useRhythmicRerender(convertDuration(10, 's', 'ms'))

  const onMove = useCallback(
    ({ clientY }: PointerEvent) => {
      if (!isActive) return

      const containerRect = containerElement?.current?.getBoundingClientRect()
      if (!containerRect) return

      const timestamp =
        interval.start + setEditorConfig.pxToMs(clientY - containerRect.top)

      const endedAt = enforceRange(timestamp, min, now)

      setValue(endedAt)
    },
    [interval.start, isActive, min, now, setValue],
  )

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
      <WindowPointerMoveListener onMove={onMove} onStop={deactivate} />
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
        <BoundaryInteractiveArea top={valueInPx} onPointerDown={activate} />
      )}
    </TakeWholeSpace>
  )
}
