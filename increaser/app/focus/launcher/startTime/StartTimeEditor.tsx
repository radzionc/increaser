import { TakeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { useEffect, useRef, useState } from 'react'
import { useEvent } from 'react-use'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { enforceRange } from '@lib/utils/enforceRange'
import { CurrentIntervalRect } from '@lib/ui/timeline/CurrentIntervalRect'
import { useStartTimeEditor } from './StartTimeEditorProvider'
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
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useTodaySets } from '../../../sets/hooks/useTodaySets'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { setEditorConfig } from '@increaser/ui/sets/manager/editor/config'
import { useFocusLauncher } from '../state/useFocusLauncher'

const TimeValue = styled(HStackSeparatedBy)`
  position: absolute;
  font-size: 14px;
  font-weight: 500;
  color: ${getColor('contrast')};
`

export const StartTimeEditor = () => {
  const { projects } = useAssertUserState()
  const [isActive, setIsActive] = useState(false)

  const todaySets = useTodaySets()

  const [{ startedAt, projectId }, setState] = useFocusLauncher()
  const value = shouldBePresent(startedAt)

  const { interval, now } = useStartTimeEditor()

  useEvent('pointerup', () => setIsActive(false))
  useEvent('pointercancel', () => setIsActive(false))

  const containerElement = useRef<HTMLDivElement | null>(null)
  const intervalElement = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    intervalElement.current?.scrollIntoView({
      block: 'nearest',
      inline: 'start',
    })
  }, [startedAt])

  useEvent('pointermove', ({ clientY }) => {
    if (!isActive) return

    const containerRect = containerElement?.current?.getBoundingClientRect()
    if (!containerRect) return

    const timestamp =
      interval.start + setEditorConfig.pxToMs(clientY - containerRect.top)

    const min = Math.max(getLastItem(todaySets)?.end ?? 0, interval.start)

    const startedAt = enforceRange(timestamp, min, now)

    setState((state) => ({
      ...state,
      startedAt,
    }))
  })

  const cursor = isActive ? 'row-resize' : undefined

  const valueDuration = getIntervalDuration({ start: value, end: now })
  const valueInPx = setEditorConfig.msToPx(value - interval.start)
  const intervalDurationInPx = setEditorConfig.msToPx(valueDuration)

  const theme = useTheme()

  const minDiff = Math.round(convertDuration(now - value, 'ms', 'min'))

  return (
    <TakeWholeSpace style={{ cursor }} ref={containerElement}>
      <CurrentIntervalRect
        $color={theme.colors.getLabelColor(projects[projectId].color)}
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
