import { withLayout } from '@lib/next-ui/utils/withLayout'

import { AuthPageLayout } from '../auth/components/AuthPageLayout'
import { EmailConfirmContent } from '../auth/components/EmailConfirmContent'

export default withLayout({
  page: EmailConfirmContent,
  layout: AuthPageLayout,
})
