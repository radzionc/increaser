import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { ExpandablePanel } from '@lib/ui/Panel/ExpandablePanel'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { MS_IN_DAY, MS_IN_SEC } from '@lib/utils/time'

import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'
import { useHabits } from '@increaser/ui/habits/HabitsContext'
import { CheckDayHabitsTitle } from '@increaser/ui/habits/CheckDayHabitsTitle'
import { HabitItem } from '@increaser/ui/habits/HabitItem'

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
