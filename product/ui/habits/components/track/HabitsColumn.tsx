import { centerContent } from '@lib/ui/css/centerContent'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { CenterAbsolutely } from '@lib/ui/layout/CenterAbsolutely'
import { Spacer } from '@lib/ui/layout/Spacer'
import { ValueProp } from '@lib/ui/props'
import { relativeDayFormat } from '@lib/utils/time/relativeDayFormat'
import { useOrderedActiveHabits } from '@product/ui/habits/hooks/useOrderedActiveHabits'
import styled from 'styled-components'

import { HabitColumnLabel } from '../report/HabitColumnLabel'

import { CheckHabit } from './CheckHabit'
import { trackHabitsConfig } from './config'
import { HabitDay, useTrackHabits } from './state/TrackHabitsContext'
import { TrackHabitsColumn } from './TrackHabitsColumn'

const Container = styled(VStack)`
  align-items: center;
  ${horizontalPadding(trackHabitsConfig.itemGap / 2)}
`

const Label = styled.div`
  height: ${toSizeUnit(trackHabitsConfig.labelHeight)};
  ${centerContent};
  position: relative;
`

export const HabitsColumn = ({
  value: { startedAt, completion },
}: ValueProp<HabitDay>) => {
  const habits = useOrderedActiveHabits()
  const { activeDayStartedAt, setActiveDayStartedAt, days } = useTrackHabits()
  const isActive = activeDayStartedAt === startedAt
  const defaultACtiveDayStartedAt = days[0].startedAt

  return (
    <Container
      onMouseEnter={() => {
        setActiveDayStartedAt(startedAt)
      }}
      onMouseLeave={() => {
        setActiveDayStartedAt(defaultACtiveDayStartedAt)
      }}
    >
      <Label>
        {isActive && (
          <CenterAbsolutely>
            <HabitColumnLabel>{relativeDayFormat(startedAt)}</HabitColumnLabel>
          </CenterAbsolutely>
        )}
      </Label>
      <TrackHabitsColumn>
        {habits.map((habit) => {
          const { id } = habit
          const isCompleted = completion[id]
          if (isCompleted === null) {
            return <Spacer key={id} height={trackHabitsConfig.itemHeight} />
          }

          return (
            <CheckHabit
              key={id}
              habit={habit}
              isCompleted={isCompleted}
              dayStartedAt={startedAt}
            />
          )
        })}
      </TrackHabitsColumn>
    </Container>
  )
}
