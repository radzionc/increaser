import { PrivacyPolicyPage } from 'auth/components/PrivacyPolicyPage'
import { WebsitePageLayout } from 'landing/components/WebsitePageLayout'

export default PrivacyPolicyPage

PrivacyPolicyPage.getLayout = function getLayout(page) {
  return <WebsitePageLayout>{page}</WebsitePageLayout>
}
