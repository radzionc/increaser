import { ComponentWithChildrenProps } from '@lib/ui/props'

import { UnauthenticatedOnly } from './UnauthenticatedOnly'
import { WebsiteNavigation } from '@lib/ui/website/navigation/WebsiteNavigation'
import styled from 'styled-components'
import { interactive } from '@lib/ui/css/interactive'
import { WebsiteLink } from '../../navigation/WebsiteLink'
import { WebsitePath } from '@increaser/ui/navigation/WebsitePath'
import { ProductLogo } from '@increaser/ui/ProductLogo'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import Link from 'next/link'
import { getAppPath } from '@increaser/ui/navigation/app'
import { Button } from '@lib/ui/buttons/Button'
import { OverlayNavigationItem } from '@lib/ui/website/navigation/OverlayNavigationItem'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { Panel } from '@lib/ui/css/panel'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'

const LogoWrapper = styled(WebsiteLink)`
  ${interactive};
  font-size: 20px;
`

const Container = styled(VStack)`
  align-items: center;
  justify-content: center;
  ${takeWholeSpace};

  @media (max-width: 600px) {
    justify-content: start;
    padding-top: 60px;
  }
`

const Content = styled(Panel)`
  max-width: 400px;
  width: 100%;
  padding: 26px;
  ${borderRadius.m};

  @media (max-width: 600px) {
    border: none;
  }
`

export const AuthPageLayout = ({ children }: ComponentWithChildrenProps) => {
  return (
    <UnauthenticatedOnly>
      <WebsiteNavigation
        logo={
          <LogoWrapper to={WebsitePath.Home}>
            <ProductLogo />
          </LogoWrapper>
        }
        renderTopbarItems={() => (
          <>
            <div />
            <HStack alignItems="center" gap={8}>
              <Link href={getAppPath('signIn')}>
                <Button kind="ghost" as="div">
                  Sign in
                </Button>
              </Link>
              <Link href={getAppPath('signUp')}>
                <Button kind="reversed" as="div">
                  Sign up
                </Button>
              </Link>
            </HStack>
          </>
        )}
        renderOverlayItems={({ onClose }) => (
          <>
            <Link onClick={onClose} href={getAppPath('signUp')}>
              <OverlayNavigationItem as="div">Sign up</OverlayNavigationItem>
            </Link>
            <Link onClick={onClose} href={getAppPath('signIn')}>
              <OverlayNavigationItem as="div">Sign in</OverlayNavigationItem>
            </Link>
          </>
        )}
      >
        <Container>
          <Content kind="secondary">{children}</Content>
        </Container>
      </WebsiteNavigation>
    </UnauthenticatedOnly>
  )
}
