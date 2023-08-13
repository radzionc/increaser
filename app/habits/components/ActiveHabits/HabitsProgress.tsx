import { useStartOfDay } from 'shared/hooks/useStartOfDay'
import { range } from 'shared/utils/range'
import styled, { useTheme } from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { SameWidthChildrenRow } from '@increaser/ui/ui/Layout/SameWidthChildrenRow'
import { VStack } from '@increaser/ui/ui/Stack'
import { MS_IN_DAY, MS_IN_SEC } from 'utils/time'

import { useHabits } from '../HabitsProvider'
import { habitDaysToShow } from './config'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'

const HabitStatus = styled.div`
  width: 100%;
  border-radius: 2px;
  aspect-ratio: 1 / 1;
  ${defaultTransitionCSS}
`

export const HabitsProgress = () => {
  const { habits } = useHabits()
  const startOfDay = useStartOfDay()

  const { colors } = useTheme()

  return (
    <SameWidthChildrenRow gap={2}>
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
    </SameWidthChildrenRow>
  )
}
