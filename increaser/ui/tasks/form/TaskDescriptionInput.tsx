import { MultilineTextInput } from '@lib/ui/inputs/MultilineTextInput'
import { InputProps } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

const Container = styled(MultilineTextInput)`
  background: ${getColor('background')};
  /* margin-top: -2px; */
`

export const TaskDescriptionInput = ({
  value,
  onChange,
}: InputProps<string>) => {
  return (
    <Container
      placeholder="Add description..."
      onChange={onChange}
      value={value}
    />
  )
}
