import { ComponentWithValueProps } from '@lib/ui/props'
import { HabitDay, useTrackHabits } from './state/TrackHabitsContext'
import { VStack } from '@lib/ui/css/stack'
import { Spacer } from '@lib/ui/layout/Spacer'
import { trackHabitsConfig } from './config'
import { TrackHabitsColumn } from './TrackHabitsColumn'
import { CheckHabit } from './CheckHabit'
import styled from 'styled-components'
import { centerContent } from '@lib/ui/css/centerContent'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { CenterAbsolutely } from '@lib/ui/layout/CenterAbsolutely'
import { useOrderedActiveHabits } from '@increaser/ui/habits/hooks/useOrderedActiveHabits'
import { HabitColumnLabel } from '../report/HabitColumnLabel'
import { relativeDayFormat } from '@lib/utils/time/relativeDayFormat'

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
}: ComponentWithValueProps<HabitDay>) => {
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
