import { useUnauthorizedOnly } from 'auth/hooks/useUnauthorizedOnly'
import { Page } from 'components/Page'
import { LandingPage as LandingPageContent } from 'landing/components'
import { WebsitePageLayout } from 'landing/components/WebsitePageLayout'

export const LandingPage: Page = () => {
  useUnauthorizedOnly()

  return <LandingPageContent />
}

export default LandingPage

LandingPage.getLayout = function getLayout(page) {
  return <WebsitePageLayout>{page}</WebsitePageLayout>
}
