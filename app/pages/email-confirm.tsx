import { AuthPageLayout } from 'auth/components/AuthPageLayout'
import { EmailConfirmContent } from 'auth/components/EmailConfirmContent'
import { useUnauthorizedOnly } from 'auth/hooks/useUnauthorizedOnly'
import { Page } from 'components/Page'

export const EmailConfirmPage: Page = () => {
  useUnauthorizedOnly()

  return <EmailConfirmContent />
}

export default EmailConfirmPage

EmailConfirmPage.getLayout = function getLayout(page) {
  return <AuthPageLayout>{page}</AuthPageLayout>
}
