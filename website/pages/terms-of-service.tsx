import { TermsOfServicePage } from 'legal/TermsOfServicePage'
import { WebsitePageLayout } from 'landing/components/WebsitePageLayout'

export default TermsOfServicePage

TermsOfServicePage.getLayout = function getLayout(page) {
  return <WebsitePageLayout>{page}</WebsitePageLayout>
}
