import { GetLayout, Page } from '@lib/next-ui/Page'
import { WebsiteNavigation } from '@lib/ui/website/navigation/WebsiteNavigation'
import { ProductLogo } from '@increaser/ui/ProductLogo'
import styled from 'styled-components'
import { interactive } from '@lib/ui/css/interactive'
import Link from 'next/link'
import { HStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import { joinPaths } from '@lib/utils/query/joinPaths'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { OverlayNavigationItem } from '@lib/ui/website/navigation/OverlayNavigationItem'
import { Footer } from '@lib/ui/website/navigation/Footer'
import { Text } from '@lib/ui/text'
import {
  legalEntity,
  supportEmail,
  version,
  youTubeChannel,
} from '@increaser/config'
import { InteractiveText } from '@lib/ui/text/InteractiveText'

const LogoWrapper = styled(Link)`
  ${interactive};
  font-size: 20px;
`

const appUrl = shouldBePresent(process.env.NEXT_PUBLIC_APP_URL)
const signInUrl = joinPaths(appUrl, 'sign-in')
const signUpUrl = joinPaths(appUrl, 'sign-up')

export const getWebsitePageLayout: GetLayout = (page) => (
  <WebsiteNavigation
    logo={
      <LogoWrapper href="/">
        <ProductLogo />
      </LogoWrapper>
    }
    renderTopbarItems={() => (
      <>
        <div />
        <HStack alignItems="center" gap={8}>
          <ExternalLink to={signInUrl}>
            <Button kind="ghost" as="div">
              Sign in
            </Button>
          </ExternalLink>
          <ExternalLink to={signUpUrl}>
            <Button kind="reversed" as="div">
              Sign up
            </Button>
          </ExternalLink>
        </HStack>
      </>
    )}
    renderOverlayItems={({ onClose }) => (
      <>
        <ExternalLink onClick={onClose} to={signUpUrl}>
          <OverlayNavigationItem as="div">Sign up</OverlayNavigationItem>
        </ExternalLink>
        <ExternalLink onClick={onClose} to={signInUrl}>
          <OverlayNavigationItem as="div">Sign in</OverlayNavigationItem>
        </ExternalLink>
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
          <Text>v{version}</Text>
          <Link href={appUrl}>
            <InteractiveText>App</InteractiveText>
          </Link>
          <Link href="/privacy-policy">
            <InteractiveText>Privacy</InteractiveText>
          </Link>
          <Link href="/terms-of-service">
            <InteractiveText>Terms</InteractiveText>
          </Link>
          <ExternalLink to={`mailto:${supportEmail}`}>
            <InteractiveText>Get in touch</InteractiveText>
          </ExternalLink>
          <ExternalLink to={youTubeChannel}>
            <InteractiveText>YouTube</InteractiveText>
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
