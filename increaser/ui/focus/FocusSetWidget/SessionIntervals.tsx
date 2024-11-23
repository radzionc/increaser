import styled, { useTheme } from 'styled-components'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { useMemo } from 'react'
import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import { focusIntervalsToSets } from '@increaser/ui/focus/utils/focusIntervalsToSets'
import { toPercents } from '@lib/utils/toPercents'
import { useUser } from '@increaser/ui/user/state/user'
import { useFocusDuration } from '../state/focusDuration'
import { useAssertFocusIntervals } from '../state/focusIntervals'

const Container = styled.div`
  ${takeWholeSpace};
  position: relative;
`

const Segment = styled.div`
  position: absolute;
  height: 100%;
`

export const SessionIntervals = () => {
  const [focusDuration] = useFocusDuration()

  const intervals = useAssertFocusIntervals()

  const { start } = intervals[0]

  const { projects } = useUser()
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

    const remainingDuration = targetDuration - focusedDuration

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
