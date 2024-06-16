import { InputProps } from '@lib/ui/props'
import { ComponentProps } from 'react'
import styled from 'styled-components'

import { MultilineTextInput } from '@lib/ui/inputs/MultilineTextInput'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { habitContentMinHeight } from '../config'
import { getColor } from '@lib/ui/theme/getters'

const Container = styled(MultilineTextInput)`
  line-height: ${toSizeUnit(habitContentMinHeight)};
  background: ${getColor('background')};
  width: 100%;
`

type HabitNameInputProps = InputProps<string> &
  Omit<ComponentProps<typeof Container>, 'value' | 'onChange'> & {
    onSubmit?: () => void
  }

export const HabitNameInput = ({
  value,
  onChange,
  onSubmit,
  ...rest
}: HabitNameInputProps) => {
  return (
    <Container
      placeholder="Habit name"
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
