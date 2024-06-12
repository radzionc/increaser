import { usePWA } from '@increaser/app/pwa/PWAContext'
import styled from 'styled-components'
import { InstallPrompt } from '@increaser/app/ui/Navigation/Sidebar/InstallPrompt'
import { VStack } from '@lib/ui/layout/Stack'

import { getColor } from '@lib/ui/theme/getters'
import { SidebarNavigationItem } from '../../../navigation/SidebarNavigationItem'
import {
  primaryAppNavigationPages,
  secondaryAppNavigationPages,
} from '@increaser/ui/navigation/app'

const Container = styled.div`
  min-width: 260px;
  height: 100%;
  background: ${({ theme }) => theme.colors.foreground.toCssValue()};
  padding: 40px 8px 20px 8px;
  overflow: auto;
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
        <VStack fullWidth gap={20}>
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
