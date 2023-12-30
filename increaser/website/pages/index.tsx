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

const LogoWrapper = styled(Link)`
  ${interactive};
  font-size: 20px;
`

const appUrl = shouldBePresent(process.env.NEXT_PUBLIC_APP_URL)
const signInUrl = joinPaths(appUrl, 'sign-in')
const signUpUrl = joinPaths(appUrl, 'sign-up')

export default function Home() {
  return (
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
    >
      content will be here
    </WebsiteNavigation>
  )
}
