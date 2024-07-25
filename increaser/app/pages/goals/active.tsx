import { ActiveGoals } from '../../goals/ActiveGoals'
import { withLayout } from '@lib/next-ui/utils/withLayout'
import { GoalsLayout } from '../../goals/GoalsLayout'

export default withLayout({
  page: ActiveGoals,
  layout: GoalsLayout,
})
