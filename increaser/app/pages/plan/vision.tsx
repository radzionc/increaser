import { withLayout } from '@lib/next-ui/utils/withLayout'
import { MyVision } from '../../vision/MyVision'
import { PlanDayLayout } from '../../plan/day/PlanDayLayout'

export default withLayout({
  page: MyVision,
  layout: PlanDayLayout,
})
