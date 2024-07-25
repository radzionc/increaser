import { SignUpContent } from '@increaser/app/auth/components/SignUpContent'
import { withLayout } from '@lib/next-ui/utils/withLayout'
import { AuthPageLayout } from '../auth/components/AuthPageLayout'

export default withLayout({
  layout: AuthPageLayout,
  page: SignUpContent,
})
