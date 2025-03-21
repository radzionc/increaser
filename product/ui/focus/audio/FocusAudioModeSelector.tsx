import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { HStack } from '@lib/ui/css/stack'
import { IsActiveProp } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'

import {
  focusAduioModeName,
  focusAudioModes,
  useFocusAudioMode,
} from './state/useFocusAudioMode'

const Option = styled(UnstyledButton)<IsActiveProp>`
  ${({ isActive }) =>
    isActive
      ? css``
      : css`
          color: ${getColor('textSupporting')};
          &:hover {
            color: ${getColor('text')};
          }
        `}

  line-height: 1.5;

  outline: none;

  &:first-child {
    padding-right: 8px;
  }

  &:last-child {
    padding-left: 8px;
  }
`

export const FocusAudioModeSelector = () => {
  const [mode, setMode] = useFocusAudioMode()

  return (
    <HStack>
      {focusAudioModes.map((option) => (
        <Option
          key={option}
          isActive={mode === option}
          onClick={() => setMode(option)}
        >
          {focusAduioModeName[option]}
        </Option>
      ))}
    </HStack>
  )
}
