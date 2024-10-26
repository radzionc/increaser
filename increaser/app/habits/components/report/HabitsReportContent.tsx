import { HStack } from '@lib/ui/css/stack'
import { HabitsTableContainer } from '../track/HabitsTableContainer'
import { HabitsReportColumn } from './HabitsReportColumn'
import { getHabitTrackingDays } from '@increaser/entities-utils/habit/getHabitTrackingDays'
import { Text } from '@lib/ui/text'
import { pluralize } from '@lib/utils/pluralize'
import { getHabitPassedDays } from '@increaser/entities-utils/habit/getHabitPassedDays'
import { toPercents } from '@lib/utils/toPercents'
import { useHabits } from '@increaser/ui/habits/hooks/useHabits'
import { getHabitStreak } from '@increaser/entities-utils/habit/getHabitStreak'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'

export const HabitsReportContent = () => {
  const habits = useHabits()
  const todayStartedAt = useStartOfDay()

  return (
    <HabitsTableContainer>
      <HStack gap={40}>
        <HabitsReportColumn title="Streak">
          {habits.map((habit) => {
            const { id } = habit
            const streak = getHabitStreak({ habit, at: todayStartedAt })
            const result = streak ? pluralize(streak, 'day') : '-'
            return <Text key={id}>{result}</Text>
          })}
        </HabitsReportColumn>
        <HabitsReportColumn title="Consistency">
          {habits.map(({ id, successes, startedAt }) => {
            const passedDays = getHabitPassedDays({ successes, startedAt })
            const result = passedDays
              ? toPercents(successes.length / passedDays, 'round')
              : '-'
            return <Text key={id}>{result}</Text>
          })}
        </HabitsReportColumn>
        <HabitsReportColumn title="Started">
          {habits.map((habit) => {
            const days = getHabitTrackingDays(habit)
            const result =
              days === 1 ? 'Today' : `${pluralize(days, 'day')} ago`
            return <Text key={habit.id}>{result}</Text>
          })}
        </HabitsReportColumn>
      </HStack>
    </HabitsTableContainer>
  )
}
