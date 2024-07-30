import styled, { useTheme } from 'styled-components'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { getColor } from '@lib/ui/theme/getters'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { useMemo } from 'react'
import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import { focusIntervalsToSets } from '@increaser/ui/focus/utils/focusIntervalsToSets'
import { toPercents } from '@lib/utils/toPercents'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

const Container = styled.div`
  ${takeWholeSpace};
  position: relative;
`

export const Filler = styled.div`
  height: 100%;
  background: ${getColor('primary')};
`

const Segment = styled.div`
  position: absolute;
  height: 100%;
`

export const SessionIntervals = () => {
  const { focusDuration } = useFocus()
  const { intervals } = useCurrentFocus()

  const { start } = intervals[0]

  const { projects } = useAssertUserState()
  const {
    colors: { getLabelColor },
  } = useTheme()

  const now = useRhythmicRerender()

  const end = useMemo(() => {
    const focusedDuration = getSetsDuration(
      focusIntervalsToSets({
        intervals,
        now,
      }),
    )

    const targetDuration = convertDuration(focusDuration, 'min', 'ms')

    if (focusedDuration > targetDuration) {
      return now
    }

    const remainingDuration = targetDuration - focusDuration

    return now + remainingDuration
  }, [focusDuration, intervals, now])

  const totalDuration = end - start

  return (
    <Container>
      {intervals.map((interval) => {
        const left = toPercents((interval.start - start) / totalDuration)
        const width = toPercents(
          ((interval.end ?? now) - interval.start) / totalDuration,
        )

        return (
          <Segment
            style={{
              left,
              width,
              background: getLabelColor(
                projects[interval.projectId].color,
              ).toCssValue(),
            }}
            key={interval.start}
          />
        )
      })}
    </Container>
  )
}
