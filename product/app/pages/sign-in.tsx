import { withLayout } from '@lib/next-ui/utils/withLayout'
import { SignInContent } from '@product/app/auth/components/SignInContent'

import { AuthPageLayout } from '../auth/components/AuthPageLayout'

export default withLayout({
  page: SignInContent,
  layout: AuthPageLayout,
})
