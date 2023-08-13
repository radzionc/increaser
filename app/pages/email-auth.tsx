import { AuthPageLayout } from 'auth/components/AuthPageLayout'
import { EmailAuthContent } from 'auth/components/EmailAuthContent'
import { Page } from 'components/Page'

export const EmailAuthPage: Page = () => {
  return <EmailAuthContent />
}

export default EmailAuthPage

EmailAuthPage.getLayout = function getLayout(page) {
  return <AuthPageLayout>{page}</AuthPageLayout>
}
