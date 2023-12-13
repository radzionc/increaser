import { centerContent } from '@increaser/ui/css/centerContent'
import { interactive } from '@increaser/ui/css/interactive'
import { getColor } from '@increaser/ui/theme/getters'
import styled, { css } from 'styled-components'

export const TimeOption = styled.div<{ isActive: boolean }>`
  outline: none;
  ${interactive};
  color: ${getColor('textSupporting')};
  position: relative;
  padding: 8px 12px;
  font-weight: 500;
  border-radius: 8px;
  ${centerContent};

  ${({ isActive }) =>
    isActive &&
    css`
      background: ${getColor('mist')};
      color: ${getColor('contrast')};
    `}
`
