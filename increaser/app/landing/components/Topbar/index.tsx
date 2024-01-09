import { ProductLogo } from '@increaser/app/product/components/ProductLogo'
import styled from 'styled-components'
import { Button } from '@lib/ui/buttons/Button'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { useIsScreenWidthLessThan } from '@lib/ui/hooks/useIsScreenWidthLessThan'
import { Text } from '@lib/ui/text'
import Link from 'next/link'
import { ClientOnly } from '@increaser/app/ui/ClientOnly'
import { WEBSITE_URL } from '@increaser/app/product'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import { AppPath } from '@increaser/ui/navigation/AppPath'
export const Placeholder = styled.div`
  flex-shrink: 0;
  height: 80px;
  width: 100%;
  position: relative;
  padding: 0 4%;
  display: flex;
  align-items: center;
`

const smallScreenBreakpointInPx = 500

export const Container = styled(Placeholder)`
  position: fixed;
  justify-content: space-between;
  z-index: 1;
  @media (max-width: ${smallScreenBreakpointInPx}px) {
    background: ${({ theme }) => theme.colors.foreground.toCssValue()};
  }
`

export const SignInContainer = styled.div<{ rightSiblingWidth: number }>`
  position: absolute;
  z-index: 2;
  right: calc(${({ rightSiblingWidth }) => rightSiblingWidth + 20}px + 4%);
`

export const Topbar = () => {
  const isSmallScreen = useIsScreenWidthLessThan(smallScreenBreakpointInPx)
  return (
    <ClientOnly>
      <ElementSizeAware
        render={({ setElement, size }) => (
          <>
            <Container>
              {isSmallScreen ? (
                <div />
              ) : (
                <ExternalLink openInSameTab to={WEBSITE_URL}>
                  <Text as="div" size={32}>
                    <ProductLogo />
                  </Text>
                </ExternalLink>
              )}
              <div ref={setElement}>
                <Link href={AppPath.SignUp}>
                  <Button as="div" kind="reversed">
                    Sign up
                  </Button>
                </Link>
              </div>
            </Container>
            <Placeholder>
              {size && (
                <SignInContainer rightSiblingWidth={size.width}>
                  <Link href={AppPath.SignIn}>
                    <Button as="div" kind="ghost">
                      Sign in
                    </Button>
                  </Link>
                </SignInContainer>
              )}
            </Placeholder>
          </>
        )}
      />
    </ClientOnly>
  )
}
