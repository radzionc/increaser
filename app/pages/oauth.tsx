import { AuthPageLayout } from 'auth/components/AuthPageLayout'
import { OAuthContent } from 'auth/components/OAuthContent'
import { Page } from 'components/Page'

export const OAuthPage: Page = () => {
  return <OAuthContent />
}

export default OAuthPage

OAuthPage.getLayout = function getLayout(page) {
  return <AuthPageLayout>{page}</AuthPageLayout>
}
