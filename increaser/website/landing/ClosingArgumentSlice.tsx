import { darkTheme } from '@lib/ui/theme/darkTheme'
import { WebsiteSectionHeader } from '@lib/ui/website/WebsiteSectionHeader'
import { WebsiteSliceContent } from '@lib/ui/website/WebsiteSliceContent'
import { ThemeProvider } from 'styled-components'
import { PrimaryCallToAction } from './PrimaryCallToAction'
import { ClosingArgumentBackground } from '@lib/ui/website/ClosingArgumentBackground'

export const ClosingArgumentSlice = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <ClosingArgumentBackground imageUrl="images/closing-argument.webp">
        <WebsiteSliceContent style={{ gap: 28, paddingBottom: 200 }}>
          <WebsiteSectionHeader title="Unleash Your Potential" />
          <PrimaryCallToAction kind="reversed" />
        </WebsiteSliceContent>
      </ClosingArgumentBackground>
    </ThemeProvider>
  )
}
