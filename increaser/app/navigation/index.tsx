import { Topbar } from './Topbar'
import styled, { css } from 'styled-components'
import { useIsScreenWidthLessThan } from '@lib/ui/hooks/useIsScreenWidthLessThan'
import { HStack, VStack } from '@lib/ui/css/stack'
import { Sidebar } from './Sidebar'
import { sidebarConfig } from './Sidebar/config'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { topbarConfig } from './Topbar/config'
import { SidebarHeader } from './Sidebar/SidebarHeader'

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
