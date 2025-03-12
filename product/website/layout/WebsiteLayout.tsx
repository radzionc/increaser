import { Button } from '@lib/ui/buttons/Button'
import { interactive } from '@lib/ui/css/interactive'
import { HStack, VStack } from '@lib/ui/css/stack'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { HStackSeparatedBy } from '@lib/ui/layout/StackSeparatedBy'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import { ChildrenProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { InteractiveText } from '@lib/ui/text/InteractiveText'
import { getColor } from '@lib/ui/theme/getters'
import { Footer } from '@lib/ui/website/navigation/Footer'
import { OverlayNavigationItem } from '@lib/ui/website/navigation/OverlayNavigationItem'
import { WebsiteNavigation } from '@lib/ui/website/navigation/WebsiteNavigation'
import {
  legalEntity,
  productTelegramChannelUrl,
  productXUrl,
  productYouTubeChannelUrl,
  supportEmail,
} from '@product/config'
import {
  productToolNameRecord,
  productTools,
} from '@product/entities/ProductTool'
import { getAppPath } from '@product/ui/navigation/app'
import { WebsitePath } from '@product/ui/navigation/WebsitePath'
import { ProductLogo } from '@product/ui/ProductLogo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { AppLink } from '../navigation/AppLink'
import { ProductFeaturesNavigation } from '../navigation/features/ProductFeaturesNavigation'
import { getProductToolUrl } from '../navigation/productTool'

const LogoWrapper = styled(Link)`
  ${interactive};
  font-size: 20px;
  display: flex;
`

const Separator = styled.div`
  width: 1px;
  height: 20px;
  background: ${getColor('mistExtra')};
`

export const WebsiteLayout = ({ children }: ChildrenProp) => {
  const { events } = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleRouteChange = () => {
      if (containerRef.current) {
        containerRef.current.scrollTo(0, 0)
      }
    }

    events.on('routeChangeComplete', handleRouteChange)

    return () => {
      events.off('routeChangeComplete', handleRouteChange)
    }
  }, [events])

  return (
    <WebsiteNavigation
      ref={containerRef}
      logo={
        <LogoWrapper href={WebsitePath.Home}>
          <ProductLogo />
        </LogoWrapper>
      }
      renderTopbarItems={() => (
        <>
          <div />
          <HStackSeparatedBy
            separator={<Separator />}
            alignItems="center"
            gap={8}
          >
            <ProductFeaturesNavigation />
            <HStack alignItems="center" gap={8}>
              <AppLink to={getAppPath('signIn')}>
                <Button kind="ghost" as="div">
                  Sign in
                </Button>
              </AppLink>
              <AppLink to={getAppPath('signUp')}>
                <Button kind="reversed" as="div">
                  Sign up
                </Button>
              </AppLink>
            </HStack>
          </HStackSeparatedBy>
        </>
      )}
      renderOverlayItems={({ onClose }) => (
        <SeparatedByLine>
          <VStack>
            <AppLink onClick={onClose} to={getAppPath('signUp')}>
              <OverlayNavigationItem as="div">Sign up</OverlayNavigationItem>
            </AppLink>
            <AppLink onClick={onClose} to={getAppPath('signIn')}>
              <OverlayNavigationItem as="div">Sign in</OverlayNavigationItem>
            </AppLink>
          </VStack>
          <VStack>
            {productTools.map((tool) => (
              <AppLink
                key={tool}
                onClick={onClose}
                to={getProductToolUrl(tool)}
              >
                <OverlayNavigationItem as="div">
                  {productToolNameRecord[tool]}
                </OverlayNavigationItem>
              </AppLink>
            ))}
          </VStack>
        </SeparatedByLine>
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
            <AppLink to={getAppPath('focus')}>
              <InteractiveText>App</InteractiveText>
            </AppLink>
            <Link href={WebsitePath.Changelog}>
              <InteractiveText>What’s new</InteractiveText>
            </Link>
            <Link href={WebsitePath.TermsOfService}>
              <InteractiveText>Terms</InteractiveText>
            </Link>
            <Link href={WebsitePath.PrivacyPolicy}>
              <InteractiveText>Privacy</InteractiveText>
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
            <ExternalLink to={productYouTubeChannelUrl}>
              <InteractiveText>YouTube</InteractiveText>
            </ExternalLink>
          </HStack>
        </Footer>
      }
    >
      {children}
    </WebsiteNavigation>
  )
}
