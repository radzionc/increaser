import { useTrackHabitMutation } from 'habits/api/useTrackHabitMutation'
import { toHabitDate } from 'habits/utils/toHabitDate'
import { useMemo } from 'react'
import { isToday } from 'shared/utils/isToday'
import styled from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { UnstyledButton } from '@increaser/ui/ui/buttons/UnstyledButton'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'

import { useActiveHabits } from './ActiveHabitsContext'

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
  ${centerContentCSS};
  width: 100%;
  border-radius: 4px;
  ${defaultTransitionCSS};
  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};
  font-size: 12px;

  :hover {
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
