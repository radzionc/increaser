import {
  ComponentWithActiveState,
  ComponentWithValueProps,
} from '@lib/ui/props'
import { HabitDay } from './state/TrackHabitsContext'
import { VStack } from '@lib/ui/layout/Stack'
import { Spacer } from '@lib/ui/layout/Spacer'
import { trackHabitsConfig } from './config'
import { TrackHabitsColumn } from './TrackHabitsColumn'
import { useOrderedHabits } from '@increaser/ui/habits/hooks/useOrderedHabits'
import { CheckHabit } from './CheckHabit'
import styled, { css } from 'styled-components'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { getColor } from '@lib/ui/theme/getters'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { Text } from '@lib/ui/text'
import { horizontalMargin } from '@lib/ui/css/horizontalMargin'

const Container = styled(VStack)`
  align-items: center;
`

const Outline = styled.div`
  ${absoluteOutline(4, 4)};
  border: 2px dashed ${getColor('contrast')};
  border-radius: 4px;
`

const Content = styled(TrackHabitsColumn)<ComponentWithActiveState>`
  ${({ isActive }) =>
    isActive &&
    css`
      ${horizontalMargin(4)}
    `}
`

export const HabitsColumn = ({
  value: { startedAt, completion },
}: ComponentWithValueProps<HabitDay>) => {
  const habits = useOrderedHabits()
  const todayStartedAt = useStartOfDay()
  const isToday = startedAt === todayStartedAt

  return (
    <Container>
      <Spacer height={trackHabitsConfig.labelHeight}>
        {isToday && (
          <Text size={12} weight="semibold" color="contrast">
            Today
          </Text>
        )}
      </Spacer>
      <Content isActive={isToday}>
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
        {isToday && <Outline />}
      </Content>
    </Container>
  )
}
