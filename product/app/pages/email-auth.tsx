import { withLayout } from '@lib/next-ui/utils/withLayout'
import { EmailAuthContent } from '@product/app/auth/components/EmailAuthContent'

import { AuthPageLayout } from '../auth/components/AuthPageLayout'

export default withLayout({
  page: EmailAuthContent,
  layout: AuthPageLayout,
})
