import styled, { css } from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { dragHandleWidth } from './DnDGroups'

export const DragHandle = styled.div<{ isDragging?: boolean }>`
  position: absolute;
  left: -${toSizeUnit(dragHandleWidth)};
  height: 40px;
  width: ${toSizeUnit(dragHandleWidth)};
  font-size: 20px;
  ${centerContent};
  color: ${matchColor('isDragging', {
    true: 'contrast',
    false: 'textSupporting',
  })};
  transition: color ${defaultTransition};
  ${({ isDragging }) =>
    !isDragging &&
    css`
      &:hover {
        color: ${getColor('text')};
      }
    `}

  @media (hover: hover) and (pointer: fine) {
    &:not(:focus-within) {
      opacity: ${({ isDragging }) => (isDragging ? 1 : 0)};
    }
  }
`
