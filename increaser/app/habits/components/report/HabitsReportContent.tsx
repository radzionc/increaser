import { HStack } from '@lib/ui/css/stack'
import { HabitsTableContainer } from '../track/HabitsTableContainer'
import { HabitsReportColumn } from './HabitsReportColumn'
import { getHabitTrackingDays } from '@increaser/entities-utils/habit/getHabitTrackingDays'
import { Text } from '@lib/ui/text'
import { pluralize } from '@lib/utils/pluralize'
import { useHabits } from '@increaser/ui/habits/HabitsContext'
import { getHabitPassedDays } from '@increaser/entities-utils/habit/getHabitPassedDays'
import { toPercents } from '@lib/utils/toPercents'

export const HabitsReportContent = () => {
  const { habits } = useHabits()

  return (
    <HabitsTableContainer>
      <HStack gap={40}>
        <HabitsReportColumn title="Streak">
          {habits.map(({ streak, id }) => {
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
