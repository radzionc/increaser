import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { Header } from '@lib/ui/layout/Header'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'
import { sidebarConfig } from '../../../navigation/Sidebar/config'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { ComponentProps, ReactNode } from 'react'
import { HStack } from '@lib/ui/layout/Stack'
import { useSetPageHeaderControlsArea } from './PageHeaderControlsAreaProvider'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { hideScrollbars } from '@lib/ui/css/hideScrollbars'

const Underline = styled.div`
  ${absoluteOutline(0, 0)};
  border-bottom: 2px solid ${getColor('mist')};
`

const Container = styled(Header)`
  position: relative;
  height: ${toSizeUnit(sidebarConfig.headerHeight)};

  ${hideScrollbars};

  overflow-x: auto;
  flex-wrap: nowrap;
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
      <HStack gap={8} alignItems="center">
        <HStack ref={setControlsArea} gap={8} alignItems="center" />
        {controls}
      </HStack>
      <Underline />
    </Container>
  )
}
