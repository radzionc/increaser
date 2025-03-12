import { withLayout } from '@lib/next-ui/utils/withLayout'
import { CommunityPage } from '@product/app/community/components/CommunityPage'

import { AppPageLayout } from '../ui/page/AppPageLayout'

export default withLayout({
  page: CommunityPage,
  layout: AppPageLayout,
})
