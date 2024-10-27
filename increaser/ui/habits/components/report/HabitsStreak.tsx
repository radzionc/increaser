import { Text } from '@lib/ui/text'
import { pluralize } from '@lib/utils/pluralize'
import { getHabitStreak } from '@increaser/entities-utils/habit/getHabitStreak'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { VStack } from '@lib/ui/css/stack'
import { HabitColumnLabel } from './HabitColumnLabel'
import { TrackHabitsColumn } from '../track/TrackHabitsColumn'
import { useOrderedActiveHabits } from '../../hooks/useOrderedActiveHabits'

export const HabitsStreak = () => {
  const habits = useOrderedActiveHabits()
  const todayStartedAt = useStartOfDay()

  return (
    <VStack alignItems="center">
      <HabitColumnLabel>Streak</HabitColumnLabel>
      <TrackHabitsColumn>
        {habits.map((habit) => {
          const { id } = habit
          const streak = getHabitStreak({ habit, at: todayStartedAt })
          const result = streak ? pluralize(streak, 'day') : '-'

          return (
            <Text weight={600} size={13} nowrap key={id}>
              {result}
            </Text>
          )
        })}
      </TrackHabitsColumn>
    </VStack>
  )
}
