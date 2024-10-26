import { withLayout } from '@lib/next-ui/utils/withLayout'
import { HabitsLayout } from '../../habits/HabitsLayout'
import { HabitsReportPage } from '../../habits/HabitsReportPage'

export default withLayout({
  page: HabitsReportPage,
  layout: HabitsLayout,
})
