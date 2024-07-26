import { withLayout } from '@lib/next-ui/utils/withLayout'
import { MyHabits } from '../../habits/components/MyHabits'
import { PlanDayLayout } from '../../plan/day/PlanDayLayout'

export default withLayout({
  page: MyHabits,
  layout: PlanDayLayout,
})
