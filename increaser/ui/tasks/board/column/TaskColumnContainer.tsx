import { VStack } from '@lib/ui/css/stack'
import styled, { css } from 'styled-components'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { ComponentProps } from 'react'
import { IsActiveProp } from '@lib/ui/props'

const Wrapper = styled.div`
  display: block;
  flex-shrink: 0;
  height: 100%;
  position: relative;
  flex: 1;
  min-width: 280px;
  align-items: flex-start;
`

const Container = styled(VStack)<IsActiveProp>`
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

export const TaskColumnContainer = ({
  children,
  isDraggingOver,
  ...props
}: TaskColumnContainerProps) => {
  return (
    <Wrapper>
      <Container {...props} isActive={!!isDraggingOver}>
        {children}
      </Container>
    </Wrapper>
  )
}
