import { ProductLogo } from 'product/components/ProductLogo'
import { Path } from 'router/Path'
import styled from 'styled-components'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { ElementSizeAware } from '@increaser/ui/ui/ElementSizeAware'
import { useIsScreenWidthLessThan } from '@increaser/ui/ui/hooks/useIsScreenWidthLessThan'
import { Text } from '@increaser/ui/ui/Text'
import Link from 'next/link'
import { ClientOnly } from 'ui/ClientOnly'
import { ExternalLink } from 'router/Link/ExternalLink'
import { APP_URL } from 'product'
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
                <Link href={Path.Landing}>
                  <Text as="div" size={32}>
                    <ProductLogo />
                  </Text>
                </Link>
              )}
              <div ref={setElement}>
                <ExternalLink to={`${APP_URL}/sign-up`}>
                  <Button as="div" kind="reversed">
                    Sign up
                  </Button>
                </ExternalLink>
              </div>
            </Container>
            <Placeholder>
              {size && (
                <SignInContainer rightSiblingWidth={size.width}>
                  <ExternalLink to={`${APP_URL}/sign-in`}>
                    <Button as="div" kind="ghost">
                      Sign in
                    </Button>
                  </ExternalLink>
                </SignInContainer>
              )}
            </Placeholder>
          </>
        )}
      />
    </ClientOnly>
  )
}
