import { centerContent } from '@lib/ui/css/centerContent'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { darkTheme } from '@lib/ui/theme/darkTheme'
import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { websiteConfig } from '@lib/ui/website/config'
import styled, { ThemeProvider } from 'styled-components'
import { Button } from '@lib/ui/buttons/Button'
import { AppLink } from '../navigation/AppLink'
import { AppPath } from '@increaser/ui/navigation/AppPath'

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
          <AppLink to={AppPath.SignUp}>
            <Button as="div" kind="primary" size="xl">
              Start now
            </Button>
          </AppLink>
        </WebsiteSliceContent>
      </Container>
    </ThemeProvider>
  )
}
