import { OAuthContent } from '@increaser/app/auth/components/OAuthContent'
import { withLayout } from '@lib/next-ui/utils/withLayout'
import { AuthPageLayout } from '../../auth/components/AuthPageLayout'

export default withLayout({
  page: () => <OAuthContent provider={'facebook'} />,
  layout: AuthPageLayout,
})
