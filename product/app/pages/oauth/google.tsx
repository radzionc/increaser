import { withLayout } from '@lib/next-ui/utils/withLayout'
import { OAuthContent } from '@product/app/auth/components/OAuthContent'

import { AuthPageLayout } from '../../auth/components/AuthPageLayout'

export default withLayout({
  page: () => <OAuthContent provider={'google'} />,
  layout: AuthPageLayout,
})
