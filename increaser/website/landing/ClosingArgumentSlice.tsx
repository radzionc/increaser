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

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - ${toSizeUnit(websiteConfig.headerHeight)});
  ${centerContent}
  position: relative;
  overflow: hidden;
  background-image: url('/images/stars.webp');
`

export const ClosingArgumentSlice = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <WebsiteSliceContent style={{ zIndex: 1 }}>
          <WebsiteSectionHeader title="Unleash Your Potential" />
          <ExternalLink isReferring openInSameTab to={signUpUrl}>
            <Button as="div" kind="primary" size="xl">
              Start now
            </Button>
          </ExternalLink>
        </WebsiteSliceContent>
      </Container>
    </ThemeProvider>
  )
}
