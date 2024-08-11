import { ComponentWithValueProps } from '@lib/ui/props'
import { HabitDay, useTrackHabits } from './state/TrackHabitsContext'
import { VStack } from '@lib/ui/layout/Stack'
import { Spacer } from '@lib/ui/layout/Spacer'
import { trackHabitsConfig } from './config'
import { TrackHabitsColumn } from './TrackHabitsColumn'
import { useOrderedHabits } from '@increaser/ui/habits/hooks/useOrderedHabits'
import { CheckHabit } from './CheckHabit'
import styled from 'styled-components'
import { Text } from '@lib/ui/text'
import { centerContent } from '@lib/ui/css/centerContent'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { format } from 'date-fns'
import { CenterAbsolutely } from '@lib/ui/layout/CenterAbsolutely'

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
  const habits = useOrderedHabits()
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
            <Text nowrap size={12} weight="500" color="contrast">
              {defaultACtiveDayStartedAt === startedAt
                ? 'Today'
                : format(startedAt, 'MMM d')}
            </Text>
          </CenterAbsolutely>
        )}
      </Label>
      <TrackHabitsColumn>
        {habits.map(({ id, color }) => {
          const isCompleted = completion[id]
          if (isCompleted === null) {
            return <Spacer height={trackHabitsConfig.itemHeight} />
          }

          return (
            <CheckHabit
              key={id}
              habit={{ id, color }}
              isCompleted={isCompleted}
              dayStartedAt={startedAt}
            />
          )
        })}
      </TrackHabitsColumn>
    </Container>
  )
}
