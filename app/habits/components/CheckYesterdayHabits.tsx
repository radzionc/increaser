import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import { ExpandablePanel } from '@increaser/ui/Panel/ExpandablePanel'
import { VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { MS_IN_DAY, MS_IN_SEC } from '@increaser/utils/time'

import { CheckDayHabitsTitle } from './CheckDayHabits/CheckDayHabitsTitle'
import { HabitItem } from './CheckDayHabits/HabitItem'
import { useHabits } from './HabitsProvider'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'

export const CheckYesterdayHabits = () => {
  const { habits: currentHabits } = useHabits()
  const startOfToday = useStartOfDay()
  const habits = currentHabits.filter(
    ({ startedAt }) => startedAt * MS_IN_SEC < startOfToday,
  )

  const startOfYesterday = startOfToday - MS_IN_DAY
  const startOfYesterdayDate = new Date(startOfYesterday)

  if (habits.length === 0) return null

  return (
    <ExpandablePanel
      header={
        <Text as="div" size={18} weight="bold">
          <CheckDayHabitsTitle
            date={startOfYesterdayDate}
            dayName="Yesterday"
            habits={habits}
          />
        </Text>
      }
      renderContent={() => (
        <VStack gap={16}>
          {habits.map((habit) => (
            <HabitItem
              date={toHabitDate(startOfYesterdayDate)}
              habit={habit}
              key={habit.id}
            />
          ))}
        </VStack>
      )}
    />
  )
}
