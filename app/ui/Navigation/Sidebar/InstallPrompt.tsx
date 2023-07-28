import { trackEvent } from 'analytics'
import { getPlatform } from 'pwa/getPlatform'
import { platformInfo } from 'pwa/platformInfo'
import { usePWA } from 'pwa/PWAContext'
import { useMemo } from 'react'
import { APP_NAME } from 'shared/product'
import styled from 'styled-components'
import {
  IconWrapper,
  Container as NavigationContainer,
} from 'ui/Navigation/Sidebar/NavigationItem'
import { ArrowDownCircleIcon } from '@increaser/ui/ui/icons/ArrowDownCircleIcon'
import { Text } from '@increaser/ui/ui/Text'
import { HStack } from '@increaser/ui/ui/Stack'
import { CloseButton } from '@increaser/ui/ui/buttons/CloseButton'

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`

const Container = styled(NavigationContainer)`
  background: ${({ theme }) => theme.colors.mist.toCssValue()};
  :hover {
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
          trackEvent('Attempt Install')
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
                  : `Install ${APP_NAME}`}
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
