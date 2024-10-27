import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { useCallback, useRef, useState } from 'react'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { enforceRange } from '@lib/utils/enforceRange'
import { CurrentIntervalRect } from '@lib/ui/timeline/CurrentIntervalRect'
import styled, { useTheme } from 'styled-components'
import { BoundaryInteractiveArea } from '@lib/ui/timeline/BoundaryInteractiveArea'
import { Text } from '@lib/ui/text'
import { formatTime } from '@lib/utils/time/formatTime'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { getColor } from '@lib/ui/theme/getters'
import { setEditorConfig } from '@increaser/ui/sets/manager/editor/config'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useCurrentInterval } from '@lib/ui/state/currentInterval'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { useProject } from '@increaser/ui/projects/hooks/useProject'
import { useBoolean } from '@lib/ui/hooks/useBoolean'
import { WindowPointerMoveListener } from '@lib/ui/base/WindowPointerMoveListener'
import { hStack, vStack } from '@lib/ui/css/stack'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { isToday } from 'date-fns'
import { relativeDayFormat } from '@lib/utils/time/relativeDayFormat'
import { useBoundingBox } from '@lib/ui/hooks/useBoundingBox'
import { InputProps } from '@lib/ui/props'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { centerContent } from '@lib/ui/css/centerContent'

const InfoContainer = styled.div`
  position: fixed;
  ${borderRadius.s};
  height: 28px;
  background: ${getColor('foreground')};
  overflow: hidden;

  ${hStack({ gap: 1, alignItems: 'center' })};

  > * {
    ${horizontalPadding(8)};
    ${centerContent};
    height: 100%;
    background: ${getColor('foregroundExtra')};
  }
`

const Container = styled.div`
  ${takeWholeSpace};
  ${vStack({
    alignItems: 'center',
  })}
`

type FocusEndTimeEditorProps = InputProps<number> & {
  projectId: string
  start: number
}

export const FocusEndTimeEditor = ({
  value,
  onChange,
  projectId,
  start,
}: FocusEndTimeEditorProps) => {
  const [isActive, { set: activate, unset: deactivate }] = useBoolean(false)

  const interval = useCurrentInterval()

  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const intervalElement = useRef<HTMLDivElement | null>(null)
  const containerBox = useBoundingBox(container)

  const now = useRhythmicRerender(convertDuration(10, 's', 'ms'))

  const onMove = useCallback(
    ({ clientY }: PointerEvent) => {
      if (!isActive || !containerBox) return

      const timestamp =
        interval.start + setEditorConfig.pxToMs(clientY - containerBox.top)

      const endedAt = enforceRange(timestamp, start, now)

      onChange(endedAt)
    },
    [containerBox, interval.start, isActive, start, now, onChange],
  )

  const cursor = isActive ? 'row-resize' : undefined

  const valueDuration = getIntervalDuration({ start, end: value })
  const valueInPx = setEditorConfig.msToPx(value - interval.start)
  const startInPx = setEditorConfig.msToPx(start - interval.start)
  const intervalDurationInPx = setEditorConfig.msToPx(valueDuration)

  const theme = useTheme()

  const project = shouldBePresent(useProject(projectId))

  return (
    <Container style={{ cursor }} ref={setContainer}>
      <WindowPointerMoveListener onMove={onMove} onStop={deactivate} />
      <CurrentIntervalRect
        $color={theme.colors.getLabelColor(project.color)}
        ref={intervalElement}
        style={{
          top: startInPx,
          height: intervalDurationInPx,
        }}
      ></CurrentIntervalRect>

      <BoundaryInteractiveArea
        isActive={isActive}
        top={valueInPx}
        onPointerDown={activate}
      />

      {containerBox && (
        <InfoContainer
          style={{
            top: containerBox.top + valueInPx + 16,
          }}
        >
          {isToday(new Date(interval.start)) ? null : (
            <Text>{relativeDayFormat(interval.start, 'd MMM')}</Text>
          )}
          <Text>
            {formatTime(interval.start)} - {formatTime(value)}
          </Text>
          <Text>{formatDuration(valueDuration, 'ms', { maxUnit: 'h' })}</Text>
        </InfoContainer>
      )}
    </Container>
  )
}
