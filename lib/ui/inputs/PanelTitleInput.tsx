import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { InputProps } from '@lib/ui/props'
import { ComponentProps, forwardRef } from 'react'
import styled from 'styled-components'

import { MultilineTextInput } from '@lib/ui/inputs/MultilineTextInput'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { getColor } from '../theme/getters'

const Container = styled(MultilineTextInput)`
  line-height: ${toSizeUnit(tightListItemConfig.lineHeight)};
  background: transparent;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  color: ${getColor('contrast')};
`

type PanelTitleInputProps = InputProps<string> &
  Omit<ComponentProps<typeof Container>, 'value' | 'onChange'> & {
    onSubmit?: () => void
  }

export const PanelTitleInput = forwardRef<
  HTMLTextAreaElement,
  PanelTitleInputProps
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
