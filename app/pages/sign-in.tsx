import { AuthPageLayout } from 'auth/components/AuthPageLayout'
import { SignInContent } from 'auth/components/SignInContent'
import { Page } from 'components/Page'

export const SignInPage: Page = () => {
  return <SignInContent />
}

export default SignInPage

SignInPage.getLayout = function getLayout(page) {
  return <AuthPageLayout>{page}</AuthPageLayout>
}
