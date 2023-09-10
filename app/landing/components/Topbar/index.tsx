import { ProductLogo } from 'product/components/ProductLogo'
import { Path } from 'router/Path'
import styled from 'styled-components'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { ElementSizeAware } from '@increaser/ui/ui/ElementSizeAware'
import { useIsScreenWidthLessThan } from '@increaser/ui/hooks/useIsScreenWidthLessThan'
import { Text } from '@increaser/ui/ui/Text'
import Link from 'next/link'
import { ClientOnly } from 'ui/ClientOnly'
import { ExternalLink } from 'router/Link/ExternalLink'
import { WEBSITE_URL } from 'product'
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
                <Link href={Path.SignUp}>
                  <Button as="div" kind="reversed">
                    Sign up
                  </Button>
                </Link>
              </div>
            </Container>
            <Placeholder>
              {size && (
                <SignInContainer rightSiblingWidth={size.width}>
                  <Link href={Path.SignIn}>
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
