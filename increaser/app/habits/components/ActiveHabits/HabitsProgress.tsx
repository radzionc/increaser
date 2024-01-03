import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { range } from '@lib/utils/array/range'
import styled, { useTheme } from 'styled-components'
import { transition } from '@lib/ui/css/transition'
import { UniformColumnGrid } from '@lib/ui/Layout/UniformColumnGrid'
import { VStack } from '@lib/ui/layout/Stack'
import { MS_IN_DAY, MS_IN_SEC } from '@lib/utils/time'

import { habitDaysToShow } from './config'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'
import { useHabits } from '@increaser/ui/habits/HabitsContext'

const HabitStatus = styled.div`
  width: 100%;
  border-radius: 2px;
  aspect-ratio: 1 / 1;
  ${transition}
`

export const HabitsProgress = () => {
  const { habits } = useHabits()
  const startOfDay = useStartOfDay()

  const { colors } = useTheme()

  return (
    <UniformColumnGrid gap={2}>
      {range(habitDaysToShow).map((index) => {
        const dayTimestamp = startOfDay - index * MS_IN_DAY
        const habitDate = toHabitDate(new Date(dayTimestamp))

        return (
          <VStack justifyContent="end" fullHeight key={index} gap={2}>
            {habits.map((habit, habitIndex) => {
              const isSuccess = new Set(habit.successes).has(habitDate)
              const hasExisted =
                habit.startedAt * MS_IN_SEC - MS_IN_DAY <= dayTimestamp
              return (
                <HabitStatus
                  key={habitIndex}
                  style={{
                    background: hasExisted
                      ? (isSuccess
                          ? colors.getLabelColor(habit.color)
                          : colors.mistExtra
                        ).toCssValue()
                      : 'transparent',
                  }}
                />
              )
            })}
          </VStack>
        )
      })}
    </UniformColumnGrid>
  )
}
