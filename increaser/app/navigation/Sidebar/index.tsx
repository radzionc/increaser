import { usePWA } from '@increaser/app/pwa/PWAContext'
import styled from 'styled-components'
import { VStack } from '@lib/ui/layout/Stack'

import { getColor } from '@lib/ui/theme/getters'
import {
  primaryAppNavigationPages,
  secondaryAppNavigationPages,
} from '@increaser/ui/navigation/app'
import { SidebarNavigationItem } from '../SidebarNavigationItem'
import { InstallPrompt } from './InstallPrompt'
import { SidebarHeader } from './SidebarHeader'
import { sidebarConfig } from './config'
import { verticalPadding } from '@lib/ui/css/verticalPadding'

const Container = styled.div`
  min-width: 260px;
  height: 100%;
  background: ${({ theme }) => theme.colors.foreground.toCssValue()};
  padding: 8px;
  padding-top: 0;
  overflow: auto;
  ${verticalPadding(sidebarConfig.verticalPadding)};
`

const Footer = styled(VStack)`
  padding-top: 4px;
  border-top: 1px solid ${getColor('mist')};
`

export const Sidebar = () => {
  const { installPromptEvent, isSidebarInstallPromptRejected } = usePWA()
  const isInstallPromptEnabled =
    installPromptEvent && !isSidebarInstallPromptRejected

  return (
    <Container>
      <VStack alignItems="center" fullHeight justifyContent="space-between">
        <VStack fullWidth gap={sidebarConfig.gap}>
          <SidebarHeader />
          <VStack gap={4} fullWidth>
            {primaryAppNavigationPages.map((page) => (
              <SidebarNavigationItem key={page} value={page} />
            ))}
            {isInstallPromptEnabled && <InstallPrompt />}
          </VStack>
        </VStack>
        <Footer gap={4} fullWidth>
          {secondaryAppNavigationPages.map((page) => (
            <SidebarNavigationItem key={page} value={page} />
          ))}
        </Footer>
      </VStack>
    </Container>
  )
}
