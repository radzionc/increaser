import { Point } from '@lib/ui/entities/Point'
import {
  offset,
  shift,
  flip,
  useFloating,
  autoUpdate,
} from '@floating-ui/react'
import styled, { useTheme } from 'styled-components'
import { Fragment, useEffect, useMemo } from 'react'
import { getColor } from '@lib/ui/theme/getters'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { focusIntervalsToSets } from '@increaser/ui/focus/utils/focusIntervalsToSets'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { Text } from '@lib/ui/text'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { Interval } from '@lib/utils/interval/Interval'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { vStack } from '@lib/ui/css/stack'
import { Circle } from '@lib/ui/layout/Circle'
import { useIsFocusPaused } from '@increaser/ui/focus/utils/useIsFocusPaused'

const Container = styled.div`
  border: 1px solid ${getColor('textShy')};
  background: ${getColor('foreground')};
  ${borderRadius.s};
  overflow: hidden;

  padding: 20px 16px;

  ${vStack({
    gap: 12,
  })}
`

type DataPointInfoProps = {
  position: Point
}

const Reference = styled.div`
  position: fixed;
  pointer-events: none;
`

const Row = styled.div`
  display: grid;
  gap: 8px;
  align-items: center;
  min-width: 200px;
  grid-template-columns: auto 1fr minmax(80px, auto);

  > * {
    &:last-child {
      text-align: right;
    }
  }
`

const formatIntervalDuration = (interval: Interval) =>
  formatDuration(getIntervalDuration(interval), 'ms', {
    minUnit: 's',
    maxUnit: 'h',
  })

export const FocusTimeBreakdown = ({ position }: DataPointInfoProps) => {
  const { intervals } = useFocus()
  const { projects } = useAssertUserState()

  const { colors } = useTheme()

  const isPaused = useIsFocusPaused()

  const now = useRhythmicRerender()
  const sets = useMemo(
    () =>
      shouldBePresent(
        focusIntervalsToSets({ intervals: shouldBePresent(intervals), now }),
      ),
    [intervals, now],
  )

  const {
    refs: { setReference, setFloating },
    floatingStyles,
    update,
  } = useFloating({
    open: true,
    placement: 'bottom',
    strategy: 'fixed',
    middleware: [offset(20), flip(), shift()],
    whileElementsMounted: autoUpdate,
  })

  useEffect(() => {
    update()
  }, [position, update])

  return (
    <>
      <Reference
        ref={setReference}
        style={{
          left: position.x,
          top: position.y,
        }}
      />
      <Container ref={setFloating} style={{ ...floatingStyles, zIndex: 1 }}>
        {sets.map((set, index) => {
          const nextSet = sets[index + 1]

          const { name, color } = projects[set.projectId]

          const setNode = (
            <Row key={`set-${index}`}>
              <Circle size={6} background={colors.getLabelColor(color)} />
              <Text color="contrast">{name}</Text>
              <Text color="contrast">{formatIntervalDuration(set)}</Text>
            </Row>
          )

          const hasBreak = nextSet ? nextSet.start !== set.end : isPaused

          if (!hasBreak) {
            return setNode
          }

          const breakInterval = {
            start: set.end,
            end: nextSet?.start || now,
          }

          const breakNode = (
            <Row key={`break-${index}`}>
              <Circle size={6} background={colors.mistExtra} />
              <Text color="shy">Break</Text>
              <Text color="supporting">
                {formatIntervalDuration(breakInterval)}
              </Text>
            </Row>
          )

          return (
            <Fragment key={index}>
              {setNode}
              {breakNode}
            </Fragment>
          )
        })}
      </Container>
    </>
  )
}
