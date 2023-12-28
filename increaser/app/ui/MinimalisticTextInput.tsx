import { transition } from '@lib/ui/css/transition'
import { defaultInputShapeCSS } from '@lib/ui/inputs/config'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import styled from 'styled-components'

export const MinimalisticTextInput = styled.input`
  ${horizontalPadding(16)}
  background: ${({ theme }) => theme.colors.mist.toCssValue()};
  border: 2px solid transparent;
  ${defaultInputShapeCSS};
  min-width: 160px;
  flex: 1;
  color: ${({ theme }) => theme.colors.text.toCssValue()};
  font-weight: 500;
  font-size: 16px;
  ${transition};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textShy.toCssValue()};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.mist.toCssValue()};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.mistExtra.toCssValue()};
  }
`
