import { borderRadius } from '@lib/ui/css/borderRadius'
import { centerContent } from '@lib/ui/css/centerContent'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { GripVerticalIcon } from '@lib/ui/icons/GripVerticalIcon'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { ComponentWithActiveState } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { forwardRef } from 'react'
import styled, { css } from 'styled-components'
import { checklistConfig } from './config'

const Wrapper = styled.div`
  padding-top: ${toSizeUnit(tightListItemConfig.verticalPadding)};
`

const Container = styled.div<ComponentWithActiveState>`
  width: ${toSizeUnit(checklistConfig.dragHandleWidth)};
  height: ${toSizeUnit(tightListItemConfig.lineHeight)};
  ${borderRadius.xs};
  border: 1px solid ${getColor('mist')};
  background: ${getColor('foreground')};
  ${centerContent};

  ${({ isActive }) =>
    isActive
      ? css`
          cursor: grabbing;
          border-color: ${getColor('primary')};
          color: ${getColor('contrast')};
        `
      : css`
          cursor: grab;
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
