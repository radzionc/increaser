import { withLayout } from '@lib/next-ui/utils/withLayout'
import { AppPageLayout } from '../focus/components/AppPageLayout'
import { GoalsPage } from '../goals/GoalsPage'

export default withLayout({
  page: GoalsPage,
  layout: AppPageLayout,
})
