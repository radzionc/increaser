import styled from 'styled-components'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { ChecklistItem } from '@lib/ui/checklist/CheckListItem'
import { EnhancedHabit } from './EnhancedHabit'
import { useHabits } from './HabitsContext'

interface Props {
  habit: EnhancedHabit
  date: string
  showStreak?: boolean
}

interface Props {
  warning?: string
}

const StreakWrapper = styled.div`
  border-radius: 4px;
  padding: 4px 8px;
  background: ${({ theme }) => theme.colors.foreground.toCssValue()};
`

export const HabitItem = ({ habit, date, warning, showStreak }: Props) => {
  const { trackHabit } = useHabits()

  const isDone = habit.successes.includes(date)

  const shouldShowStreak = showStreak && habit.streak > 0

  return (
    <ChecklistItem
      hasCongratulation
      style={{ width: '100%' }}
      onChange={() => {
        const value = !isDone
        trackHabit({ id: habit.id, value, date })
      }}
      value={isDone}
      name={
        <HStack alignItems="center" gap={8}>
          <Text>{habit.emoji}</Text>
          {habit.name}
          {warning ? (
            <StreakWrapper>
              <Text color="alert" size={14}>
                {warning}
              </Text>
            </StreakWrapper>
          ) : shouldShowStreak ? (
            <StreakWrapper>
              <HStack alignItems="center" gap={4}>
                <Text color="supporting" size={14}>
                  streak
                </Text>
                <Text weight="600" size={14} color="success">
                  {habit.streak}
                </Text>
              </HStack>
            </StreakWrapper>
          ) : null}
        </HStack>
      }
    />
  )
}
