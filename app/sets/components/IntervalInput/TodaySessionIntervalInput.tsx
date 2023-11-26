import { useTodaySets } from 'sets/hooks/useTodaySets'
import { useRhythmicRerender } from '@increaser/ui/hooks/useRhythmicRerender'
import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import styled, { useTheme } from 'styled-components'
import {
  IntervalInput,
  IntervalInputProps,
} from '@increaser/ui/timeline/IntervalInput'

import { IntervalRect } from './IntervalRect'

interface Props
  extends Pick<IntervalInputProps, 'color' | 'value' | 'onChange'> {}

const Session = styled(IntervalRect)`
  width: 100%;
`

export const TodaySessionIntervalInput = (props: Props) => {
  const startOfDay = useStartOfDay()
  const now = useRhythmicRerender(10000)

  const todaySets = useTodaySets()

  const timelineStartsAt = startOfDay
  const timelineEndsAt = now

  const { colors } = useTheme()

  return (
    <IntervalInput
      timelineStartsAt={timelineStartsAt}
      timelineEndsAt={timelineEndsAt}
      color={props.color}
      value={props.value}
      onChange={props.onChange}
      renderContent={({ msToPx }) =>
        todaySets.map(({ start, end }, index) => {
          return (
            <Session
              key={index}
              $color={colors.mistExtra}
              style={{
                top: msToPx(start - timelineStartsAt),
                height: msToPx(end - start),
              }}
            />
          )
        })
      }
    />
  )
}
