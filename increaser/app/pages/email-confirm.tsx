import { AuthPageLayout } from '../auth/components/AuthPageLayout'
import { EmailConfirmContent } from '../auth/components/EmailConfirmContent'
import { withLayout } from '@lib/next-ui/utils/withLayout'

export default withLayout({
  page: EmailConfirmContent,
  layout: AuthPageLayout,
})
