import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { Header } from '@lib/ui/layout/Header'
import styled from 'styled-components'
import { sidebarConfig } from '../../../navigation/Sidebar/config'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { ComponentProps, ReactNode } from 'react'
import { HStack } from '@lib/ui/layout/Stack'
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

type PageHeaderProps = ComponentWithChildrenProps & {
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
      <Controls ref={setControlsArea}>{controls}</Controls>
    </Container>
  )
}
