import { useAuth } from 'auth/hooks/useAuth'
import { usePWA } from 'pwa/PWAContext'
import { Path } from 'router/Path'
import styled from 'styled-components'
import { InstallPrompt } from 'ui/Navigation/Sidebar/InstallPrompt'
import { VStack } from '@increaser/ui/ui//Stack'

import { NavigationToInternalPage } from './NavigationToInternalPage'

const Container = styled.div`
  min-width: 260px;
  height: 100%;
  background: ${({ theme }) => theme.colors.foreground.toCssValue()};
  padding: 40px 8px 20px 8px;
  overflow: auto;
`

export const Sidebar = () => {
  const { installPromptEvent, isSidebarInstallPromptRejected } = usePWA()
  const { isUserLoggedIn } = useAuth()
  const isInstallPromptEnabled =
    isUserLoggedIn && installPromptEvent && !isSidebarInstallPromptRejected

  return (
    <Container>
      <VStack alignItems="center" fullHeight justifyContent="space-between">
        <VStack fullWidth gap={20}>
          <VStack fullWidth>
            <NavigationToInternalPage path={Path.Home} />
            <NavigationToInternalPage path={Path.Capacity} />
            <NavigationToInternalPage path={Path.Habits} />
            <NavigationToInternalPage path={Path.Projects} />
            <NavigationToInternalPage path={Path.Sessions} />
            <NavigationToInternalPage path={Path.Community} />
            {isInstallPromptEnabled && <InstallPrompt />}
          </VStack>
        </VStack>
        <VStack gap={20} fullWidth>
          <NavigationToInternalPage path={Path.Account} />
        </VStack>
      </VStack>
    </Container>
  )
}
