import { borderRadius } from '@lib/ui/css/borderRadius'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { transition } from '@lib/ui/css/transition'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'

export const focusOptionPadding = 12

export const FocusOptionContainer = styled.div<{
  selected: boolean
}>`
  padding: ${toSizeUnit(focusOptionPadding)};
  ${borderRadius.s}
  display: flex;
  align-items: center;
  justify-content: start;
  cursor: pointer;
  position: relative;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;

  font-size: 14px;

  ${transition}
  color: ${getColor('textSupporting')};
  border: 2px solid transparent;
  background: ${getColor('foreground')};

  ${({ selected }) =>
    selected
      ? css`
          color: ${getColor('contrast')};
          background: ${getColor('mist')};
          border-color: ${getColor('mistExtra')};
        `
      : css`
          &:hover {
            background: ${getColor('mist')};
          }
        `}
`
