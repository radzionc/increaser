import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'
import { EnhancedHabit } from './EnhancedHabit'

interface Props {
  date: Date
  dayName: string
  habits: EnhancedHabit[]
}

export const CheckDayHabitsTitle = ({ date, dayName, habits }: Props) => {
  const habitDate = toHabitDate(date)

  const habitsDone = habits.filter((habit) =>
    habit.successes.includes(habitDate),
  )

  return (
    <HStack gap={8}>
      <Text color="regular">{dayName} habits</Text>
      {habits.length > 0 && (
        <Text color="supporting" as="span">
          {habitsDone.length} / {habits.length}
        </Text>
      )}
    </HStack>
  )
}
