import { toHabitDate } from 'habits/utils/toHabitDate'
import { useStartOfDay } from 'shared/hooks/useStartOfDay'
import { TitledSection } from '@increaser/ui/ui/Layout/TitledSection'
import { VStack } from '@increaser/ui/ui/Stack'
import { MS_IN_DAY, MS_IN_SEC } from 'utils/time'

import { CurrentHabitProvider } from '../CurrentHabitProvider'
import { useHabits } from '../HabitsProvider'
import { CheckDayHabitsTitle } from './CheckDayHabitsTitle'
import { HabitItem } from './HabitItem'
import { TwoDayRuleEducation } from './TwoDayRuleEducation'

const dayName = 'Today'

export const CheckTodayHabits = () => {
  const startOfToday = useStartOfDay()

  const date = new Date(startOfToday)
  const { habits } = useHabits()
  const habitDate = toHabitDate(date)

  const existedHabits = habits.filter(
    ({ startedAt }) => startedAt * MS_IN_SEC - MS_IN_DAY < date.getTime(),
  )

  if (existedHabits.length === 0) return null

  return (
    <TitledSection
      title={
        <CheckDayHabitsTitle habits={habits} date={date} dayName={dayName} />
      }
    >
      <TwoDayRuleEducation />
      <VStack gap={16}>
        {existedHabits.map((habit) => (
          <CurrentHabitProvider key={habit.id} value={habit}>
            <HabitItem
              showStreak
              warning={
                habit.passedDays.length > 0 && habit.streak === 0
                  ? 'skipped yesterday'
                  : undefined
              }
              date={habitDate}
              habit={habit}
            />
          </CurrentHabitProvider>
        ))}
      </VStack>
    </TitledSection>
  )
}
