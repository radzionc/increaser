import { InputProps } from '@lib/ui/props'
import { ComponentProps } from 'react'
import styled from 'styled-components'

import { MultilineTextInput } from '@lib/ui/inputs/MultilineTextInput'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { goalContentMinHeight } from '../config'
import { getColor } from '@lib/ui/theme/getters'

const Container = styled(MultilineTextInput)`
  line-height: ${toSizeUnit(goalContentMinHeight)};
  background: ${getColor('background')};
`

type GoalNameInputProps = InputProps<string> &
  Omit<ComponentProps<typeof Container>, 'value' | 'onChange'> & {
    onSubmit?: () => void
  }

export const GoalNameInput = ({
  value,
  onChange,
  onSubmit,
  ...rest
}: GoalNameInputProps) => {
  return (
    <Container
      placeholder="Describe your goal"
      value={value}
      onChange={onChange}
      autoComplete="off"
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          onSubmit?.()
        }
      }}
      {...rest}
    />
  )
}
