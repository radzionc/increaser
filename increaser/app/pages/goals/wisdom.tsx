import { withLayout } from '@lib/next-ui/utils/withLayout'
import { GoalsLayout } from '../../goals/GoalsLayout'
import { GoalsEducationItems } from '@increaser/ui/goals/education/GoalsEducationItems'

export default withLayout({
  page: GoalsEducationItems,
  layout: GoalsLayout,
})
