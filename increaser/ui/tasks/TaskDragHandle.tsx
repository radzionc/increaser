import {
  checklistItemContentMinHeight,
  checklistItemVerticalPadding,
} from '@lib/ui/checklist/ChecklistItemFrame'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { DragHandle } from '@lib/ui/dnd/DragHandle'
import { GripVerticalIcon } from '@lib/ui/icons/GripVerticalIcon'
import { ComponentProps, forwardRef } from 'react'
import styled, { css } from 'styled-components'

export type TaskDragHandleProps = ComponentProps<typeof DragHandle> & {
  isEnabled: boolean
}

const dragHandleWidth = 36

const Container = styled(DragHandle)<{ isEnabled: boolean }>`
  height: ${toSizeUnit(
    checklistItemContentMinHeight + checklistItemVerticalPadding * 2,
  )};
  width: ${toSizeUnit(dragHandleWidth)};

  ${({ isEnabled }) =>
    !isEnabled &&
    css`
      pointer-events: none;
      visibility: hidden;
    `}

  @media (hover: hover) and (pointer: fine) {
    position: absolute;
    top: 0;
    left: -${toSizeUnit(dragHandleWidth)};
  }
`

export const TaskDragHandle = forwardRef<HTMLDivElement, TaskDragHandleProps>(
  (props, ref) => {
    return (
      <Container {...props} ref={ref}>
        <GripVerticalIcon />
      </Container>
    )
  },
)
