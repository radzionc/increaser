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
import { setEditorConfig } from '@increaser/ui/sets/manager/editor/config'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useCurrentInterval } from '@lib/ui/state/currentInterval'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { useProject } from '@increaser/ui/projects/hooks/useProject'
import { useLastSet } from '@increaser/app/sets/hooks/useLastSet'
import { useSetEndTime } from './state/setEndTime'
import { useLastSetEnd } from '@increaser/app/sets/hooks/useLastSetEnd'
import { useEvent } from '@lib/ui/hooks/useEvent'
import { useBoolean } from '@lib/ui/hooks/useBoolean'

const TimeValue = styled(HStackSeparatedBy)`
  position: absolute;
  font-size: 14px;
  font-weight: 500;
  color: ${getColor('contrast')};
`

export const AutoStoppedSetEndTimeEditor = () => {
  const [isActive, { set: activate, unset: deactivate }] = useBoolean(false)

  const [value, setValue] = useSetEndTime()

  const { projectId, start: min } = shouldBePresent(useLastSet())

  const interval = useCurrentInterval()

  useEvent(window, 'pointerup', deactivate)
  useEvent(window, 'pointercancel', deactivate)

  const containerElement = useRef<HTMLDivElement | null>(null)
  const intervalElement = useRef<HTMLDivElement | null>(null)

  const now = useRhythmicRerender(convertDuration(10, 's', 'ms'))

  const prevValue = shouldBePresent(useLastSetEnd())

  useEvent(
    window,
    'pointermove',
    useCallback(
      ({ clientY }) => {
        if (!isActive) return

        const containerRect = containerElement?.current?.getBoundingClientRect()
        if (!containerRect) return

        const timestamp =
          interval.start + setEditorConfig.pxToMs(clientY - containerRect.top)

        const endedAt = enforceRange(timestamp, min, now)

        setValue(endedAt)
      },
      [interval.start, isActive, min, now, setValue],
    ),
  )

  const cursor = isActive ? 'row-resize' : undefined

  const valueDuration = getIntervalDuration({ start: min, end: value })
  const valueInPx = setEditorConfig.msToPx(value - interval.start)
  const startInPx = setEditorConfig.msToPx(min - interval.start)
  const intervalDurationInPx = setEditorConfig.msToPx(valueDuration)

  const theme = useTheme()

  const diff = Math.round(convertDuration(prevValue - value, 'ms', 'min'))

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
        {diff >= 1 ? (
          <Text>{formatDuration(diff, 'min')} earlier</Text>
        ) : diff <= -1 ? (
          <Text>{formatDuration(-diff, 'min')} later</Text>
        ) : null}
      </TimeValue>

      {!isActive && (
        <BoundaryInteractiveArea top={valueInPx} onPointerDown={activate} />
      )}
    </TakeWholeSpace>
  )
}
