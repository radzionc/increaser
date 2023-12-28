import { useTrackHabitMutation } from '@increaser/app/habits/api/useTrackHabitMutation'
import { useMemo } from 'react'
import { isToday } from '@lib/utils/time/isToday'
import styled from 'styled-components'
import { transition } from '@lib/ui/css/transition'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { HSLA } from '@lib/ui/colors/HSLA'
import { centerContent } from '@lib/ui/css/centerContent'

import { useActiveHabits } from './ActiveHabitsContext'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'

interface Props {
  id: string
  date: Date
  value: boolean
  color: HSLA
}

const Underline = styled.div<{ $color?: HSLA }>`
  bottom: 0;
  left: 0;
  position: absolute;
  height: 4px;
  border-radius: 4px;
  background: ${({ $color, theme }) =>
    ($color ?? theme.colors.textShy).toCssValue()};
  width: 100%;
`

const Container = styled(UnstyledButton)`
  position: relative;

  height: 32px;
  ${centerContent};
  width: 100%;
  border-radius: 4px;
  ${transition};
  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};
  font-size: 12px;

  &:hover {
    background: ${({ theme }) => theme.colors.mist.toCssValue()};
    color: ${({ theme }) => theme.colors.text.toCssValue()};
  }
`

export const HabitDay = ({ id, date, value, color }: Props) => {
  const { isReadonly } = useActiveHabits()

  const { mutate: track } = useTrackHabitMutation()

  const text = useMemo(() => {
    if (isToday(date)) {
      return 'Today'
    }

    return date.toLocaleDateString('en-US', {
      weekday: 'short',
    })
  }, [date])

  return (
    <Container
      onClick={
        isReadonly
          ? undefined
          : () => track({ id, date: toHabitDate(date), value: !value })
      }
    >
      {text}
      <Underline $color={value ? color : undefined} />
    </Container>
  )
}
