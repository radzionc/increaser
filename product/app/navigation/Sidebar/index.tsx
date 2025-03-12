import { VStack } from '@lib/ui/css/stack'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { getColor } from '@lib/ui/theme/getters'
import { usePWA } from '@product/app/pwa/PWAContext'
import {
  primaryAppNavigationPages,
  secondaryAppNavigationPages,
} from '@product/ui/navigation/app'
import styled from 'styled-components'

import { SidebarNavigationItem } from '../SidebarNavigationItem'

import { sidebarConfig } from './config'
import { InstallPrompt } from './InstallPrompt'

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

type SidebarProps = {
  header?: React.ReactNode
}

export const Sidebar = ({ header }: SidebarProps) => {
  const { installPromptEvent, isSidebarInstallPromptRejected } = usePWA()
  const isInstallPromptEnabled =
    installPromptEvent && !isSidebarInstallPromptRejected

  return (
    <Container>
      <VStack alignItems="center" fullHeight justifyContent="space-between">
        <VStack fullWidth gap={sidebarConfig.gap}>
          {header}
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
