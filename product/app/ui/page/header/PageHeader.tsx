import { HStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { Header } from '@lib/ui/layout/Header'
import { ChildrenProp } from '@lib/ui/props'
import { ComponentProps, ReactNode } from 'react'
import styled from 'styled-components'

import { sidebarConfig } from '../../../navigation/Sidebar/config'

import { useSetPageHeaderControlsArea } from './PageHeaderControlsAreaProvider'

const Container = styled(Header)`
  position: relative;
  gap: 0px;

  > * {
    height: ${toSizeUnit(sidebarConfig.headerHeight)};
  }
`

const Controls = styled(HStack)`
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  flex: 1;
  justify-content: flex-end;
`

const Placeholder = styled.div`
  display: contents;
`

type PageHeaderProps = ChildrenProp & {
  controls?: ReactNode
} & ComponentProps<typeof Container>

export const PageHeader = ({
  children,
  controls,
  ...rest
}: PageHeaderProps) => {
  const setControlsArea = useSetPageHeaderControlsArea()

  return (
    <Container {...rest}>
      {children}
      <Controls>
        <Placeholder ref={setControlsArea} />
        {controls}
      </Controls>
    </Container>
  )
}
