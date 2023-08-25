import { Page } from 'components/Page'
import { LandingPage as LandingPageContent } from 'landing/components'
import { WebsitePageLayout } from 'landing/components/WebsitePageLayout'

export const LandingPage: Page = () => {
  return <LandingPageContent />
}

export default LandingPage

LandingPage.getLayout = function getLayout(page) {
  return <WebsitePageLayout>{page}</WebsitePageLayout>
}
