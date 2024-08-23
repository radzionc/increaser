import { withLayout } from '@lib/next-ui/utils/withLayout'
import { HabitsLayout } from '../../habits/components/HabitsLayout'
import { HabitsReport } from '../../habits/components/report/HabitsReport'

export default withLayout({
  page: HabitsReport,
  layout: HabitsLayout,
})
