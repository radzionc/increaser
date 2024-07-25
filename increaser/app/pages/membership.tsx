import { MembershipPage } from '../membership/components/MembershipPage'
import { withLayout } from '@lib/next-ui/utils/withLayout'
import { AppPageLayout } from '../focus/components/AppPageLayout'

export default withLayout({
  page: MembershipPage,
  layout: AppPageLayout,
})
