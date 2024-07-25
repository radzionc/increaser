import { Tasks } from '@increaser/ui/tasks/Tasks'
import { withLayout } from '@lib/next-ui/utils/withLayout'
import { PlanDayLayout } from '../../plan/day/PlanDayLayout'

export default withLayout({
  page: Tasks,
  layout: PlanDayLayout,
})
