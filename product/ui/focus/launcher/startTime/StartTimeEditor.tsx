import { WindowPointerMoveListener } from '@lib/ui/base/WindowPointerMoveListener'
import { TakeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { useBoolean } from '@lib/ui/hooks/useBoolean'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import {
  HStackSeparatedBy,
  dotSeparator,
} from '@lib/ui/layout/StackSeparatedBy'
import { useCurrentInterval } from '@lib/ui/state/currentInterval'
import { usePresentState } from '@lib/ui/state/usePresentState'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { BoundaryInteractiveArea } from '@lib/ui/timeline/BoundaryInteractiveArea'
import { CurrentIntervalRect } from '@lib/ui/timeline/CurrentIntervalRect'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { enforceRange } from '@lib/utils/enforceRange'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { formatTime } from '@lib/utils/time/formatTime'
import { useTodaySets } from '@product/app/sets/hooks/useTodaySets'
import { useFocusTargetProject } from '@product/ui/focus/hooks/useFocusTargetProject'
import { setEditorConfig } from '@product/ui/sets/manager/editor/config'
import { useCallback, useEffect, useRef } from 'react'
import styled, { useTheme } from 'styled-components'

import { useFocusTargetStartTime } from '../state/FocusLauncherStartTimeProvider'

const TimeValue = styled(HStackSeparatedBy)`
  position: absolute;
  font-size: 14px;
  font-weight: 500;
  color: ${getColor('contrast')};
`

export const StartTimeEditor = () => {
  const [isActive, { set: activate, unset: deactivate }] = useBoolean(false)

  const todaySets = useTodaySets()

  const [value, setValue] = usePresentState(useFocusTargetStartTime())

  const interval = useCurrentInterval()

  const containerElement = useRef<HTMLDivElement | null>(null)
  const intervalElement = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    intervalElement.current?.scrollIntoView({
      block: 'nearest',
      inline: 'start',
    })
  }, [value])

  const now = useRhythmicRerender(convertDuration(10, 's', 'ms'))

  const onMove = useCallback(
    ({ clientY }: PointerEvent) => {
      if (!isActive) return

      const containerRect = containerElement?.current?.getBoundingClientRect()
      if (!containerRect) return

      const timestamp =
        interval.start + setEditorConfig.pxToMs(clientY - containerRect.top)

      const min = Math.max(getLastItem(todaySets)?.end ?? 0, interval.start)

      const startedAt = enforceRange(timestamp, min, now)

      setValue(startedAt)
    },
    [interval.start, isActive, now, setValue, todaySets],
  )

  const cursor = isActive ? 'row-resize' : undefined

  const valueDuration = getIntervalDuration({ start: value, end: now })
  const valueInPx = setEditorConfig.msToPx(value - interval.start)
  const intervalDurationInPx = setEditorConfig.msToPx(valueDuration)

  const theme = useTheme()

  const minDiff = Math.round(convertDuration(now - value, 'ms', 'min'))

  const project = shouldBePresent(useFocusTargetProject())

  return (
    <TakeWholeSpace style={{ cursor }} ref={containerElement}>
      <WindowPointerMoveListener onMove={onMove} onStop={deactivate} />
      <CurrentIntervalRect
        $color={theme.colors.getLabelColor(project.color)}
        ref={intervalElement}
        style={{
          top: valueInPx,
          height: intervalDurationInPx,
        }}
      ></CurrentIntervalRect>

      <TimeValue
        style={{
          top: valueInPx - 20,
        }}
        separator={dotSeparator}
        gap={8}
        wrap="wrap"
      >
        <Text>{formatTime(value)}</Text>
        {minDiff > 0 && <Text>{formatDuration(minDiff, 'min')} earlier</Text>}
      </TimeValue>

      <BoundaryInteractiveArea
        isActive={isActive}
        top={valueInPx}
        onPointerDown={activate}
      />
    </TakeWholeSpace>
  )
}
