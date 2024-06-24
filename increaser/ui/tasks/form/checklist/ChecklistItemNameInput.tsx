import { checklistItemContentMinHeight } from '@lib/ui/checklist/ChecklistItemFrame'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { InputProps } from '@lib/ui/props'
import { ComponentProps } from 'react'
import styled from 'styled-components'

import { MultilineTextInput } from '@lib/ui/inputs/MultilineTextInput'
import { getColor } from '@lib/ui/theme/getters'

const Container = styled(MultilineTextInput)`
  line-height: ${toSizeUnit(checklistItemContentMinHeight)};
  background: ${getColor('background')};
  flex: 1;
`

type ChecklistItemNameInputProps = InputProps<string> &
  Omit<ComponentProps<typeof Container>, 'value' | 'onChange'> & {
    onSubmit?: () => void
  }

export const ChecklistItemNameInput = ({
  value,
  onChange,
  onSubmit,
  ...rest
}: ChecklistItemNameInputProps) => {
  return (
    <Container
      value={value}
      onChange={onChange}
      placeholder="Add an item"
      autoComplete="off"
      autoFocus
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
