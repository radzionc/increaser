import { HSLA } from '@lib/ui/colors/HSLA'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { InputLabel } from '@lib/ui/inputs/InputLabel'
import { SegmentedSlider } from '@lib/ui/inputs/Slider/SegmentedSlider'
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
      <InputLabel>{name}</InputLabel>
      <SegmentedSlider
        max={10}
        value={value}
        onChange={onChange}
        color={color}
      />
    </InputContainer>
  )
}
