import styled, { ThemeProvider } from 'styled-components'
import { HSLA } from '@increaser/ui/colors/HSLA'
import { IntersectionAware } from '@increaser/ui/IntersectionAware'
import { VStack } from '@increaser/ui/layout/Stack'
import { darkTheme } from '@increaser/ui/theme/darkTheme'
import { centerContent } from '@increaser/ui/css/centerContent'

import { CTA } from './CTA'
import { Footer } from './Footer'
import { SliceTitle } from './shared/SliceTitle'

export const closingArgumentBackgroundColor: HSLA = new HSLA(240, 50, 1)

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  ${centerContent}
  position: relative;
  overflow: hidden;
  background: ${closingArgumentBackgroundColor.toCssValue()};
  z-index: 1;
`

const Background = styled.img`
  position: absolute;
  width: 100%;
  min-height: 100%;
`

const Argument = styled.div`
  background: ${closingArgumentBackgroundColor.toCssValue()};
`

const FooterWr = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  ${centerContent}
  padding: 20px;
`

const FooterContainer = styled.div`
  background: ${closingArgumentBackgroundColor.toCssValue()};
`

export const ClosingArgument = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <IntersectionAware<HTMLDivElement>
        render={({ ref, wasIntersected }) => (
          <Container ref={ref}>
            {wasIntersected && <Background src="/images/stars.webp" />}
            <VStack
              style={{ zIndex: 1 }}
              gap={40}
              alignItems="center"
              justifyContent="center"
            >
              <Argument>
                <SliceTitle color="contrast">
                  Do more of what you love
                </SliceTitle>
              </Argument>
              <CTA />
            </VStack>
            <FooterWr>
              <FooterContainer>
                <Footer />
              </FooterContainer>
            </FooterWr>
          </Container>
        )}
      />
    </ThemeProvider>
  )
}
