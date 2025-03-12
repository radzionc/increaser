import { withLayout } from '@lib/next-ui/utils/withLayout'

import { MembershipPage } from '../membership/components/MembershipPage'
import { AppPageLayout } from '../ui/page/AppPageLayout'

export default withLayout({
  page: MembershipPage,
  layout: AppPageLayout,
})
