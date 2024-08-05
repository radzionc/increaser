import { Habit } from '@increaser/entities/Habit'
import { centerContent } from '@lib/ui/css/centerContent'
import { interactive } from '@lib/ui/css/interactive'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { ComponentWithActiveState } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css, useTheme } from 'styled-components'
import { trackHabitsConfig } from './config'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'
import { useTrackHabitMutation } from '@increaser/ui/habits/api/useTrackHabitMutation'

type CheckHabitProps = {
  habit: Pick<Habit, 'id' | 'color'>
  isCompleted: boolean
  dayStartedAt: number
}

const Container = styled.div<ComponentWithActiveState>`
  ${sameDimensions(trackHabitsConfig.itemHeight)};

  ${centerContent};
  color: ${getColor('contrast')};
  font-size: 16px;
  border-radius: 2px;
  ${interactive};

  ${({ isActive }) =>
    !isActive &&
    css`
      border: 1px solid ${getColor('mistExtra')};
      background: ${getColor('foreground')};
      &:hover {
        background: ${getColor('mistExtra')};
      }
    `}
`

export const CheckHabit = ({
  habit: { id, color },
  isCompleted,
  dayStartedAt,
}: CheckHabitProps) => {
  const { mutate } = useTrackHabitMutation()
  const {
    colors: { getLabelColor },
  } = useTheme()

  return (
    <Container
      onClick={() => {
        mutate({
          id,
          value: !isCompleted,
          date: toHabitDate(new Date(dayStartedAt)),
        })
      }}
      isActive={isCompleted}
      style={
        isCompleted
          ? { background: getLabelColor(color).toCssValue() }
          : undefined
      }
    />
  )
}
