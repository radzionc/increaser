import { usePWA } from '@increaser/app/pwa/PWAContext'
import styled from 'styled-components'
import { InstallPrompt } from '@increaser/app/ui/Navigation/Sidebar/InstallPrompt'
import { VStack } from '@lib/ui/layout/Stack'

import { NavigationToInternalPage } from './NavigationToInternalPage'
import { AppPath } from '@increaser/ui/navigation/AppPath'
import { UserStateOnly } from '../../../user/state/UserStateOnly'
import { FocusNavigationDecoration } from '@increaser/ui/focus/FocusNavigationDecoration'
import { getColor } from '@lib/ui/theme/getters'
import { MembershipNavigationDecoration } from '../../../membership/components/MembershipNavigationDecoration'
import { StartTheDayNavigation } from '../../../plan/StartTheDayNavigation'

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
            <UserStateOnly>
              <StartTheDayNavigation />
            </UserStateOnly>
            <NavigationToInternalPage
              path={AppPath.Home}
              decoration={
                <UserStateOnly>
                  <FocusNavigationDecoration />
                </UserStateOnly>
              }
            />
            <NavigationToInternalPage path={AppPath.TimeTracking} />
            <NavigationToInternalPage path={AppPath.WorkBudget} />
            <NavigationToInternalPage path={AppPath.ProjectsBudget} />
            <NavigationToInternalPage path={AppPath.Habits} />
            <NavigationToInternalPage path={AppPath.Tasks} />
            <NavigationToInternalPage path={AppPath.Sessions} />
            <NavigationToInternalPage path={AppPath.Vision} />
            <NavigationToInternalPage path={AppPath.Projects} />

            {isInstallPromptEnabled && <InstallPrompt />}
          </VStack>
        </VStack>
        <Footer gap={4} fullWidth>
          <NavigationToInternalPage path={AppPath.Community} />
          <NavigationToInternalPage
            path={AppPath.Membership}
            decoration={
              <UserStateOnly>
                <MembershipNavigationDecoration />
              </UserStateOnly>
            }
          />
          <NavigationToInternalPage path={AppPath.Account} />
        </Footer>
      </VStack>
    </Container>
  )
}
