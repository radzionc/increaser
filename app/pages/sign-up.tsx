import { AuthPageLayout } from 'auth/components/AuthPageLayout'
import { SignUpContent } from 'auth/components/SignUpContent'
import { Page } from 'components/Page'

export const SignUpPage: Page = () => {
  return <SignUpContent />
}

export default SignUpPage

SignUpPage.getLayout = function getLayout(page) {
  return <AuthPageLayout>{page}</AuthPageLayout>
}
