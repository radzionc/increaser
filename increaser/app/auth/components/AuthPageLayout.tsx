import { ComponentWithChildrenProps } from '@lib/ui/props'

import { UnauthenticatedOnly } from './UnauthenticatedOnly'
import { WebsiteNavigation } from '@lib/ui/website/navigation/WebsiteNavigation'
import styled from 'styled-components'
import { interactive } from '@lib/ui/css/interactive'
import { WebsiteLink } from '../../navigation/WebsiteLink'
import { WebsitePath } from '@increaser/ui/navigation/WebsitePath'
import { ProductLogo } from '@increaser/ui/ProductLogo'
import { HStack } from '@lib/ui/layout/Stack'
import Link from 'next/link'
import { AppPath } from '@increaser/ui/navigation/AppPath'
import { Button } from '@lib/ui/buttons/Button'
import { OverlayNavigationItem } from '@lib/ui/website/navigation/OverlayNavigationItem'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { Panel } from '@lib/ui/panel/Panel'

const LogoWrapper = styled(WebsiteLink)`
  ${interactive};
  font-size: 20px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

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
              <Link href={AppPath.SignIn}>
                <Button kind="ghost" as="div">
                  Sign in
                </Button>
              </Link>
              <Link href={AppPath.SignUp}>
                <Button kind="reversed" as="div">
                  Sign up
                </Button>
              </Link>
            </HStack>
          </>
        )}
        renderOverlayItems={({ onClose }) => (
          <>
            <Link onClick={onClose} href={AppPath.SignUp}>
              <OverlayNavigationItem as="div">Sign up</OverlayNavigationItem>
            </Link>
            <Link onClick={onClose} href={AppPath.SignIn}>
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
