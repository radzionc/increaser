import { useYesterdayHabits } from '@increaser/app/habits/hooks/useYesterdayHabits'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { TitledSection } from '@lib/ui/Layout/TitledSection'
import { VStack } from '@lib/ui/layout/Stack'
import { MS_IN_DAY } from '@lib/utils/time'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'
import { CheckDayHabitsTitle } from '@increaser/ui/habits/CheckDayHabitsTitle'
import { HabitItem } from '@increaser/ui/habits/HabitItem'

export const ReviewYesterdayHabits = () => {
  const startOfToday = useStartOfDay()

  const habits = useYesterdayHabits()

  const startOfYesterday = startOfToday - MS_IN_DAY
  const startOfYesterdayDate = new Date(startOfYesterday)

  if (habits.length === 0) return null

  return (
    <TitledSection
      title={
        <CheckDayHabitsTitle
          habits={habits}
          date={startOfYesterdayDate}
          dayName="Yesterday"
        />
      }
    >
      <VStack gap={4}>
        {habits.map((habit) => (
          <HabitItem
            date={toHabitDate(startOfYesterdayDate)}
            habit={habit}
            key={habit.id}
          />
        ))}
      </VStack>
    </TitledSection>
  )
}
