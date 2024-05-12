import { GetLayout, Page } from '@lib/next-ui/Page'
import { WebsiteNavigation } from '@lib/ui/website/navigation/WebsiteNavigation'
import { ProductLogo } from '@increaser/ui/ProductLogo'
import styled from 'styled-components'
import { interactive } from '@lib/ui/css/interactive'
import Link from 'next/link'
import { HStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { OverlayNavigationItem } from '@lib/ui/website/navigation/OverlayNavigationItem'
import { Footer } from '@lib/ui/website/navigation/Footer'
import { Text } from '@lib/ui/text'
import {
  legalEntity,
  productTelegramChannelUrl,
  productXUrl,
  supportEmail,
} from '@increaser/config'
import { InteractiveText } from '@lib/ui/text/InteractiveText'
import { AppLink } from '../navigation/AppLink'
import { AppPath } from '@increaser/ui/navigation/AppPath'
import { WebsitePath } from '@increaser/ui/navigation/WebsitePath'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'

const LogoWrapper = styled(Link)`
  ${interactive};
  font-size: 20px;
`

export const getWebsitePageLayout: GetLayout = (page) => (
  <WebsiteNavigation
    logo={
      <LogoWrapper href={WebsitePath.Home}>
        <ProductLogo />
      </LogoWrapper>
    }
    renderTopbarItems={() => (
      <>
        <div />
        <HStack alignItems="center" gap={8}>
          <AppLink to={AppPath.SignIn}>
            <Button kind="ghost" as="div">
              Sign in
            </Button>
          </AppLink>
          <AppLink to={AppPath.SignUp}>
            <Button kind="reversed" as="div">
              Sign up
            </Button>
          </AppLink>
        </HStack>
      </>
    )}
    renderOverlayItems={({ onClose }) => (
      <>
        <AppLink onClick={onClose} to={AppPath.SignUp}>
          <OverlayNavigationItem as="div">Sign up</OverlayNavigationItem>
        </AppLink>
        <AppLink onClick={onClose} to={AppPath.SignIn}>
          <OverlayNavigationItem as="div">Sign in</OverlayNavigationItem>
        </AppLink>
      </>
    )}
    footer={
      <Footer>
        <HStack
          alignItems="center"
          justifyContent="center"
          gap={16}
          fullWidth
          wrap="wrap"
        >
          <Text>
            © {new Date().getFullYear()} {legalEntity}
          </Text>
          <AppLink to={AppPath.Home}>
            <InteractiveText>App</InteractiveText>
          </AppLink>
          <Link href={WebsitePath.PrivacyPolicy}>
            <InteractiveText>Privacy</InteractiveText>
          </Link>
          <Link href={WebsitePath.TermsOfService}>
            <InteractiveText>Terms</InteractiveText>
          </Link>
          <ExternalLink to={`mailto:${supportEmail}`}>
            <InteractiveText>Get in touch</InteractiveText>
          </ExternalLink>
          <ExternalLink to={productXUrl}>
            <InteractiveText>X</InteractiveText>
          </ExternalLink>
          <ExternalLink to={productTelegramChannelUrl}>
            <InteractiveText>Telegram</InteractiveText>
          </ExternalLink>
        </HStack>
      </Footer>
    }
  >
    {page}
  </WebsiteNavigation>
)

export const makeWebsitePage = (page: Page) => {
  page.getLayout = getWebsitePageLayout

  return page
}
