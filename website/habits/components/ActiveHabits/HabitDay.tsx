import { useMemo } from 'react'
import { isToday } from '@increaser/utils/time/isToday'
import styled from 'styled-components'
import { transition } from '@increaser/ui/css/transition'
import { UnstyledButton } from '@increaser/ui/buttons/UnstyledButton'
import { HSLA } from '@increaser/ui/colors/HSLA'
import { centerContent } from '@increaser/ui/css/centerContent'

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

  :hover {
    background: ${({ theme }) => theme.colors.mist.toCssValue()};
    color: ${({ theme }) => theme.colors.text.toCssValue()};
  }
`

export const HabitDay = ({ date, value, color }: Props) => {
  const text = useMemo(() => {
    if (isToday(date)) {
      return 'Today'
    }

    return date.toLocaleDateString('en-US', {
      weekday: 'short',
    })
  }, [date])

  return (
    <Container>
      {text}
      <Underline $color={value ? color : undefined} />
    </Container>
  )
}
