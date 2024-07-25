import { EmailAuthContent } from '@increaser/app/auth/components/EmailAuthContent'
import { withLayout } from '@lib/next-ui/utils/withLayout'
import { AuthPageLayout } from '../auth/components/AuthPageLayout'

export default withLayout({
  page: EmailAuthContent,
  layout: AuthPageLayout,
})
