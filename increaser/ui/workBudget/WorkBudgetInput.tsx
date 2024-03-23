import { HSLA } from '@lib/ui/colors/HSLA'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import { HoursInput } from '@lib/ui/inputs/Slider/HoursInput'
import { InputProps } from '@lib/ui/props'

type WorkBudgetInputProps = InputProps<number> & {
  color: HSLA
  name: string
}

export const WorkBudgetInput = ({
  value,
  onChange,
  color,
  name,
}: WorkBudgetInputProps) => {
  return (
    <InputContainer as="div">
      <LabelText>{name}</LabelText>
      <HoursInput max={10} value={value} onChange={onChange} color={color} />
    </InputContainer>
  )
}
