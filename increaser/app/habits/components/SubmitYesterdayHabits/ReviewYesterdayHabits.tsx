import { useYesterdayHabits } from '@increaser/app/habits/hooks/useYesterdayHabits'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { VStack } from '@lib/ui/layout/Stack'
import { MS_IN_DAY } from '@lib/utils/time'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'
import { HabitItem } from '@increaser/ui/habits/HabitItem'

export const ReviewYesterdayHabits = () => {
  const startOfToday = useStartOfDay()

  const habits = useYesterdayHabits()

  const startOfYesterday = startOfToday - MS_IN_DAY
  const startOfYesterdayDate = new Date(startOfYesterday)

  if (habits.length === 0) return null

  return (
    <VStack gap={4}>
      {habits.map((habit) => (
        <HabitItem
          date={toHabitDate(startOfYesterdayDate)}
          habit={habit}
          key={habit.id}
        />
      ))}
    </VStack>
  )
}
