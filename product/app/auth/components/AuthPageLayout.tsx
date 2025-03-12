import { Button } from '@lib/ui/buttons/Button'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { interactive } from '@lib/ui/css/interactive'
import { Panel } from '@lib/ui/css/panel'
import { HStack, VStack } from '@lib/ui/css/stack'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { ChildrenProp } from '@lib/ui/props'
import { OverlayNavigationItem } from '@lib/ui/website/navigation/OverlayNavigationItem'
import { WebsiteNavigation } from '@lib/ui/website/navigation/WebsiteNavigation'
import { getAppPath } from '@product/ui/navigation/app'
import { WebsitePath } from '@product/ui/navigation/WebsitePath'
import { ProductLogo } from '@product/ui/ProductLogo'
import Link from 'next/link'
import styled from 'styled-components'

import { WebsiteLink } from '../../navigation/WebsiteLink'

import { UnauthenticatedOnly } from './UnauthenticatedOnly'

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

export const AuthPageLayout = ({ children }: ChildrenProp) => {
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
