import { IntersectionAware } from '@lib/ui/base/IntersectionAware'
import { HSLA } from '@lib/ui/colors/HSLA'
import { centerContent } from '@lib/ui/css/centerContent'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { ExternalLink } from '@lib/ui/navigation/Link/ExternalLink'
import { darkTheme } from '@lib/ui/theme/darkTheme'
import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { websiteConfig } from '@lib/ui/website/config'
import styled, { ThemeProvider } from 'styled-components'
import { signUpUrl } from '../config'
import { Button } from '@lib/ui/buttons/Button'

export const closingArgumentBackgroundColor: HSLA = new HSLA(240, 50, 1)

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - ${toSizeUnit(websiteConfig.headerHeight)});
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

export const ClosingArgumentSlice = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <IntersectionAware<HTMLDivElement>
        render={({ ref, wasIntersected }) => (
          <Container ref={ref}>
            {wasIntersected && <Background src="/images/stars.webp" />}
            <WebsiteSliceContent style={{ zIndex: 1 }}>
              <WebsiteSectionHeader title="Unleash Your Potential" />
              <ExternalLink isReferring openInSameTab to={signUpUrl}>
                <Button as="div" kind="primary" size="xl">
                  Start now
                </Button>
              </ExternalLink>
            </WebsiteSliceContent>
          </Container>
        )}
      />
    </ThemeProvider>
  )
}
