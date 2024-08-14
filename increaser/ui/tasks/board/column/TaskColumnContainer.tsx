import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { VStack } from '@lib/ui/layout/Stack'
import styled, { css } from 'styled-components'
import { taskBoardConfig } from '../config'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { ComponentProps, forwardRef } from 'react'
import { MergeRefs } from '@lib/ui/base/MergeRefs'
import { ComponentWithActiveState } from '@lib/ui/props'

const Wrapper = styled(VStack)`
  flex: 1;
  &:not(:last-child) {
    padding-right: ${toSizeUnit(taskBoardConfig.columnGap / 2)};
  }
  &:not(:first-child) {
    padding-left: ${toSizeUnit(taskBoardConfig.columnGap / 2)};
  }
  position: relative;
`

const Container = styled(VStack)`
  flex: 1;
  position: relative;
`

const Content = styled(VStack)<ComponentWithActiveState>`
  position: absolute;
  width: 100%;

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
    <ElementSizeAware
      render={({ setElement, size }) => {
        return (
          <MergeRefs
            refs={[ref, setElement]}
            render={(ref) => (
              <Wrapper ref={ref} {...props}>
                <Container>
                  {size && (
                    <Content
                      isActive={!!isDraggingOver}
                      style={{ maxHeight: size.height }}
                    >
                      {children}
                    </Content>
                  )}
                </Container>
              </Wrapper>
            )}
          />
        )
      }}
    />
  )
})
