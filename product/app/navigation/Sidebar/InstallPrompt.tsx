import { useAnalytics } from '@lib/analytics-ui/AnalyticsContext'
import { CloseButton } from '@lib/ui/buttons/CloseButton'
import { ArrowDownCircleIcon } from '@lib/ui/icons/ArrowDownCircleIcon'
import { getPlatform } from '@product/app/pwa/getPlatform'
import { platformInfo } from '@product/app/pwa/platformInfo'
import { usePWA } from '@product/app/pwa/PWAContext'
import { productName } from '@product/config'
import { useMemo } from 'react'
import styled from 'styled-components'

import { NavigationItemContainer } from './NavigationItemContainer'
import { NavigationItemContentFrame } from './NavigationItemContentFrame'

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`

const Container = styled(NavigationItemContainer)`
  background: ${({ theme }) => theme.colors.mist.toCssValue()};
  &:hover {
    background: ${({ theme }) =>
      theme.colors['mist'].getVariant({ a: (a) => a + 0.08 }).toCssValue()};
  }
`

const FloatingCloseButton = styled.div`
  position: absolute;
  right: 8px;
`

export const InstallPrompt = () => {
  const { installPromptEvent, setIsSidebarInstallPromptRejected } = usePWA()

  const platform = useMemo(getPlatform, [])

  const analytics = useAnalytics()

  return (
    <Wrapper>
      <Container
        isActive={false}
        onClick={() => {
          installPromptEvent?.prompt()
          analytics.trackEvent('Attempt Install')
        }}
      >
        <NavigationItemContentFrame>
          {platform ? platformInfo[platform].icon : <ArrowDownCircleIcon />}
          {platform
            ? `Install on ${platformInfo[platform].name}`
            : `Install ${productName}`}
        </NavigationItemContentFrame>
      </Container>
      <FloatingCloseButton>
        <CloseButton onClick={() => setIsSidebarInstallPromptRejected(true)} />
      </FloatingCloseButton>
    </Wrapper>
  )
}
