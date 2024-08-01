import { withLayout } from '@lib/next-ui/utils/withLayout'
import { AppPageLayout } from '../focus/components/AppPageLayout'
import { ProfilePage } from '@increaser/app/profile/ProfilePage'

export default withLayout({
  page: ProfilePage,
  layout: AppPageLayout,
})
