import { withLayout } from '@lib/next-ui/utils/withLayout'
import { GoalsReview } from '../../plan/day/goals/GoalsReview'
import { PlanDayLayout } from '../../plan/day/PlanDayLayout'

export default withLayout({
  page: GoalsReview,
  layout: PlanDayLayout,
})
