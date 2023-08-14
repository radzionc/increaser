import { OAuthProvider } from 'auth/OAuthProvider'
import { AuthPageLayout } from 'auth/components/AuthPageLayout'
import { OAuthContent } from 'auth/components/OAuthContent'
import { Page } from 'components/Page'

export const OAuthPage: Page = () => {
  return <OAuthContent provider={OAuthProvider.Facebook} />
}

export default OAuthPage

OAuthPage.getLayout = function getLayout(page) {
  return <AuthPageLayout>{page}</AuthPageLayout>
}
