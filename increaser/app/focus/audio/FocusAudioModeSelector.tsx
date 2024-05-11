import { borderRadius } from '@lib/ui/css/borderRadius'
import { centerContent } from '@lib/ui/css/centerContent'
import { transition } from '@lib/ui/css/transition'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'
import {
  focusAduioModeName,
  focusAudioModes,
  useFocusAudioMode,
} from './state/useFocusAudioMode'

const Option = styled.div<{ isSelected: boolean }>`
  ${centerContent};
  ${borderRadius.s};
  padding: 8px;
  ${transition};
  color: ${getColor('text')};
  font-weight: 500;
  cursor: pointer;
  border: 1px solid ${getColor('mist')};

  ${({ isSelected }) =>
    isSelected
      ? css`
          background: ${getColor('mist')};
          color: ${getColor('contrast')};
          border-color: transparent;
        `
      : css`
          &:hover {
            background: ${getColor('mist')};
          }
        `}
`

export const FocusAudioModeSelector = () => {
  const [mode, setMode] = useFocusAudioMode()

  return (
    <UniformColumnGrid gap={4}>
      {focusAudioModes.map((option) => (
        <Option
          key={option}
          isSelected={mode === option}
          onClick={() => setMode(option)}
        >
          {focusAduioModeName[option]}
        </Option>
      ))}
    </UniformColumnGrid>
  )
}
