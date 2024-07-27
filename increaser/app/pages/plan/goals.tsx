import { withLayout } from '@lib/next-ui/utils/withLayout'
import { PlanDayLayout } from '../../plan/day/PlanDayLayout'
import { Goals } from '../../goals/Goals'

export default withLayout({
  page: Goals,
  layout: PlanDayLayout,
})
