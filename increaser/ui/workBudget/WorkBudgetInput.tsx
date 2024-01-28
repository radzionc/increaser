import { HSLA } from '@lib/ui/colors/HSLA'
import { HoursInput } from '@lib/ui/inputs/Slider/HoursInput'
import { InputProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'

type WorkBudgetInputProps = InputProps<number> & {
  color: HSLA
  name: string
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
  gap: 20px;
`

export const WorkBudgetInput = ({
  value,
  onChange,
  color,
  name,
}: WorkBudgetInputProps) => {
  return (
    <Container>
      <Text weight="semibold">{name}</Text>
      <HoursInput max={10} value={value} onChange={onChange} color={color} />
    </Container>
  )
}
