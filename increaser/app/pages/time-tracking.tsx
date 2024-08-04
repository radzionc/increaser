import { withLayout } from '@lib/next-ui/utils/withLayout'
import { AppPageLayout } from '../focus/components/AppPageLayout'
import { TimeTrackingPage } from '../timeTracking/TimeTrackingPage'

export default withLayout({
  page: TimeTrackingPage,
  layout: AppPageLayout,
})
