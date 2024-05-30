import { InputProps } from '@lib/ui/props'
import { ComponentProps } from 'react'
import styled from 'styled-components'

import { MultilineTextInput } from '@lib/ui/inputs/MultilineTextInput'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { visionItemContentMinHeight } from '../config'

const Container = styled(MultilineTextInput)`
  line-height: ${toSizeUnit(visionItemContentMinHeight)};
`

type VisionAttributeNameInputProps = InputProps<string> &
  Omit<ComponentProps<typeof Container>, 'value' | 'onChange'> & {
    onSubmit?: () => void
  }

export const VisionAttributeNameInput = ({
  value,
  onChange,
  onSubmit,
  ...rest
}: VisionAttributeNameInputProps) => {
  return (
    <Container
      placeholder="Describe your life aspiration"
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
