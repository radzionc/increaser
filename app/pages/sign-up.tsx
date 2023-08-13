import { AuthPageLayout } from 'auth/components/AuthPageLayout'
import { SignUpContent } from 'auth/components/SignUpContent'
import { useUnauthorizedOnly } from 'auth/hooks/useUnauthorizedOnly'
import { Page } from 'components/Page'

export const SignUpPage: Page = () => {
  useUnauthorizedOnly()

  return <SignUpContent />
}

export default SignUpPage

SignUpPage.getLayout = function getLayout(page) {
  return <AuthPageLayout>{page}</AuthPageLayout>
}
