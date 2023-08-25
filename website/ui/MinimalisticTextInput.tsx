import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { defaultInputShapeCSS } from '@increaser/ui/ui/inputs/config'
import { getHorizontalPaddingCSS } from '@increaser/ui/ui/utils/getHorizontalPaddingCSS'
import styled from 'styled-components'

export const MinimalisticTextInput = styled.input`
  ${getHorizontalPaddingCSS(16)}
  background: ${({ theme }) => theme.colors.mist.toCssValue()};
  border: 2px solid transparent;
  ${defaultInputShapeCSS};
  min-width: 160px;
  flex: 1;
  color: ${({ theme }) => theme.colors.text.toCssValue()};
  font-weight: 500;
  font-size: 16px;
  ${defaultTransitionCSS};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textShy.toCssValue()};
  }

  :hover {
    border-color: ${({ theme }) => theme.colors.mist.toCssValue()};
  }

  :focus {
    border-color: ${({ theme }) => theme.colors.mistExtra.toCssValue()};
  }
`
