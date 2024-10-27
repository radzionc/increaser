import { Habit } from '@increaser/entities/Habit'
import { centerContent } from '@lib/ui/css/centerContent'
import { interactive } from '@lib/ui/css/interactive'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { ComponentWithActiveState } from '@lib/ui/props'
import { getColor, matchColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { trackHabitsConfig } from './config'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'
import { useTrackHabitMutation } from '@increaser/ui/habits/api/useTrackHabitMutation'

type CheckHabitProps = {
  habit: Pick<Habit, 'id' | 'emoji'>
  isCompleted: boolean
  dayStartedAt: number
}

const Container = styled.div<ComponentWithActiveState>`
  ${sameDimensions(trackHabitsConfig.itemHeight)};

  ${centerContent};
  color: ${getColor('contrast')};
  border-radius: 2px;
  ${interactive};

  ${centerContent};

  font-size: 20px;

  border: 1px solid ${getColor('mistExtra')};

  background: ${matchColor('isActive', {
    true: 'success',
    false: 'foreground',
  })};
`

export const CheckHabit = ({
  habit: { id },
  isCompleted,
  dayStartedAt,
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
    />
  )
}
