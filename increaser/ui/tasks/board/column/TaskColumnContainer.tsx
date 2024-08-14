import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { taskBoardConfig } from '../config'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { getColor } from '@lib/ui/theme/getters'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'

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

const Content = styled(VStack)`
  position: absolute;
  width: 100%;

  ${borderRadius.m};
  background: ${getColor('foregroundExtra')};
`

export const TaskColumnContainer = ({
  children,
}: ComponentWithChildrenProps) => {
  return (
    <ElementSizeAware
      render={({ setElement, size }) => {
        return (
          <Wrapper ref={setElement}>
            <Container>
              {size && (
                <Content style={{ maxHeight: size.height }}>{children}</Content>
              )}
            </Container>
          </Wrapper>
        )
      }}
    />
  )
}
