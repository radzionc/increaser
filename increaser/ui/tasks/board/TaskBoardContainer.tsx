import { takeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { HStack } from '@lib/ui/layout/Stack'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import styled from 'styled-components'

const Wrapper = styled.div`
  flex: 1;
  position: relative;
`

export const Container = styled(HStack)`
  ${takeWholeSpaceAbsolutely};
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
`

export const TaskBoardContainer = ({
  children,
}: ComponentWithChildrenProps) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  )
}
