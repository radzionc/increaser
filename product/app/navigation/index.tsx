import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { HStack, VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { useIsScreenWidthLessThan } from '@lib/ui/hooks/useIsScreenWidthLessThan'
import styled, { css } from 'styled-components'

import { Sidebar } from './Sidebar'
import { sidebarConfig } from './Sidebar/config'
import { SidebarHeader } from './Sidebar/SidebarHeader'
import { Topbar } from './Topbar'
import { topbarConfig } from './Topbar/config'

interface Props {
  children: React.ReactNode
}

const SMALL_SCREEN_BREAKPOINT = 900

const ScreenWidthSidebar = styled(HStack)`
  max-height: 100%;
`

const contentCSS = css`
  max-height: 100%;
  overflow: auto;
  height: 100%;
  width: 100%;
`

const ScreenWidthTopbarContent = styled(VStack)`
  ${contentCSS}
  ${horizontalPadding(topbarConfig.horizontalPadding)};
`

const ScreenWidthSidebarContent = styled(VStack)`
  ${contentCSS}
  padding: ${toSizeUnit(sidebarConfig.verticalPadding)} 4%;
`

export const Navigation = ({ children }: Props) => {
  const isSmallScreen = useIsScreenWidthLessThan(SMALL_SCREEN_BREAKPOINT)

  if (isSmallScreen) {
    return (
      <VStack fullHeight alignItems="start">
        <Topbar />
        <ScreenWidthTopbarContent>{children}</ScreenWidthTopbarContent>
      </VStack>
    )
  }

  return (
    <ScreenWidthSidebar fullHeight alignItems="start">
      <Sidebar header={<SidebarHeader />} />
      <ScreenWidthSidebarContent alignItems="center">
        <>{children}</>
      </ScreenWidthSidebarContent>
    </ScreenWidthSidebar>
  )
}
