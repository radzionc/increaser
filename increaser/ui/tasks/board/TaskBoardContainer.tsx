import { takeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { HStack } from '@lib/ui/css/stack'
import { ChildrenProp } from '@lib/ui/props'
import styled from 'styled-components'
import { taskBoardConfig } from './config'

const Wrapper = styled.div`
  flex: 1;
  position: relative;
`

export const Container = styled(HStack)`
  ${takeWholeSpaceAbsolutely};
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  gap: ${toSizeUnit(taskBoardConfig.columnGap)};
`

export const TaskBoardContainer = ({ children }: ChildrenProp) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  )
}
