import { withLayout } from '@lib/next-ui/utils/withLayout'
import { SignUpContent } from '@product/app/auth/components/SignUpContent'

import { AuthPageLayout } from '../auth/components/AuthPageLayout'

export default withLayout({
  layout: AuthPageLayout,
  page: SignUpContent,
})
