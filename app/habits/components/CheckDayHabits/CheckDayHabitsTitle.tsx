import { Habit } from 'habits/Habit'
import { toHabitDate } from 'habits/utils/toHabitDate'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

interface Props {
  date: Date
  dayName: string
  habits: Habit[]
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
