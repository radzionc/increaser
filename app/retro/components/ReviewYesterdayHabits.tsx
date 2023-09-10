import { CheckDayHabitsTitle } from 'habits/components/CheckDayHabits/CheckDayHabitsTitle'
import { HabitItem } from 'habits/components/CheckDayHabits/HabitItem'
import { useYesterdayHabits } from 'habits/hooks/useYesterdayHabits'
import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import { TitledSection } from '@increaser/ui/ui/Layout/TitledSection'
import { VStack } from '@increaser/ui/ui/Stack'
import { MS_IN_DAY } from '@increaser/utils/time'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'

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
      <VStack gap={16}>
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
