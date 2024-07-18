import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { InputProps } from '@lib/ui/props'
import { ComponentProps, forwardRef } from 'react'
import styled from 'styled-components'

import { MultilineTextInput } from '@lib/ui/inputs/MultilineTextInput'
import { getColor } from '@lib/ui/theme/getters'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'

const Container = styled(MultilineTextInput)`
  line-height: ${toSizeUnit(tightListItemConfig.lineHeight)};
  background: ${getColor('background')};
  width: 100%;
`

type TaskNameInputProps = InputProps<string> &
  Omit<ComponentProps<typeof Container>, 'value' | 'onChange'> & {
    onSubmit?: () => void
  }

export const TaskNameInput = forwardRef<
  HTMLTextAreaElement,
  TaskNameInputProps
>(({ value, onChange, onSubmit, ...rest }, ref) => {
  return (
    <Container
      value={value}
      onChange={onChange}
      autoComplete="off"
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          onSubmit?.()
        }
      }}
      ref={ref}
      {...rest}
    />
  )
})
