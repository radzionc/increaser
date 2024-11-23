import { CommunityPage } from '@increaser/app/community/components/CommunityPage'
import { withLayout } from '@lib/next-ui/utils/withLayout'
import { AppPageLayout } from '../ui/page/AppPageLayout'

export default withLayout({
  page: CommunityPage,
  layout: AppPageLayout,
})
