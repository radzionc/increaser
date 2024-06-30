import { InputProps } from '@lib/ui/props'
import { ComponentProps } from 'react'
import styled from 'styled-components'

import { MultilineTextInput } from '@lib/ui/inputs/MultilineTextInput'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { getColor } from '@lib/ui/theme/getters'
import { projectsConfig } from '../config'

const Container = styled(MultilineTextInput)`
  line-height: ${toSizeUnit(projectsConfig.contentMinHeight)};
  background: ${getColor('background')};
  width: 100%;
`

type ProjectNameInputProps = InputProps<string> &
  Omit<ComponentProps<typeof Container>, 'value' | 'onChange'> & {
    onSubmit?: () => void
  }

export const ProjectNameInput = ({
  value,
  onChange,
  onSubmit,
  ...rest
}: ProjectNameInputProps) => {
  return (
    <Container
      placeholder="Project name"
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
