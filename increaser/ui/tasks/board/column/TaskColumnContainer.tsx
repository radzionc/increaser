import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { VStack } from '@lib/ui/layout/Stack'
import styled, { css } from 'styled-components'
import { taskBoardConfig } from '../config'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { ComponentProps, forwardRef } from 'react'
import { ComponentWithActiveState } from '@lib/ui/props'

const Wrapper = styled.div`
  display: block;
  flex-shrink: 0;
  height: 100%;
  &:not(:last-child) {
    padding-right: ${toSizeUnit(taskBoardConfig.columnGap / 2)};
  }
  &:not(:first-child) {
    padding-left: ${toSizeUnit(taskBoardConfig.columnGap / 2)};
  }
  position: relative;
  flex: 1;
  min-width: 280px;
  align-items: flex-start;
`

const Container = styled(VStack)<ComponentWithActiveState>`
  position: relative;
  max-height: 100%;
  ${borderRadius.m};
  border: 2px solid transparent;
  background: ${getColor('foregroundExtra')};

  ${({ isActive }) =>
    isActive &&
    css`
      border-color: ${getColor('primary')};
    `};
`

type TaskColumnContainerProps = ComponentProps<typeof Wrapper> & {
  isDraggingOver?: boolean
}

export const TaskColumnContainer = forwardRef<
  HTMLDivElement,
  TaskColumnContainerProps
>(({ children, isDraggingOver, ...props }, ref) => {
  return (
    <Wrapper ref={ref} {...props}>
      <Container isActive={!!isDraggingOver}>{children}</Container>
    </Wrapper>
  )
})
