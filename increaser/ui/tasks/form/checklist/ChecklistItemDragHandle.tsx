import { borderRadius } from '@lib/ui/css/borderRadius'
import { centerContent } from '@lib/ui/css/centerContent'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { GripVerticalIcon } from '@lib/ui/icons/GripVerticalIcon'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { ComponentWithActiveState } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import { ComponentProps } from 'react'
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

          @media (hover: hover) and (pointer: fine) {
            opacity: 0;
          }
        `}
`

export const ChecklistItemDragHandle = (
  props: ComponentProps<typeof Container>,
) => {
  return (
    <Wrapper>
      <Container {...props}>
        <GripVerticalIcon />
      </Container>
    </Wrapper>
  )
}
