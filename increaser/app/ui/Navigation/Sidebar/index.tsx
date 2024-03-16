import { usePWA } from '@increaser/app/pwa/PWAContext'
import styled from 'styled-components'
import { InstallPrompt } from '@increaser/app/ui/Navigation/Sidebar/InstallPrompt'
import { VStack } from '@lib/ui/layout/Stack'

import { NavigationToInternalPage } from './NavigationToInternalPage'
import { AppPath } from '@increaser/ui/navigation/AppPath'

const Container = styled.div`
  min-width: 260px;
  height: 100%;
  background: ${({ theme }) => theme.colors.foreground.toCssValue()};
  padding: 40px 8px 20px 8px;
  overflow: auto;
`

export const Sidebar = () => {
  const { installPromptEvent, isSidebarInstallPromptRejected } = usePWA()
  const isInstallPromptEnabled =
    installPromptEvent && !isSidebarInstallPromptRejected

  return (
    <Container>
      <VStack alignItems="center" fullHeight justifyContent="space-between">
        <VStack fullWidth gap={20}>
          <VStack fullWidth>
            <NavigationToInternalPage path={AppPath.Home} />
            <NavigationToInternalPage path={AppPath.TimeTracking} />
            <NavigationToInternalPage path={AppPath.Tasks} />
            <NavigationToInternalPage path={AppPath.Capacity} />
            <NavigationToInternalPage path={AppPath.Habits} />
            <NavigationToInternalPage path={AppPath.Projects} />
            <NavigationToInternalPage path={AppPath.Sessions} />
            <NavigationToInternalPage path={AppPath.Community} />
            {isInstallPromptEnabled && <InstallPrompt />}
          </VStack>
        </VStack>
        <VStack gap={20} fullWidth>
          <NavigationToInternalPage path={AppPath.Account} />
        </VStack>
      </VStack>
    </Container>
  )
}
