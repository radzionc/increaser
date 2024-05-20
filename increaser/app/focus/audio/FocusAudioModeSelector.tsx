import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import {
  focusAduioModeName,
  focusAudioModes,
  useFocusAudioMode,
} from './state/useFocusAudioMode'
import styled, { css } from 'styled-components'
import { centerContent } from '@lib/ui/css/centerContent'
import { interactive } from '@lib/ui/css/interactive'
import { transition } from '@lib/ui/css/transition'
import { getColor } from '@lib/ui/theme/getters'
import { borderRadius } from '@lib/ui/css/borderRadius'

const Container = styled(UniformColumnGrid)`
  padding: 0;
  padding: 2px;
`

const Option = styled.div<{ isSelected: boolean }>`
  padding: 16px;
  ${centerContent};
  ${interactive};
  ${transition}
  ${borderRadius.s};
  font-weight: 500;

  ${({ isSelected }) =>
    isSelected
      ? css`
          background: ${getColor('mist')};
          color: ${getColor('contrast')};
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
    <Container gap={2}>
      {focusAudioModes.map((option) => (
        <Option
          key={option}
          isSelected={mode === option}
          onClick={() => setMode(option)}
        >
          {focusAduioModeName[option]}
        </Option>
      ))}
    </Container>
  )
}
