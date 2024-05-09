import { DragHandle } from '@lib/ui/dnd/DragHandle'
import { HStack } from '@lib/ui/layout/Stack'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'

export const DragContainer = styled(HStack)`
  width: 100%;
  gap: 4px;
  align-items: start;
  background: ${getColor('background')};
  position: relative;
`

type OnHoverDragContainerProps = {
  isDraggingEnabled?: boolean
  isDragging?: boolean
}

export const OnHoverDragContainer = styled(
  DragContainer,
)<OnHoverDragContainerProps>`
  gap: 0;
  ${({ isDraggingEnabled }) =>
    !isDraggingEnabled &&
    css`
      pointer-events: none;
    `}

  @media (hover: hover) and (pointer: fine) {
    &:not(:focus-within) > ${DragHandle} {
      opacity: ${({ isDragging }) => (isDragging ? 1 : 0)};
    }
  }

  &:hover ${DragHandle} {
    opacity: 1;
  }
`
