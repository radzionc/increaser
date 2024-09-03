import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { TitledSection } from '@lib/ui/Layout/TitledSection'
import { VStack } from '@lib/ui/css/stack'
import { MS_IN_DAY, MS_IN_SEC } from '@lib/utils/time'

import { CurrentHabitProvider } from './CurrentHabitProvider'
import { CheckDayHabitsTitle } from './CheckDayHabitsTitle'
import { HabitItem } from './HabitItem'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'
import { ReactNode } from 'react'
import { useHabits } from './HabitsContext'

const dayName = 'Today'

interface CheckTodayHabitsProps {
  education?: ReactNode
}

export const CheckTodayHabits = ({ education }: CheckTodayHabitsProps) => {
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
      {education}
      <VStack gap={4}>
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
