import {
  checklistItemContentMinHeight,
  checklistItemVerticalPadding,
} from '@lib/ui/checklist/ChecklistItemFrame'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { centerContent } from '@lib/ui/css/centerContent'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { GripVerticalIcon } from '@lib/ui/icons/GripVerticalIcon'
import { ComponentWithActiveState } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { forwardRef } from 'react'
import styled, { css } from 'styled-components'

const dragHandleWidth = 20

const Wrapper = styled.div`
  padding-top: ${toSizeUnit(checklistItemVerticalPadding)};
`

const Container = styled.div<ComponentWithActiveState>`
  width: ${toSizeUnit(dragHandleWidth)};
  height: ${toSizeUnit(checklistItemContentMinHeight)};
  ${borderRadius.xs};
  border: 1px solid ${getColor('mist')};
  background: ${getColor('foreground')};
  ${centerContent};

  ${({ isActive }) =>
    isActive
      ? css`
          border-color: ${getColor('primary')};
          color: ${getColor('contrast')};
        `
      : css`
          &:hover {
            border-color: ${getColor('mistExtra')};
            color: ${getColor('contrast')};
          }
        `}
`

export const ChecklistItemDragHandle = forwardRef<
  HTMLDivElement,
  ComponentWithActiveState
>((props, ref) => {
  return (
    <Wrapper>
      <Container {...props} ref={ref}>
        <GripVerticalIcon />
      </Container>
    </Wrapper>
  )
})
