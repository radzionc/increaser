import { SchedulePage } from '../schedule/SchedulePage'
import { withLayout } from '@lib/next-ui/utils/withLayout'
import { AppPageLayout } from '../focus/components/AppPageLayout'

export default withLayout({
  page: SchedulePage,
  layout: AppPageLayout,
})
