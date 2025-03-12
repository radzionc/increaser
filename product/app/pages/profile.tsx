import { withLayout } from '@lib/next-ui/utils/withLayout'
import { ProfilePage } from '@product/app/profile/ProfilePage'

import { AppPageLayout } from '../ui/page/AppPageLayout'

export default withLayout({
  page: ProfilePage,
  layout: AppPageLayout,
})
