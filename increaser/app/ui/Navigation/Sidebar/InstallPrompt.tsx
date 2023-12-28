import { analytics } from '@increaser/app/analytics'
import { getPlatform } from '@increaser/app/pwa/getPlatform'
import { platformInfo } from '@increaser/app/pwa/platformInfo'
import { usePWA } from '@increaser/app/pwa/PWAContext'
import { useMemo } from 'react'
import styled from 'styled-components'
import {
  IconWrapper,
  Container as NavigationContainer,
} from '@increaser/app/ui/Navigation/Sidebar/NavigationItem'
import { ArrowDownCircleIcon } from '@lib/ui/icons/ArrowDownCircleIcon'
import { Text } from '@lib/ui/text'
import { HStack } from '@lib/ui/layout/Stack'
import { CloseButton } from '@lib/ui/buttons/CloseButton'
import { productName } from '@increaser/entities'

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`

const Container = styled(NavigationContainer)`
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

  return (
    <Wrapper>
      <Container
        onClick={() => {
          installPromptEvent?.prompt()
          analytics.trackEvent('Attempt Install')
        }}
      >
        <Text size={18} as="div">
          <HStack gap={8}>
            <>
              <IconWrapper>
                {platform ? (
                  platformInfo[platform].icon
                ) : (
                  <ArrowDownCircleIcon />
                )}
              </IconWrapper>
              <div>
                {platform
                  ? `Install on ${platformInfo[platform].name}`
                  : `Install ${productName}`}
              </div>
            </>
          </HStack>
        </Text>
      </Container>
      <FloatingCloseButton>
        <CloseButton onClick={() => setIsSidebarInstallPromptRejected(true)} />
      </FloatingCloseButton>
    </Wrapper>
  )
}
