import { centerContent } from '@lib/ui/css/centerContent'
import { interactive } from '@lib/ui/css/interactive'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { IsActiveProp } from '@lib/ui/props'
import { getColor, matchColor } from '@lib/ui/theme/getters'
import { Habit } from '@product/entities/Habit'
import { toHabitDate } from '@product/entities-utils/habit/toHabitDate'
import { useTrackHabitMutation } from '@product/ui/habits/api/useTrackHabitMutation'
import { ComponentProps } from 'react'
import styled from 'styled-components'

import { trackHabitsConfig } from './config'

const Container = styled.div<IsActiveProp>`
  ${sameDimensions(trackHabitsConfig.itemHeight)};

  ${centerContent};
  color: ${getColor('contrast')};
  border-radius: 2px;
  ${interactive};

  ${centerContent};

  font-size: 24px;

  border: 1px solid
    ${matchColor('isActive', {
      true: 'mist',
      false: 'mistExtra',
    })};

  background: ${matchColor('isActive', {
    true: 'background',
    false: 'foregroundExtra',
  })};
`

type CheckHabitProps = {
  habit: Pick<Habit, 'id' | 'emoji'>
  isCompleted: boolean
  dayStartedAt: number
} & ComponentProps<typeof Container>

export const CheckHabit = ({
  habit: { id, emoji },
  isCompleted,
  dayStartedAt,
  ...rest
}: CheckHabitProps) => {
  const { mutate } = useTrackHabitMutation()

  return (
    <Container
      onClick={() => {
        mutate({
          id,
          value: !isCompleted,
          date: toHabitDate(dayStartedAt),
        })
      }}
      isActive={isCompleted}
      {...rest}
    >
      {isCompleted && emoji}
    </Container>
  )
}
